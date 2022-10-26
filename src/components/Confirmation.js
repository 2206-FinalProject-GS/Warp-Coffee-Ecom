import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom'
import {
  getAllCartsByUserId,
  getUsersMe2,
  userCartCheckout,
  getCartItemsbyUserId,
} from "../apiAdapter";

const Confirmation = ({isShown3,closeModal,cartItems}) => {

  async function handleCheckout(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const getUser = await getUsersMe2(token);
    console.log(getUser, "Show me the user for Cart Checkout");
    const getCart = await getAllCartsByUserId(token, getUser.id);
    console.log("New Cart", getCart);
    await userCartCheckout(token, getCart.id);
    location.reload();
    closeModal()
  }

   

  useEffect(() => {
    handleCheckout;
  }, []);


  if(!isShown3) return null
  return ReactDOM.createPortal (
    <div className="flex flex-col justify-center items-center absolute top-0 bottom-0 left-0 right-0 w-screen h-screen gap-y-1 backdrop-blur-md">
        <div className="flex flex-col justify-center items-center w-96 h-96 gap-y-1 bg-gray-900 bg-opacity-80 backdrop-blur-md select-none rounded-md shadow-md shadow-zinc-700 border-4 border-xanadu text-gray-200"> 
        <h1 className="text-3xl">Total:</h1>
          ${cartItems.map(item => item.price * item.quantity).reduce((prev, curr) => prev + curr, 0)}
          <h1 className="text-3xl">
          Total Quantity:</h1>
           {cartItems.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0)}
            <button onClick={handleCheckout} className='border-zinc-900 border-solid border-2 rounded-md bg-unbleached-silk hover:bg-black-coffee hover:text-unbleached-silk transition duration-300 text-slate-900 px-4 py-1 mt-9'>Confirm Purchase</button> 
        </div>
     </div>,document.getElementById('portal')
  )
}

export default Confirmation
