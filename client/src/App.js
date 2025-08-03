import Navbaar from "./components/header/Navbaar";
import Newnav from "./components/newnav/Newnav";
import Maincomp from "./components/home/Maincomp";
import Footer from "./components/footer/Footer";
import Signup from "./components/signup_signin/SignUp";
import SignIn from "./components/signup_signin/Sign_in";
import Cart from "./components/cart/Cart";
import Buynow from "./components/buynow/Buynow";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';


import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Routes, Route } from "react-router-dom";


function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  }, []);

  return (
    <>
      {data ? (
        <>
          <Navbaar />
          <Newnav />
          <Routes>
            <Route path="/" element={<Maincomp />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/getproductsone/:id" element={<Cart />} />
            <Route path="/buynow" element={<Buynow />} />
          </Routes>
          <Footer />
          

          {/* ✅ added here */}
        </>
      ) : (
        <div className="circle">
          <CircularProgress />
          <h2>Loading....</h2>
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}               // 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"                  // or "dark", "colored"
      />
    </>
  );
}

export default App;
