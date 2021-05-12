import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MySite from "./MySite";

const App = () => {
  useEffect(() => {
    require("../utils/script");
  }, []);

  return (
    <BrowserRouter>
      <MySite />
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
