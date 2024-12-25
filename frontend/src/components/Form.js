import React, { useState } from "react"; // Xóa useEffect

import { useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";

const Form = () => {
  const navigate = useNavigate();

  const fieldMapping = {
    "Tuổi (29 - 77)": "Age",
    "Giới tính": "Sex",
    "Loại Đau ngực": "Cp",
    "Huyết áp lúc nghỉ ngơi (94 - 200)": "Trestbps",
    "Cholesterol (126 - 564)": "Chol",
    "Đường huyết lúc đói (>120mg/dl)": "Fbs",
    "Điện tâm đồ lúc nghỉ": "Restecg",
    "Nhịp tim tối đa (71 - 202)": "Thalach",
    "Đau thắt ngực khi gắng sức": "Exang",
    "Độ chênh ST (0 - 6.2)": "Oldpeak",
    "Độ dốc ST": "Slope",
    "Số mạch vành bị cản trở (0 - 3)": "Ca",
    "Xạ hình tưới máu cơ tim": "Thal"
  };

  // Hàm kiểm tra và tải dữ liệu từ localStorage
  const loadFormData = () => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      return JSON.parse(storedData);
    }
    return {
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
    };
  };

  const [formData, setFormData] = useState(loadFormData);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const updatedData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedData);
    localStorage.setItem("formData", JSON.stringify(updatedData)); // Lưu vào localStorage
  };

  const validateForm = () => {
    for (let key in formData) {
      if (formData[key] === '') {
        return false; 
      }
    }
    return true; 
  };

  const handlePredictClick = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Vui lòng điền đầy đủ tất cả các thông tin.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/predict", formData);

      if (response.data && response.data.probability) {
        const prediction = `${response.data.probability.toFixed(2)}%`;

        // Chuyển hướng sang trang kết quả với dữ liệu
        navigate("/result", { state: { formData, prediction } });
      } else {
        alert("Có lỗi xảy ra, không có dữ liệu trả về.");
      }
    } catch (error) {
      console.error("Error calling the API:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <form method="post" acceptCharset="utf-8" name="Modelform">
        <div className="head_content">
          <h1 className="text-center">Heart Prediction</h1>
        </div>
        {Object.keys(fieldMapping).map((label) => (
          <div className="form-group" key={fieldMapping[label]}>
            <label>{label}</label>
            {/* Giới tính */}
            {fieldMapping[label] === "Sex" ? (
              <select
                className="form-control"
                id={fieldMapping[label]}
                name={fieldMapping[label]}
                value={formData[fieldMapping[label]]}
                onChange={handleChange}
              >
                <option value="">--Chọn--</option>
                <option value="1">Nam</option>
                <option value="0">Nữ</option>
              </select>
            )
            /* Loại đau ngực */
            : fieldMapping[label] === "Cp" ? (
              <select
                className="form-control"
                id={fieldMapping[label]}
                name={fieldMapping[label]}
                value={formData[fieldMapping[label]]}
                onChange={handleChange}
              >
                <option value="">--Chọn--</option>
                <option value="0">Typical Angina (Đau thắt ngực điển hình)</option>
                <option value="1">Atypical Angina (Đau thắt ngực không điển hình)</option>
                <option value="2">Non-Anginal Pain (Đau không thắt ngực)</option>
                <option value="3">Asymptomatic (Không có triệu chứng)</option>
              </select>
            ) 
            // Đường huyết lúc đói (Fbs)
            : fieldMapping[label] === "Fbs" ? (
              <select
                className="form-control"
                id={fieldMapping[label]}
                name={fieldMapping[label]}
                value={formData[fieldMapping[label]]}
                onChange={handleChange}
              >
                <option value="">--Chọn--</option>
                <option value="1">Có</option>
                <option value="0">Không</option>
              </select>
            ) 
            // Điện tâm đồ lúc nghỉ ngơi (Restecg)
            : fieldMapping[label] === "Restecg" ? (
              <select
                className="form-control"
                id={fieldMapping[label]}
                name={fieldMapping[label]}
                value={formData[fieldMapping[label]]}
                onChange={handleChange}
              >
                <option value="">--Chọn--</option>
                <option value="0">Normal (Bình thường)</option>
                <option value="1">Having ST-T Wave (Có bất thường sóng ST-T)</option>
                <option value="2">Showing probable or definite left ventricular hypertrophy by Estes’ criteria (Có khả năng hoặc chắc chắn bị phì đại thất trái)</option>
              </select>
            )
            // Đau thắt ngực khi gắng sức (Exang)
            : fieldMapping[label] === "Exang" ? (
              <select
                className="form-control"
                id={fieldMapping[label]}
                name={fieldMapping[label]}
                value={formData[fieldMapping[label]]}
                onChange={handleChange}
              >
                <option value="">--Chọn--</option>
                <option value="1">Có</option>
                <option value="0">Không</option>
              </select>
            )
            // Độ dốc ST (Slope)
            : fieldMapping[label] === "Slope" ? (
              <select
                className="form-control"
                id={fieldMapping[label]}
                name={fieldMapping[label]}
                value={formData[fieldMapping[label]]}
                onChange={handleChange}
              >
                <option value="">--Chọn--</option>
                <option value="0">Dốc lên</option>
                <option value="1">Phẳng</option>
                <option value="2">Dốc xuống</option>
              </select>
            )
            // Xạ hình tưới máu cơ tim (Thal)
            : fieldMapping[label] === "Thal" ? (
              <select
                className="form-control"
                id={fieldMapping[label]}
                name={fieldMapping[label]}
                value={formData[fieldMapping[label]]}
                onChange={handleChange}
              >
                <option value="">--Chọn--</option>
                <option value="3">Normal (Bình thường)</option>
                <option value="6">Fixed Defect (Khuyết tật cố định)</option>
                <option value="7">Reversible Defect (Khuyết tật có thể hồi phục)</option>
              </select>
            )
            // Các trường khác là input
            : (
              <input
                type="text"
                className="form-control"
                id={fieldMapping[label]}
                name={fieldMapping[label]}
                value={formData[fieldMapping[label]]}
                onChange={handleChange}
              />
            )}
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
      </form>
    </div>
  );
};

export default Form;