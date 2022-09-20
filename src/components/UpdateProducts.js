import React, { useState, useEffect } from "react";
import { getProductsByAdmin, updateProduct } from "../apiAdapter";
const UpdateProducts = ({ myProducts, setMyProducts, productId }) => {
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
    <div>
      <button
        className="max-w-fit text-center font-medium mt-2 px-4 py-1 border-zinc-900 border-solid border-2 rounded-md bg-unbleached-silk hover:bg-black-coffee hover:text-unbleached-silk transition duration-300"
        onClick={buttonClick2}
      >
        EDIT PRODUCT
      </button>
      {isShown2 && (
        <form className="flex flex-col " onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              placeholder="update Name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </label>
          <label className="">
            Description:
            <input
              type="text"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </label>
          <label className="">
            Price:
            <input
              type="text"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </label>
          <label className="my-2">
            <select
              id="roast"
              className=" w-full text-center rounded-md focus:ring-rose-900 focus:border-rose-900 focus:z-10"
              type="text"
              value={roast}
              onChange={(event) => {
                setRoast(event.target.value);
              }}
            >
              <option defaultValue>--Select Roast--</option>
              <option value="Light">Light</option>
              <option value="Mild">Mild</option>
              <option value="Medium">Medium</option>
              <option value="Dark">Dark</option>
            </select>
          </label>
          <label className="my-2">
            <select
              id="grind"
              className="w-full text-center rounded-md focus:ring-rose-900 focus:border-rose-900 focus:z-10"
              type="text"
              value={grind}
              onChange={(event) => {
                setGrind(event.target.value);
              }}
            >
              <option defaultValue>--Select Grind--</option>
              <option value="Whole Beans">Whole Beans</option>
              <option value="Ground">Ground</option>
              <option value="Instant">Instant</option>
            </select>
          </label>
          <label className="my-2">
            <select
              id="Country"
              className=" w-full text-center rounded-md focus:ring-rose-900 focus:border-rose-900 focus:z-10"
              type="text"
              value={country}
              onChange={(event) => {
                setCountry(event.target.value);
              }}
            >
              <option defaultValue>--Select Country--</option>
              <option value="Brazil">Brazil</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Colombia">Colombia</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Ethiopia">Ethiopia</option>
              <option value="Honduras">Honduras</option>
              <option value="India">India</option>
              <option value="Uganda">Uganda</option>
            </select>
          </label>
          <label className="my-2">
            <select
              id="weight"
              className="w-full text-center rounded-md focus:ring-rose-900 focus:border-rose-900 focus:z-10"
              type="text"
              value={weight}
              onChange={(event) => {
                setWeight(event.target.value);
              }}
            >
             <option defaultValue >--Select Weight--</option>
                <option value="0.25 lb">0.25 lb</option>
                <option value="0.5 lb">0.5 lb</option>
                <option value="1 lb">1 lb</option>
                <option value="5 lb">5 lb</option>
            </select>
          </label>
          <label className="">
            Inventory:
            <input
              value={inventory}
              type="text"
              onChange={(event) => {
                setInventory(event.target.value);
              }}
            />
          </label>
          <label className="">
            Image Url:
            <input
              type="text"
              value={imageUrl}
              onChange={(event) => {
                setImageUrl(event.target.value);
              }}
            />
          </label>
          <button className="container font-medium mt-2  py-1 border-zinc-900 border-solid border-2 rounded-md bg-orange-300 hover:bg-rose-900 hover:text-yellow-600 transition duration-500">
            UPDATE
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateProducts;
