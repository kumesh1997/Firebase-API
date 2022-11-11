import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch, useSelector } from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../src/main.css';
import UpdateStudents from "./Screens/UpdateStudents";
import Home from "./Screens/Home";
import Edit from "./Screens/Edit";

function App() {

  

  return (
    <div className="">
      <div><h2>Student Details</h2></div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modal" element={<UpdateStudents />} />
          <Route path="/edit" element={<Edit />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
