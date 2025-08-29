import React from "react";
import Home from "./pages/product-home/product-home";
import ProductDescription from "./pages/product-description/product-description";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CartPage from "./pages/cart-page/CartPage";

function App() {
  return (
    <Router basename="/product"> 
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/:productId" element={<ProductDescription />} /> 
      </Routes>
    </Router>

  );
}

export default App;


