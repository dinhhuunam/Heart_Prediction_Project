from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS # CORS for handling Cross-Origin Resource Sharing
from model import CNN_model
import torch
import numpy as np
from sklearn.preprocessing import StandardScaler
import torch.nn as nn
from flask_cors import CORS

# Load the trained model
model_path = 'best_model.pth'

# Define the CNN model
class TabularCNN(nn.Module):
    def __init__(self, num_filters=16, fc1_size=64):
        super(TabularCNN, self).__init__()
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

# Load model
model_data = torch.load(model_path, weights_only=True)  # Load model metadata

# Lấy các tham số từ file checkpoint
num_filters = model_data.get("num_filters", 16)  # Mặc định là 16 nếu không tồn tại
fc1_size = model_data.get("fc1_size", 64)  # Mặc định là 64 nếu không tồn tại

# Khởi tạo mô hình với đúng tham số
best_model = TabularCNN(num_filters=num_filters, fc1_size=fc1_size)
best_model.load_state_dict(model_data["state_dict"])  # Load weights
best_model.eval()

means = np.load('means.npy')
std_devs = np.load('std_devs.npy')


# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Define a route for handling HTTP GET requests to the root URL
@app.route('/', methods=['GET'])
def get_data():
    data = {
        "message":"API is Running"
    }
    return jsonify(data)

@app.route('/predict', methods=['POST'])
def predict():
    # Get input data from the request
    data = request.json

    # Convert input data to DataFrame
    input_df = pd.DataFrame([data])
    
    # Chuyển đổi tất cả giá trị trong input_df sang float
    try:
        input_df = input_df.astype(float)
    except ValueError as e:
        return jsonify({"error": f"Invalid input data: {str(e)}"}), 400

    # Chuẩn hóa dữ liệu đầu vào
    input_normalized = (input_df.values - means) / std_devs

    side_length = 4
    input_padded = np.pad(input_normalized, ((0, 0), (0, 3)), 'constant')
    X_cnn = input_padded.reshape(-1, 1, side_length, side_length).astype(np.float32)

    # Convert input to tensor
    X_tensor = torch.tensor(X_cnn, dtype=torch.float32)

    # Get prediction from model
    with torch.no_grad():
        y_pred = best_model(X_tensor).squeeze()
        y_pred = torch.sigmoid(y_pred)
        # Convert to percentage
        probability = y_pred.item() * 100

    # Return the prediction in a JSON response
    return jsonify({'probability': probability})

if __name__ == '__main__':
    app.run(debug=True)