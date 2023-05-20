import "./Cart.css";

import { useUserData } from "../../contexts/UserDataProvider";

export const Cart = () => {
  const { userDataState, dispatch } = useUserData();
  console.log(userDataState);

  return (
    <div>
      <h1>Cart</h1>
      <div className="cart-container">
        <div className="cart-products-container">
          {userDataState.cartProducts.map((product) => (
            <div className="cart-product-card" key={product.name}>
              <p>{product.name}</p>
              <div className="btn-container">
                <button onClick={}>-</button>
                {product.quantity}
                <button onClick={}>+</button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-price-container">
          <p>Total: Rs 1000</p>
        </div>
      </div>
    </div>
  );
};
