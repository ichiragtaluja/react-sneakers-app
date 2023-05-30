import { useNavigate } from "react-router-dom";
import { useData } from "../../contexts/DataProvider";
import { useUserData } from "../../contexts/UserDataProvider";
import "./Checkout.css";
import { AddressSection } from "./components/AddressSection/AddressSection";
import { OrderSummary } from "./components/OrderSummary/OrderSummary";

export const Checkout = () => {
  const { userDataState } = useUserData();
  const navigate = useNavigate();
  const { loading } = useData();
  return (
    !loading &&
    (userDataState.cartProducts.length ? (
      <div>
        <h1 className="page-heading">Checkout!</h1>
        <div className="checkout-container">
          <AddressSection />
          <OrderSummary />
        </div>
      </div>
    ) : (
      <div className="no-items-container">
        <h2 className="page-heading">No items in your cart to Checkout!</h2>
        <button
          className="explore-btn"
          onClick={() => navigate("/product-listing")}
        >
          Explore
        </button>
      </div>
    ))
  );
};
