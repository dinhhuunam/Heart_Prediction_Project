// import React, { useState } from "react";

// const Form = () => {
//   // State to manage loading state
//   const [isLoading, setIsloading] = useState(false);
//   // State to manage form data
//   const [formData, setFormData] = useState({
//     Year: "",
//     Present_Price: "",
//     Kms_Driven: "",
//     Fuel_Type: "",
//     Seller_Type: "",
//     Transmission: "",
//     Owner: "",
//   });
//   // State to manage prediction result
//   const [result, setResult] = useState("");
//   // State to manage displaying result
//   const [showSpan, setShowSpan] = useState(false);

//   const handleChange = (event) => {
//     const value = event.target.value;
//     const name = event.target.name;
//     let inputData = { ...formData };
//     inputData[name] = value;
//     setFormData(inputData);
//   };

//   // Function to handle the 'Predict Selling Price' button click
//   const handlePredictClick = () => {
//     const url = "http://localhost:5000/predict";
//     setIsloading(true);
//     const jsonData = JSON.stringify(formData);
//     // Fetch request to the Flask backend
//     fetch(url, {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//       body: jsonData,
//     })
//       .then((response) => response.json())
//       .then((response) => {
//         setResult(response.Prediction);
//         setIsloading(false);
//         setShowSpan(true);
//       });
//   };

//   return (
//     <>
//       <div className="container text-center mt-4">
//         <h1 className="text-center">Car Price Prediction</h1>
//         <div className="container">
//           <form method="post" acceptCharset="utf-8" name="Modelform">
//             <div className="text-center mt-3">
//               <label>
//                 <b>Enter Year of Purchase:</b>
//               </label>
//               <br />
//               <input
//                 type="text"
//                 className="form-control"
//                 id="Year"
//                 name="Year"
//                 value={formData.Year}
//                 onChange={handleChange}
//                 placeholder="Enter Year of Purchase "
//               />
//             </div>
//             <div className="form-group">
//               <label>
//                 <b>Enter Present Price(in Lakhs):</b>
//               </label>
//               <br />
//               <input
//                 type="text"
//                 className="form-control"
//                 id="Present_Price"
//                 name="Present_Price"
//                 value={formData.Present_Price}
//                 onChange={handleChange}
//                 placeholder="Enter Present Price(in Lakhs)"
//               />
//             </div>
//             <div className="form-group">
//               <label>
//                 <b>
//                   Enter the Number of Kilometres that the car has travelled:
//                 </b>
//               </label>
//               <br />
//               <input
//                 type="text"
//                 className="form-control"
//                 id="Kms_Driven"
//                 name="Kms_Driven"
//                 value={formData.Kms_Driven}
//                 onChange={handleChange}
//                 placeholder="Enter the kilometres driven "
//               />
//             </div>
//             <div className="form-group">
//               <label>
//                 <b>Select the Fuel Type:</b>
//               </label>
//               <br />
//               <select
//                 className="selectpicker form-control"
//                 id="Fuel_Type"
//                 name="Fuel_Type"
//                 value={formData.Fuel_Type}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="" disabled>
//                   Select
//                 </option>
//                 <option value="0">Petrol</option>
//                 <option value="1">Diesel</option>
//                 <option value="2">CNG</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label>
//                 <b>Select the Seller Type:</b>
//               </label>
//               <br />
//               <select
//                 className="selectpicker form-control"
//                 id="Seller_Type"
//                 name="Seller_Type"
//                 value={formData.Seller_Type}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="" disabled>
//                   Select
//                 </option>
//                 <option value="0">Dealer</option>
//                 <option value="1">Individual</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label>
//                 <b>Select the Transmission Type:</b>
//               </label>
//               <br />
//               <select
//                 className="selectpicker form-control"
//                 id="Transmission"
//                 name="Transmission"
//                 value={formData.Transmission}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="" disabled>
//                   Select
//                 </option>
//                 <option value="0">Manual</option>
//                 <option value="1">Automatic</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label>
//                 <b>Enter the Number of Owners:</b>
//               </label>
//               <br />
//               <input
//                 type="text"
//                 className="form-control"
//                 id="Owner"
//                 name="Owner"
//                 value={formData.Owner}
//                 onChange={handleChange}
//                 placeholder="Enter the number of Owner "
//               />
//             </div>
//             <div className="form-group mt-3">
//               <button
//                 className="btn btn-primary form-control"
//                 disabled={isLoading}
//                 onClick={!isLoading ? handlePredictClick : null}
//               >
//                 Predict Selling Price
//               </button>
//             </div>
//           </form>
//           <br />
//           <div className="text-center">
//             <h4>
//               {showSpan && (
//                 <span id="prediction">
//                   {result && Object.keys(result).length !== 0 ? (
//                     <p>The Predicted Price is {result} Lakhs</p>
//                   ) : (
//                     <p>Please fill out each field in the form completely</p>
//                   )}
//                 </span>
//               )}
//             </h4>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Form;


// import React, { useState } from "react";
// import '../index.css';
// import '../App.css';  // Thêm file CSS vào đây

