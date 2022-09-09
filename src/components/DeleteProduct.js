import { getProductsByAdmin, removeProduct } from "../apiAdapter";
import React, { useEffect } from "react";

const DeleteProduct = ({ myProducts, productId, setMyProducts }) => {
  async function handleDelete(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    await removeProduct(token, productId);
    const newMyProducts = await getProductsByAdmin(username);
    setMyProducts(newMyProducts);
  }

  useEffect(() => {}, [myProducts]);
  return (
    <div onClick={handleDelete}>
      <button
        className="container max-w-fit font-medium mt-2 px-4 py-1 border-zinc-900 border-solid border-2 rounded-md bg-unbleached-silk hover:bg-black-coffee hover:text-unbleached-silk transition duration-300"
        type="submit"
        id="deleteProduct"
      >
        DELETE
      </button>
    </div>
  );
};

export default DeleteProduct;
