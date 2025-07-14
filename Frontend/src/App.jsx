import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Layout from "./layout/Layout";

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <Layout />
    </>
  );
}

export default App;
