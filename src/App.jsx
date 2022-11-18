import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./Navbar";
import Register from "./Register";
import Login from "./Login";
import StatusCheck from './StatusCheck';
import OnProgress from "./OnProgress";
import Approved from "./Approved";
import Mistake from "./Mistake";
import Resubmit from "./Resubmit";
import Loader from "./Loader";
import ResetPass from "./ResetPass";
import ForgotPass from "./ForgotPass";
import { useEffect } from "react";

const App = () => {
  const [isLoad, setLoad] = useState(true)

  useEffect(() => {
    document.body.classList.add('fixBody')

      setTimeout(() => {
        setLoad(false)
        document.body.classList.remove('fixBody')
      }, 800)
  }, [])

  return (
    <Router>
      <div className="App">
        <Loader isLoad={isLoad} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

        <Navbar />

        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to='/register' />} exact />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="resubmit" element={<Resubmit />} />
            <Route path="reset-password/:resetUrl" element={<ResetPass />} />
            <Route path="forgot-password" element={<ForgotPass />} />
            <Route path="status" >
              <Route index element={<StatusCheck />} />
              <Route path="onprogress" element={<OnProgress />} />
              <Route path="acc" element={<Approved />} />
              <Route path="mistakes" element={<Mistake />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;
