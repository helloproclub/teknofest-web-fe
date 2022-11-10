import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from "./Navbar";
import Register from "./Register";
import Login from "./Login";
import OnProgress from "./OnProgress";
import Approved from "./Approved";
import Mistake from "./Mistake";
import Resubmit from "./Resubmit";
import Loader from "./Loader";
import ForgotPass from "./ForgotPass";

const App = () => {
  const [isLoad, setLoad] = useState(true)
  
  document.addEventListener('readystatechange', () => {
    document.body.classList.add('fixBody')

    if(document.readyState === 'complete') {
      setTimeout(() => {
        setLoad(false)
        document.body.classList.remove('fixBody')
      }, 800)
    }
  }) 

  return (
    <Router>
      <div className="App">
        <Loader isLoad={isLoad} />

        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to='/register' />} exact />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="resubmit" element={<Resubmit />} />
          <Route path="forgot-password" element={<ForgotPass />} />
          <Route path="status" >
            <Route path="onprogress" element={<OnProgress />} />
            <Route path="acc" element={<Approved />} />
            <Route path="mistakes" element={<Mistake />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
