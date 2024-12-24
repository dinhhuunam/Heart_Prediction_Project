import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import '../ResultTable.css'; // Import file CSS

const ResultTable = () => {
  const location = useLocation();
  const { formData, prediction } = location.state || {};

  useEffect(() => {
    document.body.style.backgroundImage = 'none'; // Xóa ảnh nền khi vào trang kết quả
    document.body.style.backgroundColor = 'white'; // Đảm bảo nền trắng
    return () => {
      // Reset lại ảnh nền khi rời khỏi trang result (nếu cần)
      document.body.style.backgroundImage = '';
      document.body.style.backgroundColor = '';
    };
  }, []);

  if (!formData || !prediction) {
    return <div>Error: No data available. Please submit the form.</div>;
  }

  const fieldMapping = {
    "Tuổi": "Age",
    "Giới tính": "Sex",
    "Đau ngực": "Cp",
    "Huyết áp lúc nghỉ": "Trestbps",
    "Cholesterol": "Chol",
    "Đường huyết lúc đói": "Fbs",
    "Điện tâm đồ lúc nghỉ": "Restecg",
    "Nhịp tim tối đa": "Thalach",
    "Đau thắt ngực khi gắng sức": "Exang",
    "Độ chênh ST": "Oldpeak",
    "Độ dốc ST": "Slope",
    "Số mạch vành bị cản trở": "Ca",
    "Thalassemia": "Thal"
  };

  return (
    <div>
      <h1 className="text-center">Prediction Result</h1>
      <table className="result-page">
        <thead>
          <tr>
            <th>Thành phần</th>
            <th>Giá trị</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(fieldMapping).map((label) => (
            <tr key={fieldMapping[label]}>
              <td>{label}</td>
              <td>{formData[fieldMapping[label]]}</td>
            </tr>
          ))}
          <tr>
            <td>Kết quả dự đoán</td>
            <td>{prediction}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
