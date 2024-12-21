import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import os
import pickle
import torch
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import cross_val_score, KFold
from sklearn.model_selection import train_test_split, cross_validate,  cross_val_score, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import confusion_matrix, classification_report, roc_auc_score
from sklearn.ensemble import RandomForestClassifier,StackingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import GradientBoostingClassifier, AdaBoostClassifier, BaggingClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from xgboost import XGBClassifier
import tensorflow as tf
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset
import numpy as np
from imblearn.over_sampling import SMOTE
import pathlib
import joblib

print("Current working directory:", os.getcwd())
# Tìm tệp cleveland.csv dựa trên vị trí file app.py
base_dir = pathlib.Path(__file__).resolve().parent
csv_path = base_dir / "cleveland.csv"

print("Resolved path:", csv_path)
print("File exists:", csv_path.exists())

class CNN_model:
    class TabularCNN(nn.Module):
        def __init__(self, num_filters=16, fc1_size=64):
            super(CNN_model.TabularCNN, self).__init__()
            self.conv1 = nn.Conv2d(1, num_filters, kernel_size=1)
            self.conv2 = nn.Conv2d(num_filters, num_filters * 2, kernel_size=2)
            self.fc1 = nn.Linear(self._get_flatten_size(num_filters), fc1_size)
            self.fc2 = nn.Linear(fc1_size, 1)

        def _get_flatten_size(self, num_filters):
            with torch.no_grad():
                dummy_input = torch.zeros(1, 1, 4, 4)
                x = nn.functional.relu(self.conv1(dummy_input))
                x = nn.functional.relu(self.conv2(x))
                return x.view(1, -1).size(1)

        def forward(self, x):
            x = nn.functional.relu(self.conv1(x))
            x = nn.functional.relu(self.conv2(x))
            x = x.view(x.size(0), -1)
            x = nn.functional.relu(self.fc1(x))
            x = self.fc2(x)
            return x

    def __init__(self, X_train, y_train, X_test, y_test):
        self.X_train = X_train
        self.y_train = y_train
        self.X_test = X_test
        self.y_test = y_test
        self.best_model = None
        
    def load_best_model(self, file_path):
        model_data = torch.load(file_path)
        num_filters = model_data["num_filters"]
        fc1_size = model_data["fc1_size"]

        # Khởi tạo mô hình con TabularCNN và tải trọng số vào đó
        self.best_model = CNN_model.TabularCNN(num_filters=num_filters, fc1_size=fc1_size)
        self.best_model.load_state_dict(model_data["state_dict"])
        self.best_model.eval()
        print(f"Best model loaded from {file_path} with num_filters={num_filters}, fc1_size={fc1_size}.")
        
    def prepare_data(self):
        X_train_padded = np.pad(self.X_train, ((0, 0), (0, 3)), 'constant')
        X_test_padded = np.pad(self.X_test, ((0, 0), (0, 3)), 'constant')

        # Reshape data for CNN
        side_length = 4
        X_train_cnn = X_train_padded.reshape(-1, 1, side_length, side_length).astype(np.float32)
        X_test_cnn = X_test_padded.reshape(-1, 1, side_length, side_length).astype(np.float32)

        # Apply SMOTE for balancing
        smote = SMOTE()
        X_train_resampled, y_train_resampled = smote.fit_resample(
            X_train_cnn.reshape(len(X_train_cnn), -1), self.y_train
        )
        X_train_resampled = X_train_resampled.reshape(-1, 1, side_length, side_length)

        # Convert to tensors
        X_train_tensor = torch.tensor(X_train_resampled, dtype=torch.float32)
        y_train_tensor = torch.tensor(y_train_resampled, dtype=torch.float32)
        X_test_tensor = torch.tensor(X_test_cnn, dtype=torch.float32)
        y_test_tensor = torch.tensor(self.y_test, dtype=torch.float32)

        # Create DataLoaders
        train_dataset = TensorDataset(X_train_tensor, y_train_tensor)
        train_loader = DataLoader(train_dataset, batch_size=32, shuffle=False)
        test_dataset = TensorDataset(X_test_tensor, y_test_tensor)

        return train_dataset, test_dataset, train_loader

    def train_and_return_best(self):
        train_dataset, test_dataset, train_loader = self.prepare_data()
        param_grid = {
            'num_filters': [16, 32],
            'fc1_size': [64, 128],
            'learning_rate': [0.001, 0.0001],
            'batch_size': [32, 64]
        }

        best_accuracy = 0
        best_params = {}
        best_model = None

        for num_filters in param_grid['num_filters']:
            for fc1_size in param_grid['fc1_size']:
                for lr in param_grid['learning_rate']:
                    for batch_size in param_grid['batch_size']:
                        model = CNN_model.TabularCNN(num_filters=num_filters, fc1_size=fc1_size)
                        criterion = nn.BCEWithLogitsLoss()
                        optimizer = optim.Adam(model.parameters(), lr=lr)

                        train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=False)

                        # Training loop
                        num_epochs = 15
                        for epoch in range(num_epochs):
                            model.train()
                            running_loss = 0.0
                            for X_batch, y_batch in train_loader:
                                optimizer.zero_grad()
                                y_pred = model(X_batch).squeeze()
                                loss = criterion(y_pred, y_batch)
                                loss.backward()
                                optimizer.step()
                                running_loss += loss.item()

                        # Evaluate the model
                        model.eval()
                        all_preds, all_labels = [], []
                        correct, total = 0, 0

                        with torch.no_grad():
                            for X_batch, y_batch in DataLoader(test_dataset, batch_size=batch_size):
                                y_pred = model(X_batch).squeeze()
                                predictions = torch.round(torch.sigmoid(y_pred))
                                correct += (predictions == y_batch).sum().item()
                                total += y_batch.size(0)

                                all_preds.extend(predictions.cpu().numpy())
                                all_labels.extend(y_batch.cpu().numpy())

                        # Compute metrics
                        accuracy = 100 * correct / total
                        if accuracy > best_accuracy:
                            best_accuracy = accuracy
                            best_params = {
                                'num_filters': num_filters,
                                'fc1_size': fc1_size,
                                'learning_rate': lr,
                                'batch_size': batch_size
                            }
                            best_model = model

        self.best_model = best_model
        if best_model is not None:
            self.save_best_model("best_model.pth", best_params['num_filters'], best_params['fc1_size'])
        return best_params, best_model

    def predict(self, X_test):
      
        if self.best_model is None:
            raise ValueError("Best model has not been trained. Call train_and_return_best first.")
        X_test_padded = np.pad(X_test, ((0, 0), (0, 3)), 'constant')
        side_length = 4
        X_test_cnn = X_test_padded.reshape(-1, 1, side_length, side_length).astype(np.float32)
        X_test_tensor = torch.tensor(X_test_cnn, dtype=torch.float32)
        self.best_model.eval()
        with torch.no_grad():
            y_pred = self.best_model(X_test_tensor).squeeze()
            y_pred = torch.sigmoid(y_pred)
            #y_pred = torch.round(y_pred) 
        return y_pred.numpy()

    def save_best_model(self, file_path, num_filters, fc1_size):
       
        if self.best_model is None:
            raise ValueError("Best model has not been trained. Call train_and_return_best first.")
    
        # Tạo thư mục nếu chưa tồn tại
        directory = "backend"
        if not os.path.exists(directory):
            os.makedirs(directory)

        # Lưu mô hình vào file
        full_path = os.path.join(directory, file_path)
        model_data = {
            "state_dict": self.best_model.state_dict(),
            "num_filters": num_filters,
            "fc1_size": fc1_size,
        }
        torch.save(model_data, full_path)
        print(f"Best model and parameters saved to {full_path}.")

    def load_best_model(self, file_path):
        model_data = torch.load(file_path)
        num_filters = model_data["num_filters"]
        fc1_size = model_data["fc1_size"]

        self.best_model = CNN_model.TabularCNN(num_filters=num_filters, fc1_size=fc1_size)
        self.best_model.load_state_dict(model_data["state_dict"])
        self.best_model.eval()
        print(f"Best model loaded from {file_path} with num_filters={num_filters}, fc1_size={fc1_size}.")

