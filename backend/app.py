from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS # CORS for handling Cross-Origin Resource Sharing
import pickle 

# Create a Flask application instance
app = Flask(__name__)

# Enable CORS for all routes, allowing requests from any origin
CORS(app,resources={r"/*":{"origins":"*"}})

model = pickle.load(open('ml_model.pkl', 'rb'))

# Define a route for handling HTTP GET requests to the root URL
@app.route('/', methods=['GET'])
def get_data():
    data = {
        "message":"API is Running"
    }
    return jsonify(data)
  
# Define a route for making predictions
# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         data = request.get_json()
#         query_df = pd.DataFrame([data])
#         prediction = model.predict(query_df)
#         return jsonify({'Prediction': list(prediction)})
#     except Exception as e:
#         return jsonify({'error': str(e)})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Lấy dữ liệu từ yêu cầu POST dưới dạng JSON
        data = request.get_json()
        
        # Chuyển đổi dữ liệu đầu vào từ JSON thành NumPy array
        # Đảm bảo thứ tự các cột khớp với dữ liệu huấn luyện
        input_columns = ["Age", "Sex", "Cp", "Trestbps", "Chol", "Fbs", 
                         "Restecg", "Thalach", "Exang", "Oldpeak", "Slope", 
                         "Ca", "Thal"]
        
         # Chuyển dữ liệu đầu vào sang dạng float (numeric)
        input_array = []
        for col in input_columns:
            # Kiểm tra và chuyển đổi giá trị của mỗi cột sang kiểu float
            if col in data:
                try:
                    input_array.append(float(data[col]))  # Chuyển chuỗi thành float
                except ValueError:
                    return jsonify({'error': f"Invalid value for {col}. It should be a number."})
            else:
                return jsonify({'error': f"Missing required field: {col}"})
        print("Input array:", input_array)  # Kiểm tra mảng input

        # Dự đoán kết quả
        prediction = model.predict([input_array])  # Đưa trực tiếp NumPy array
        print("Prediction result:", prediction)  # In ra kết quả dự đoán
        
        return jsonify({'Prediction': int(prediction[0])})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)