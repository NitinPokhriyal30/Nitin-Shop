import React from 'react';
import './App.css';
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
        <Route path="/search/:keyword" element={<HomeScreen />}/>
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/">
          <Route path="cart" element={<CartScreen />} />
          <Route path="/cart/:id" element={<CartScreen />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