// const Form = () => {
//   // State to manage loading state
//   const [isLoading, setIsloading] = useState(false);
//   // State to manage form data
//   const [formData, setFormData] = useState({
//     Age: "",
//     Sex: "",
//     Cp: "",
//     Trestbps: "",
//     Chol: "",
//     Fbs: "",
//     Restecg: "",
//     Thalach: "",
//     Exang: "",
//     Oldpeak: "",
//     Slope: "",
//     Ca: "",
//     Thal: "",
//     Target: "",
//   });
//   // State to manage prediction result
//   const [result, setResult] = useState("");
//   // State to manage displaying result
//   const [showSpan, setShowSpan] = useState(false);

//   const handleChange = (event) => {
//     const value = event.target.value;
//     const name = event.target.name;

//     // Convert to numeric types where applicable
//     // const numericFields = ['Age', 'Sex', 'Cp', 'Trestbps', 'Chol', 'Fbs', 'Restecg', 'Thalach', 'Exang', 'Oldpeak', 'Slope', 'Ca', 'Thal'];

//     // // Check if the current field is numeric and convert
//     // const convertedValue = numericFields.includes(name) ? parseFloat(value) : value;
//     let inputData = { ...formData };
//     inputData[name] = value;
//     setFormData(inputData);
//   };

//   // Function to handle the 'Predict' button click
//   const handlePredictClick = () => {
//     const url = "http://localhost:5000/predict";
//     setIsloading(true);
//     const jsonData = JSON.stringify(formData);
//     // Fetch request to the Flask backend
//     fetch(url, {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//       body: jsonData,
//     })
//       // .then((response) => response.json())
//       // .then((response) => {
//       //   setResult(response.Prediction);
//       //   setIsloading(false);
//       //   setShowSpan(true);
//       // });
//       .then((response) => response.json())
//       .then((response) => {
//         console.log(response); // Kiểm tra kết quả từ backend
//         setResult(response.Prediction);
//         setIsloading(false);
//         setShowSpan(true);
//       })
//       .catch((error) => {
//         console.error("Error:", error); // Kiểm tra lỗi nếu có
//         setIsloading(false);
//       });
//   };

//   return (
//     <>
//       <div className="container text-center mt-4">
//         <h1 className="text-center">Heart Prediction</h1>
//         <div className="container">
//           <form method="post" acceptCharset="utf-8" name="Modelform">
//             <div className="text-center mt-3">
//               <label>
//                 <b>Age:</b>
//               </label>
//               <br />
//               <input
//                 type="text"
//                 className="form-control"
//                 id="Age"
//                 name="Age"
//                 value={formData.Age}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>
//                 <b>Sex:</b>
//               </label>
//               <br />
//               <input
//                 type="text"
//                 className="form-control"
//                 id="Sex"
//                 name="Sex"
//                 value={formData.Sex}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>
//                 <b>Cp:</b>
//               </label>
//               <br />
//               <input
//                 type="text"
//                 className="form-control"
//                 id="Cp"
//                 name="Cp"
//                 value={formData.Cp}
//                 onChange={handleChange}
//               />
//             </div>
            
//             <div className="form-group">
//               <label>
//                 <b>Trestbps:</b>
//               </label>
//               <br />
//               <input
//                 type="text"
//                 className="form-control"
//                 id="Trestbps"
//                 name="Trestbps"
//                 value={formData.Trestbps}
//                 onChange={handleChange}
//               />
//             </div>
            
//             <div className="form-group">
//               <label>
//                 <b>Chol:</b>
//               </label>
//               <br />
//               <input
//                 type="text"
//                 className="form-control"
//                 id="Chol"
//                 name="Chol"
//                 value={formData.Chol}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group">
//               <label>
//                 <b>Fbs:</b>
//               </label>
//               <br />
//               <input
//                 type="text"
//                 className="form-control"
//                 id="Fbs"
//                 name="Fbs"
//                 value={formData.Fbs}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group">
//               <label>
//                 <b>Restecg:</b>
//               </label>
//               <br />
//               <input
//                 type="text"
//                 className="form-control"
//                 id="Restecg"
//                 name="Restecg"
//                 value={formData.Restecg}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group">
//               <label>
//                 <b>Thalach:</b>
//               </label>
//               <br />
//               <input
//                 type="text"
//                 className="form-control"
//                 id="Thalach"
//                 name="Thalach"
//                 value={formData.Thalach}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group">
//               <label>
//                 <b>Exang:</b>
//               </label>
//               <br />
//               <input
//                 type="text"
//                 className="form-control"
//                 id="Exang"
//                 name="Exang"
//                 value={formData.Exang}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group">
//               <label>
//                 <b>Oldpeak:</b>
//               </label>
//               <br />
//               <input
//                 type="text"
//                 className="form-control"
//                 id="Oldpeak"
//                 name="Oldpeak"
//                 value={formData.Oldpeak}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group">
//               <label>
//                 <b>Slope:</b>
//               </label>
//               <br />
//               <input
//                 type="text"
//                 className="form-control"
//                 id="Slope"
//                 name="Slope"
//                 value={formData.Slope}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group">
//               <label>
//                 <b>Ca:</b>
//               </label>
//               <br />
//               <input
//                 type="text"
//                 className="form-control"
//                 id="Ca"
//                 name="Ca"
//                 value={formData.Ca}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group">
//               <label>
//                 <b>Thal:</b>
//               </label>
//               <br />
//               <input
//                 type="text"
//                 className="form-control"
//                 id="Thal"
//                 name="Thal"
//                 value={formData.Thal}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group">
//               <label>
//                 <b>Target:</b>
//               </label>
//               <br />
//               <input
//                 type="text"
//                 className="form-control"
//                 id="Target"
//                 name="Target"
//                 value={formData.Target}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group mt-3">
//               <button
//                 className="btn btn-primary form-control"
//                 disabled={isLoading}
//                 onClick={!isLoading ? handlePredictClick : null}
//               >
//                 Predict
//               </button>
//             </div>
//           </form>
//           <br />
//           {/* <div className="text-center">
//             <h4>
//               {showSpan && (
//                 <span id="prediction">
//                   {result && Object.keys(result).length !== 0 ? (
//                     <p>The Predicted is {result} Lakhs</p>
//                   ) : (
//                     <p>Please fill out each field in the form completely</p>
//                   )}
//                 </span>
//               )}
//             </h4>
//           </div> */}

