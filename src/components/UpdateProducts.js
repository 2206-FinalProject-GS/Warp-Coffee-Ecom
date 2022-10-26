import React, { useState, useEffect } from "react";
import { getProductsByAdmin, updateProduct } from "../apiAdapter";
import Modal from "./Modal";


const UpdateProducts = ({ myProducts, setMyProducts, productId,itemName }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState("");
  const [roast, setRoast] = useState("");
  const [grind, setGrind] = useState("");
  const [inventory, setInventory] = useState(0);
  const [country, setCountry] = useState("");
  const [imageUrl, setImageUrl] = useState("")
  const [error, setError] = useState(null);
  const [isShown2, setIsShown2] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Clicked")
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const freshProduct = await updateProduct(
      token,
      productId,
      name,
      description,
      price,
      roast,
      grind,
      inventory,
      country,
      weight,
      imageUrl,
    );
    if (freshProduct.error) {
      setError(freshProduct);
    } else {
      setError(null);
      freshProduct;
      const newEditedProduct = await getProductsByAdmin(username);

      setMyProducts(newEditedProduct);
      setName("");
      setDescription("");
      setPrice(0);
      setRoast("");
      setGrind("");
      setWeight("");
      setInventory(0);
      setImageUrl("")
    }
  }
  useEffect(() => {}, [myProducts]);

  async function buttonClick2() {
    setIsShown2((current) => !current);
  }
  
  return (
    <div className="">
      <button
        className="max-w-fit text-center font-medium mt-2 px-4 py-1 border-zinc-900 border-solid border-2 rounded-md bg-unbleached-silk hover:bg-black-coffee hover:text-unbleached-silk transition duration-300"
        onClick={buttonClick2}
      >
        Edit
      </button>
      {isShown2 && (<Modal isShown2={isShown2} handleSubmit={handleSubmit} description={description} name={name} price={price} roast={roast} grind={grind} inventory={inventory} country={country} weight={weight} imageUrl={imageUrl} setDescription={setDescription} setName={setName} setPrice={setPrice} setRoast={setRoast} setGrind={setGrind} setInventory={setInventory} setCountry={setCountry} setWeight={setWeight} setImageUrl={setImageUrl} UpdateProducts= {UpdateProducts} itemName={itemName} closeModal={() => setIsShown2(false)} />)}
    </div>
  );
};

export default UpdateProducts;
