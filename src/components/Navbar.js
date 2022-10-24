import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { HomeIcon } from '@heroicons/react/solid';
import { getCartItemsbyUserId, getUsersMe2 } from "../apiAdapter";
import { useState, useEffect } from "react";

const Navbar = ({ setIsLoggedIn, setIsAdmin, isLoggedIn, isAdmin }) => {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("admin");
    localStorage.removeItem("brand");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/");
  }
  //  const [cartItems, setCartItems] = useState([])
  //  const token = localStorage.getItem("token");

  //  async function fetchCart() {
  //    if (token) {

  //   const getUser = await getUsersMe2(token);
  //   const getCartItems = await getCartItemsbyUserId(getUser.id);
  //   setCartItems(getCartItems);
  //    }
  // }

  // console.log(cartItems.length)

  // useEffect(() => {
  //   if (token)
  //   fetchCart();
  // }, []);

  return (
    <nav className="bg-black-coffee select-none shadow-lg ">
      <div className="flex items-center justify-center ">
        <div className="flex justify-between items-center ">
          <NavLink to="/">
            <img
              src={require("../components/Logo/coffee2.png")}
              className="sm:hidden w-28 lg:inline bg-opacity-20 bg-slate-900 hover:bg-opacity-30"
            />
            <span>
              <HomeIcon className=" lg:hidden h-7 w-7 text-gray-200" />
            </span>
          </NavLink>
        </div>
        <div className="flex items-center w-screen gap-x-20 ">
          {isAdmin && isLoggedIn ? (
            <div className=" flex flex-col sm:flex-row md:flex-row gap-x-60 sm:gap-x-8 md:mx-6 lg:gap-x-20 xl:gap-x-20 justify-evenly  w-full">
              <NavLink
                to="/createProduct"
                className=" my-1 text-base text-gray-200 hover:text-unbleached-silk transition duration-400 md:my-0 "
              >
                Create Product
              </NavLink>
              <NavLink
                to="/merchantProduct"
                className="text-base text-gray-200 hover:text-unbleached-silk transition duration-400 md:my-0"
              >
                My Products
              </NavLink>
            </div>
          ) : !isAdmin && isLoggedIn ? (
            <div className="flex justify-end items-center w-full">
            <NavLink
                to="/OrderHistory"
                className="my-1 mr-9 text-base text-gray-200 hover:text-unbleached-silk transition duration-400 md:my-0 "
              >
                OrderHistory
              </NavLink>
              <Link
                to="/cart"
                className="relative text-gray-200 hover:text-unbleached-silk"
              >
                <svg
                  className="h-10 w-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="absolute top-0 left-0 rounded-full bg-xanadu text-white p-1 text-xs"></span>
              </Link>

            </div>
          ) : (
            <div className="inline-flex flex-col md:flex-row md:mx-6 gap-x-60  xl:gap-x-20 sm:flex-row justify-end sm:gap-x-20 w-full">
              <NavLink
                to="/ProductCountry"
                className="my-1 mr-9 text-base text-gray-200 hover:text-unbleached-silk transition duration-400 md:my-0 "
              >
                Product by Country
              </NavLink>
              
              <NavLink
                to="/login"
                className="my-1 text-base text-gray-200 hover:text-unbleached-silk transition duration-400"
              >
                Log In/Register
              </NavLink>
           
              <Link
                to="/publiccart"
                className="relative text-gray-200 hover:text-unbleached-silk"
              >
                <svg
                  className="h-10 w-10 mr-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="absolute top-0 left-0 rounded-full bg-xanadu text-white p-1 text-xs"></span>
              </Link>
            </div>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="relative bg-xanadu px-6 py-2 mr-9 rounded-md font-medium "
            >
              Log Out
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
