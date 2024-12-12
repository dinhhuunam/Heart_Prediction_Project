# Import necessary libraries
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score
import pickle
import os

# Check the current working directory to ensure the dataset path is correct
print("Current working directory:", os.getcwd())

# Load the dataset
try:
    heart_data = pd.read_csv('cleveland.csv')
except FileNotFoundError:
    print("Error: The file 'heart.csv' was not found. Please check the file path.")
    exit()

# Loại bỏ các dòng có giá trị thiếu trong X và Y
heart_data = heart_data.dropna()

# Display basic dataset information
print("Dataset Info:")
heart_data.info()

print("Dataset Description:")
print(heart_data.describe())

# Check for missing values
if heart_data.isnull().sum().any():
    print("Warning: Dataset contains missing values. Consider handling them before training.")
else:
    print("No missing values found.")

# Check target value distribution
print("Target value counts:")
print(heart_data['target'].value_counts())

# Prepare Features (X) and Target Variable (Y)
X = heart_data.drop(columns='target', axis=1)
Y = heart_data['target']

# Split data into training and testing sets
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, stratify=Y, random_state=2)

# Standardize the feature values to improve model performance
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Initialize and Train the Logistic Regression Model
model = LogisticRegression(max_iter=1000, random_state=42)
model.fit(X_train, Y_train)

# Evaluate the model
Y_pred = model.predict(X_test)
accuracy = accuracy_score(Y_test, Y_pred)
print(f"Model accuracy: {accuracy:.2f}")

# Define the path to save the trained model in the backend directory
backend_path = os.path.join(os.getcwd(), 'backend')  # Path to backend directory
model_file_path = os.path.join(backend_path, 'ml_model.pkl')

# Export the Trained Model using Pickle
with open(model_file_path, 'wb') as model_file:
    pickle.dump(model, model_file)
print("Trained model has been saved to '{model_file_path}'.")



# Mô hình dự đoán car price prediction
# Import necessary libraries
# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.linear_model import Lasso
# import pickle
# import os

# # # Check the current working directory to ensure the dataset path is correct
# print("Current working directory:", os.getcwd())
# # Load the dataset
# try:
#     car_dataset = pd.read_csv('car-data.csv')
# except FileNotFoundError:
#     print("Error: The file 'heart.csv' was not found. Please check the file path.")
#     exit()

# # Encoding Categorical Columns
# car_dataset.replace({'Fuel_Type': {'Petrol': 0, 'Diesel': 1, 'CNG': 2},
#                      'Seller_Type': {'Dealer': 0, 'Individual': 1},
#                      'Transmission': {'Manual': 0, 'Automatic': 1}}, inplace=True)

# # Prepare Features (X) and Target Variable (Y)
# X = car_dataset.drop(['Car_Name', 'Selling_Price'], axis=1)
# Y = car_dataset['Selling_Price']

# # Train-Test Split
# X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.1, random_state=2)

# # Initialize and Train the Lasso Regression Model
# lr = Lasso()
# lr.fit(X_train, Y_train)

# # Define the path to save the trained model in the backend directory
# backend_path = os.path.join(os.getcwd(), 'backend')  # Path to backend directory
# model_file_path = os.path.join(backend_path, 'ml_model.pkl')

# # Export the Trained Model using Pickle
# # pickle.dump(lr, open('ml_model.pkl', 'wb'))

# with open(model_file_path, 'wb') as model_file:
#     pickle.dump(lr, model_file)
# print("Trained model has been saved to '{model_file_path}'.")