//           <div className="text-center">
//             <h4>
//               {showSpan && (
//                 <span id="prediction">
//                   {result ? (
//                     <p>The Predicted is {result}</p>
//                   ) : (
//                     <p>Please fill out each field in the form completely</p>
//                   )}
//                 </span>
//               )}
//             </h4>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Form;



import React, { useState } from 'react';
import '../App.css'; // Import các file CSS của bạn

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

  const handlePredictClick = () => {
    setIsLoading(true);
    setShowSpan(true);
    setTimeout(() => {
      setResult("Heart Disease Prediction: Positive");  // Giả sử đây là kết quả trả về
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div>
      <div className="head_content">
        <h1 className="text-center">Heart Prediction</h1>
      </div>

      <form method="post" acceptCharset="utf-8" name="Modelform">
        <label>Age</label>  
        <input type="text"
                className="form-control"
                id="Age"
                name="Age"
                value={formData.Age}
                onChange={handleChange}
        />
        <label>Sex</label>
        <input
                type="text"
                className="form-control"
                id="Sex"
                name="Sex"
                value={formData.Sex}
                onChange={handleChange}
        />
        <label>Cp</label>
        <input
                type="text"
                 className="form-control"
                 id="Cp"
                 name="Cp"
                 value={formData.Cp}
                 onChange={handleChange}
        />
        <label>Trestbps</label>
        <input
                type="text"
                className="form-control"
                id="Trestbps"
                name="Trestbps"
                value={formData.Trestbps}
                onChange={handleChange}
        />
        <label>Chol</label>
        <input
                type="text"
                className="form-control"
                id="Chol"
                name="Chol"
                value={formData.Chol}
                onChange={handleChange}
        />

        <label>Fbs</label>
        <input
                type="text"
                className="form-control"
                id="Fbs"
                name="Fbs"
                value={formData.Fbs}
                onChange={handleChange}
        />

        <label>Restecg</label>
        <input
                type="text"
                className="form-control"
                id="Restecg"
                name="Restecg"
                value={formData.Restecg}
                onChange={handleChange}
        />

        <label>Thalach</label>
        <input
                type="text"
                className="form-control"
                id="Thalach"
                name="Thalach"
                value={formData.Thalach}
                onChange={handleChange}
              />

        <label>Exang</label>
        <input
                type="text"
                className="form-control"
                id="Exang"
                name="Exang"
                value={formData.Exang}
                onChange={handleChange}
              />

        <label>Oldpeak</label>
        <input
                type="text"
                className="form-control"
                id="Oldpeak"
                name="Oldpeak"
                value={formData.Oldpeak}
                onChange={handleChange}
              />

        <label>Slope</label>
        <input
                type="text"
                className="form-control"
                id="Slope"
                name="Slope"
                value={formData.Slope}
                onChange={handleChange}
              />

        <label>Ca</label>
        <input
                type="text"
                className="form-control"
                id="Ca"
                name="Ca"
                value={formData.Ca}
                onChange={handleChange}
              />

        <label>Thal</label>
        <input
                type="text"
                className="form-control"
                id="Thal"
                name="Thal"
                value={formData.Thal}
                onChange={handleChange}
              />

        <label>Target</label>
        <input
                type="text"
                className="form-control"
                id="Target"
                name="Target"
                value={formData.Target}
                onChange={handleChange}
              />
              
            {/* Các trường nhập liệu khác */}
            <div className="form-group mt-3">
              <button
                className="btn btn-primary form-control"
                disabled={isLoading}
                onClick={!isLoading ? handlePredictClick : null}
              >
                Predict
              </button>
            </div>

            {/* Hiển thị kết quả dưới cùng */}
          <div className="text-center mt-3">
            <h4>
              {showSpan && (
                <span id="prediction">
                  {result ? (
                    <p>The Predicted is {result}</p>
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