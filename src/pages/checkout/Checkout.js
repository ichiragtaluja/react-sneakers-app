import "./Checkout.css";
import { AddressSection } from "./components/AddressSection/AddressSection";
import { OrderSummary } from "./components/OrderSummary/OrderSummary";

export const Checkout = () => {
  return (
    <div>
      <h1 className="page-heading">Checkout!</h1>
      <div className="checkout-container">
        <AddressSection />
        <OrderSummary />
      </div>
    </div>
  );
};
