import React, { useState } from "react";
import { createNewProduct } from "../apiAdapter";
import { useNavigate } from "react-router-dom";

const CreateProduct = ({ productsList, setProductsList }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState("");
  const [roast, setRoast] = useState("");
  const [grind, setGrind] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("")
  const [inventory, setInventory] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  


    async function handleSubmit (event) {
        event.preventDefault()
        const token = localStorage.getItem('token')
        const freshProduct = await createNewProduct(token, name,description, price, roast, grind, inventory, country, weight)
        if (freshProduct.error) {
            setError(freshProduct)
        } else {
            setError(null)
           await setProductsList([freshProduct, ...productsList ])
           navigate('../')
        }

    }

    return (
      <div className=' h-screen flex flex-col justify-center items-center pb-24'>
          <h1 className='font-bold text-3xl' id="addRoutineTitle">Add A Product</h1>
      {error && error.message ? (
        <h3>{error.message}</h3>
      ) : null}
      <form className='flex flex-col font-medium  ' onSubmit={handleSubmit}>
          <label className='my-2'>
              <div className='sm:hidden md:hidden lg:flex'>Name:</div>
              <input className='flex rounded-md focus:ring-black-coffee focus:border-black-coffee focus:z-10 lg:placeholder-transparent md:placeholder-slate-400' type='text' placeholder='Name' value={name}  onChange={(event)=> {setName(event.target.value)}}/>
          </label>
          <label className='my-2'>
          <div className='sm:hidden md:hidden lg:flex'>Description:</div> 
              <input className='flex rounded-md focus:ring-black-coffee focus:border-black-coffee focus:z-10 lg:placeholder-transparent md:placeholder-slate-400' type='text' placeholder='Description' value={description} onChange={(event)=> {setDescription(event.target.value)}}/>
          </label>
          <label className='my-2'>
          <div className=' lg:flex'>Price:</div> 
              <input className='flex rounded-md focus:ring-black-coffee focus:border-black-coffee focus:z-10 lg:placeholder-transparent md:placeholder-slate-400' type="text" placeholder='Price' value={price} onChange={(event)=> {setPrice(event.target.value)}}/>
          </label>
          <label className='my-2'>
              <select id="roast" className='flex w-full text-center rounded-md focus:ring-black-coffee focus:border-black-coffee focus:z-10' type='text' value={roast} onChange={(event)=> {setRoast(event.target.value)}}>
                <option defaultValue >--Select Roast--</option>
                <option value="Light">Light</option>
                <option value="Mild">Mild</option>
                <option value="Medium">Medium</option>
                <option value="Dark">Dark</option>
              </select>
          </label>
          <label className='my-2'>
              <select id="grind" className='flex w-full text-center rounded-md focus:ring-black-coffee focus:border-black-coffee focus:z-10' type='text' value={grind} onChange={(event)=> {setGrind(event.target.value)}}>
                <option defaultValue >--Select Grind--</option>
                <option value="Whole Beans">Whole Beans</option>
                <option value="Ground">Ground</option>
                <option value="Instant">Instant</option>
              </select>
          </label>
          <label className='my-2'> 
              <select id="Country" className='flex w-full text-center rounded-md focus:ring-black-coffee focus:border-black-coffee focus:z-10' type='text' value={country} onChange={(event)=> {setCountry(event.target.value)}}>
                <option defaultValue >--Select Country--</option>
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
          <label className='my-2'>
              <select id="weight" className='flex w-full text-center rounded-md focus:ring-black-coffee focus:border-black-coffee focus:z-10' type='text' value={weight} onChange={(event)=> {setWeight(event.target.value)}}>
                <option defaultValue >--Select Weight--</option>
                <option value="0.25 lb">0.25 lb</option>
                <option value="0.5 lb">0.5 lb</option>
                <option value="1 lb">1 lb</option>
                <option value="5 lb">5 lb</option>
              </select>
          </label>

          <label className='my-2 '>
          <div className=' lg:flex'>Inventory:</div>
              <input className='flex rounded-md focus:ring-black-coffee focus:border-black-coffee focus:z-10' value={inventory} type='text' onChange={(event)=> {setInventory(event.target.value)}}/>
          </label>
          <label className='my-2'>
          <div className=' lg:flex'>Image URL:</div> 
              <input className='flex rounded-md focus:ring-black-coffee focus:border-black-coffee focus:z-10 lg:placeholder-transparent md:placeholder-slate-400' type="text" placeholder='Image' value={image} onChange={(event)=> {setImage(event.target.value)}}/>
          </label>
          <button className="container font-medium mt-2 px-4 py-1 border-zinc-900 border-solid border-2 rounded-md bg-unbleached-silk hover:bg-black-coffee hover:text-xanadu transition duration-300" type='submit'>CREATE</button>

      </form>
    </div>
  );
};

export default CreateProduct;
