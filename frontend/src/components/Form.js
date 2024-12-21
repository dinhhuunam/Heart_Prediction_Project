import React, { useState } from 'react';
import '../App.css'; // Import các file CSS của bạn
import axios from "axios"; // Import thư viện axios để gọi API

const Form = () => {
  const [formData, setFormData] = useState({
    Age: '',
    Sex: '',
    Cp: '',
    Trestbps: '',
    Chol: '',
    Fbs: '',
    Restecg: '',
    Thalach: '',
    Exang: '',
    Oldpeak: '',
    Slope: '',
    Ca: '',
    Thal: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showSpan, setShowSpan] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePredictClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowSpan(true);

    try {
      const response = await axios.post("http://localhost:5000/predict", formData);

      // Kiểm tra nếu API trả về dữ liệu hợp lệ
      if (response.data && response.data.probability) {
        setResult(`The Predicted Risk is: ${response.data.probability.toFixed(2)}%`);
      } else {
        setResult("Có lỗi xảy ra, không có dữ liệu trả về.");
      }
    } catch (error) {
      console.error("Error calling the API:", error);
      setResult("Có lỗi xảy ra, vui lòng thử lại.");
    }

    setIsLoading(false);
  };

  return (
    <div>
      <div className="head_content">
        <h1 className="text-center">Heart Prediction</h1>
      </div>

      <form method="post" acceptCharset="utf-8" name="Modelform">
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label>{key}</label>
            <input
              type="text"
              className="form-control"
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="form-group mt-3">
          <button
            className="btn btn-primary form-control"
            disabled={isLoading}
            onClick={!isLoading ? handlePredictClick : null}
          >
            {isLoading ? "Predicting..." : "Predict"}
          </button>
        </div>

        <div className="text-center mt-3">
          <h4>
            {showSpan && (
              <span id="prediction">
                {result ? (
                  <p>{result}</p>
                ) : (
                  <p>Please fill out each field in the form completely</p>
                )}
              </span>
            )}
          </h4>
        </div>
      </form>
    </div>
  );
  
};
export default Form;