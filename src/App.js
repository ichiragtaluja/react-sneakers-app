import "./App.css";
import { Header } from "./components/header/Header";
import { Home } from "./pages/home/Home";
import { Cart } from "./pages/cart/Cart";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/auth/Login/Login";
import { ProductListing } from "./pages/product-listing/ProductListing";
import { ProductDetails } from "./pages/product-details/ProductDetails";
import { RequiresAuth } from "./components/requires-auth/RequiresAuth";
import { Signup } from "./pages/auth/Signup/Signup";
import MockAPI from "./components/Mockman/Mockman";
import { Logout } from "./pages/auth/Logout/Logout";
import { Checkout } from "./pages/checkout/Checkout";
import { Wishlist } from "./pages/wishlist/Wishlist";
import { UserProfile } from "./pages/UserProfile/UserProfile";
import { Profile } from "./pages/UserProfile/Profile/Profile";
import { Addresses } from "./pages/UserProfile/Addresses/Addresses";
import { Orders } from "./pages/UserProfile/Orders/Orders";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/cart"
          element={
            <RequiresAuth>
              <Cart />
            </RequiresAuth>
          }
        />
        <Route
          path="/wishlist"
          element={
            <RequiresAuth>
              <Wishlist />
            </RequiresAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/product-listing" element={<ProductListing />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/product-details/:productId"
          element={<ProductDetails />}
        />

        <Route
          path="/checkout"
          element={
            <RequiresAuth>
              <Checkout />
            </RequiresAuth>
          }
        />
        <Route path="/profile" element={<UserProfile />}>
          <Route
            path="/profile"
            element={
              <RequiresAuth>
                <Profile />
              </RequiresAuth>
            }
          />
          <Route path="/profile/orders" element={<Orders />} />
          <Route path="/profile/addresses" element={<Addresses />} />
        </Route>

        <Route path="/mock-api" element={<MockAPI />} />
      </Routes>
    </div>
  );
}

export default App;
