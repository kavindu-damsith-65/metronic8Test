import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import LoginNew from "./pages/LoginNew";
import RegisterNew from "./pages/RegisterNew";
import "./index.css";
import "./styles/index.css";
import "./styles/about.css";
import "./styles/blog.css";
import "./styles/global.css";
import "./styles/services.css";


function App() {
  return (
    <div className="App">

      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginNew />} />
          <Route path="/register" element={<RegisterNew />} />

          {/* <Route path="/dashboard/*" element={<Dashboard />} />
                    <Route path="/*" element={
                        <>
                            <div>
                               

                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/store" element={<Shop />} />
                                  
                                    <Route path="/bag" element={<Bag />} />
                                    <Route path="/paymentgateway" element={<Paymentgateway />} />
                                </Routes>
                               
                            </div>
                        </>

                    } 
                    /> */}
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