# LOAD DATA
# data = pd.read_csv(csv_path, header=None)
# data.columns = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalac', 'exang',
#                 'oldpeak', 'slope', 'ca', 'thal', 'target']
# data['target'] = data.target.map({0: 0, 1: 1, 2: 1, 3: 1, 4: 1})
# data['thal'] = data.thal.fillna(data.thal.mean())
# data['ca'] = data.ca.fillna(data.ca.mean())
# X = data.drop(columns=['target']).values
# y = data['target'].values
# scaler = StandardScaler()
# X = scaler.fit_transform(X)
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# # PREDICT
# cnn_model = CNN_model(X_train, y_train, X_test, y_test)
# cnn_model.train_and_return_best()


# LOAD DATA
data = pd.read_csv(csv_path, header=None)
data.columns = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalac', 'exang',
                'oldpeak', 'slope', 'ca', 'thal', 'target']
data['target'] = data.target.map({0: 0, 1: 1, 2: 1, 3: 1, 4: 1})
data['thal'] = data.thal.fillna(data.thal.mean())
data['ca'] = data.ca.fillna(data.ca.mean())
X = data.drop(columns=['target']).values
y = data['target'].values

# StandardScaler and data preparation
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)  # Scale the features

# Save the scaler to a file
joblib.dump(scaler, 'scaler.pkl')  # Save the scaler for later use in Flask API

# Split the data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42, stratify=y)

# PREDICT
cnn_model = CNN_model(X_train, y_train, X_test, y_test)
cnn_model.train_and_return_best()

# Ví dụ đầu vào từ người dùng
input_data = np.array([[63,1,1,145,233,1,2,150,0,2.3,3,0,6]])

# Chuẩn bị dữ liệu đầu vào theo cách tương tự
input_data_scaled = scaler.transform(input_data)

# Dự đoán kết quả từ mô hình
cnn_model = CNN_model(X_train, y_train, X_test, y_test)
cnn_model.load_best_model('backend/best_model.pth')
prediction = cnn_model.predict(input_data_scaled)

# In kết quả
print("Predicted result:", prediction)