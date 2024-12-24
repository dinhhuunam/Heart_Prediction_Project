// import React from 'react'
// import Form from './components/Form';

// const App=()=>{
//     return (
//       <div>
//           <Form/>
//       </div>
//     )
// }
// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import ResultTable from "./components/ResultTable";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/result" element={<ResultTable />} />
      </Routes>
    </Router>
  );
};

export default App;
