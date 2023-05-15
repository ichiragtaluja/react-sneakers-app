import "./App.css";
import { Header } from "./components/header/Header";
import { Home } from "./pages/home/Home";
import { Wishlist } from "./pages/Wishlist";
import { Cart } from "./pages/cart/Cart";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { ProductListing } from "./pages/product-listing/ProductListing";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product-listing" element={<ProductListing />} />
      </Routes>
    </div>
  );
}

export default App;
