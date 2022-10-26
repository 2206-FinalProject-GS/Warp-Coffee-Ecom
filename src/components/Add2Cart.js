import React, { useState, useEffect } from "react";

import {
  addProductsToCart,
  getAllCartsByUserId,
  getUsersMe2,
} from "../apiAdapter";

import { useNavigate } from "react-router-dom";
const AddProductToCart = ({ productsList, productId, productPrice, isLoggedIn, guestCart, setGuestCart}) => {

  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [selectedCart, setSelectedCart] = useState([]);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  async function fetchCart() {
    const token = localStorage.getItem("token");

 
    if (token) {
      const getUser = await getUsersMe2(token);
      const getTheCart = await getAllCartsByUserId(token, getUser.id);
      setSelectedCart(getTheCart);
    }
  }
  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem('cart', JSON.stringify(guestCart))
   
    }
    fetchCart();
  }, [guestCart]);

  async function handleSubmit() {
    const token = localStorage.getItem("token");
    if (token) {

   const addedCartProduct = await addProductsToCart(productId, selectedCart.id, quantity, productPrice)
    

    if (addedCartProduct.error) {
      setError(addedCartProduct);
    } else {
      setError(null);
      setCart(addedCartProduct);
      navigate("./");
    }
  } else {
    var newcart = localStorage.getItem('cart')
    console.log(newcart,'the newcart')
    newcart = (newcart) ? JSON.parse(newcart) : []
  
const newGuestP = productsList.filter(pro => pro.id === productId)
console.log(newGuestP, 'new')
for (let i =0; i < newGuestP.length; i++) {

  let info = newGuestP[i]
newcart.push(info)  
}


newcart.forEach(object => {
  object.quantity = 1;
})
  setGuestCart(newcart)
  }
  } 

  return (
    <button className="font-medium mt-2 px-4 py-1 border-zinc-900 border-solid border-2 rounded-md bg-unbleached-silk hover:bg-black-coffee hover:text-unbleached-silk transition duration-300"
       onClick={() => handleSubmit(productId)}>Add to Cart</button>
    
  );
};
export default AddProductToCart;
