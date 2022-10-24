import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom'
import {
  getAllCartsByUserId,
  getUsersMe2,
  userCartCheckout,
} from "../apiAdapter";


const Confirmation = ({isShown3,closeModal}) => {

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
    <div className="flex flex-col justify-center items-center absolute top-0 bottom-0 left-0 right-0 w-screen h-screen gap-y-1 bg-gray-900 bg-opacity-80 backdrop-blur-md text-slate-800 "> <button onClick={handleCheckout}>Click</button> 
     </div>,document.getElementById('portal')
  )
}

export default Confirmation
