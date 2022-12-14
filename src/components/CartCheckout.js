import {
  getAllCartsByUserId,
  getUsersMe2,
  userCartCheckout,
} from "../apiAdapter";

import Confirmation from "./Confirmation";

import React, { useState, useEffect } from "react";

const CartCheckout = ({ cartItems }) => {
  const [isShown3, setIsShown3] = useState(false);



  async function buttonClick3(event) {
    event.preventDefault();
    setIsShown3((current) => !current);

  }

  useEffect(() => {}, []);

  return (
    <div>
      <button  id="checkout" onClick={buttonClick3}>
        CHECKOUT
      </button>
      {isShown3 && (<Confirmation isShown3={isShown3} closeModal={() => setIsShown3(false)} cartItems={cartItems}/>)}
    </div>
  );
};

export default CartCheckout;
