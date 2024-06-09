import React from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useShoppingCart } from "../../contexts/shoppingCartContext";

import "./AddToCartButton.scss";

const AddToCartButton = () => {
  return (
    <div className="addToCart-btn">
      <MdOutlineAddShoppingCart />
    </div>
  );
};

export default AddToCartButton;
