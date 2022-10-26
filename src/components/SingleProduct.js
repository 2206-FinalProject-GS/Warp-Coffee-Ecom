import React, { useState, useEffect } from "react";
import { useLocation} from "react-router-dom";
import {
  getProductsById,
  addProductsToCart,
  getUsersMe2,
  getAllCartsByUserId,
} from "../apiAdapter";
import {ArrowLeftIcon, ArrowSmLeftIcon} from '@heroicons/react/solid'

const SingleProduct = ({ isAdmin, isLoggedIn }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedCart, setSelectedCart] = useState([]);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [guestCart, setGuestCart] = useState([]);
  const location = useLocation();
  const { productId } = location.state;
  const [getProduct, setGetProduct] = useState([]);

  async function fetchCart() {
    const token = localStorage.getItem("token");
    const admin = localStorage.getItem("admin")
    if (token && !admin) {
      const getUser = await getUsersMe2(token);
      const getTheCart = await getAllCartsByUserId(token, getUser.id);
      setSelectedCart(getTheCart);
    }
  }
  async function fetchProductId() {
    const getTheProduct = await getProductsById(productId);
    setGetProduct(getTheProduct);
  }
  useEffect(() => {
    if (!isLoggedIn) {
      fetchProductId();
      localStorage.setItem("cart", JSON.stringify(guestCart));
    }
    fetchProductId();
    fetchCart();
  }, [guestCart]);

  async function handleSubmit() {
    const token = localStorage.getItem("token");
    if (token) {
      const addedCartProduct = await addProductsToCart(
        productId,
        selectedCart.id,
        quantity,
        getProduct.price
      );

      if (addedCartProduct.error) {
        setError(addedCartProduct);
      } else {
        setError(null);
        setCart(addedCartProduct);
        // navigate("./");
      }
    } else {
      const newProd = [].concat(getProduct);

      newProd.forEach((object) => {
        object.quantity = 1;
      });

      setGuestCart(newProd);
    }
  }

  return (
    <section className="text-base overflow-hidden select-none h-screen flex justify-center items-center">
      <div className="container py-16 mx-auto bg-black bg-opacity-50 rounded-md shadow-2xl">
      <ArrowLeftIcon className="w-6 h-6 ml-8 relative bottom-6 text-gray-100 cursor-pointer" onClick={() => history.back()} />
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 ">
            <h2 className="text-base text-white  tracking-widest">
              BRAND NAME:{" "}
            </h2>
            <h1 className="text-white text-3xl my-4">
              {getProduct.name}
            </h1>
            <div className="flex mb-4">
              <a className="flex-grow text-white border-b-2 border-unbleached-silk py-2 text-lg px-1">
                Description
              </a>
            </div>
            <p className="leading-relaxed mb-4 text-white">
              {getProduct.description}
            </p>
            <div className="flex border-t border-unbleached-silk py-2">
              <span className="text-white ">Roast</span>
              <span className="ml-auto  text-white">{getProduct.roast}</span>
            </div>
            <div className="flex border-t border-unbleached-silk py-2">
              <span className="text-white ">Grind</span>
              <span className="ml-auto text-white">{getProduct.grind}</span>
            </div>
            <div className="flex border-t border-unbleached-silk py-2">
              <span className="text-white ">Weight</span>
              <span className="ml-auto  text-white">{getProduct.product_wt}</span>
            </div>
            <div className="flex border-t border-unbleached-silk py-2">
              <span className="text-white ">Country</span>
              <span className="ml-auto  text-white">{getProduct.country}</span>
            </div>

            <div className="flex border-t border-unbleached-silk py-2">
              <span className="text-white ">Price</span>
              <span className="ml-auto  text-white">${getProduct.price}</span>
            </div>
            {isAdmin ? null : (
              <div className="flex justify-center">
                <button
                  onClick={() => handleSubmit(productId)}
                  className=" bg-unbleached-silk hover:bg-black-coffee hover:text-unbleached-silk transition duration-300 font-medium mt-2 px-4 py-1 rounded-md "
                >
                  Add To Cart
                </button>
              </div>
            )}
          </div>
          <img
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded-md"
            src={require("./Logo/coffeeBag.jpg")}
          />
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
