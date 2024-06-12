import React, { useState } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";


import "./AddToCartButton.scss";

const AddToCartButton = ({ id }) => {


  const addItemInCart = async (id) => {
    try {
      const response = await fetch(`https://127:0.0.1:8000/api/add_to_cart/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ProductID: id,
          page: "hdd",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("Item added to cart successfully");
    } catch (error) {
      alert("There was a problem with the network request");
    }
  };

  return (
    <div className="addToCart-btn">
      <MdOutlineAddShoppingCart onClick={() => addItemInCart(id)} />

    </div>
  );
};

export default AddToCartButton;
