import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";

import "./Product.css";
const Product = ({ name, id, imgURL, price }) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addToCart({
        /*
  If we distress the actions in cart-slice the we can just do:
  "addToCart" instead of "cartActions.addToCart"
  */
        name, // it really is "name:name," but in JXS is not needed so we only do "name,"
        id,
        price,
      })
    );
  };
  return (
    <div className="card">
      <img src={imgURL} alt={name} />
      <h2>{name}</h2>
      <p>$ {price}</p>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
};

export default Product;
