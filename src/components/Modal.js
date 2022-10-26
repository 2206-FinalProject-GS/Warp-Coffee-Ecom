import React from 'react'
import ReactDOM from 'react-dom'

function Modal({isShown2, closeModal, handleSubmit,name, setName, description, setDescription,
    price,
    setPrice,
    roast,
    setRoast,
    grind,
    setGrind,
    inventory,
    setInventory,
    country,
    setCountry,
    weight,
    setWeight,
    imageUrl,
setImageUrl,itemName}) {
    if(!isShown2) return null
  return ReactDOM.createPortal (
    <div>
        <form className="flex flex-col justify-center items-center absolute top-0 bottom-0 left-0 right-0 w-screen h-screen gap-y-1 bg-gray-900 bg-opacity-80 backdrop-blur-md text-slate-800 " onSubmit={handleSubmit}>
        <h1 className='text-4xl text-gray-50 absolute top-16'>Updating: {itemName}</h1>
            <label className='text-gray-50'>
              Name:
            </label>
              <input t
                className='rounded-md'
                type="text"
                value={name}
                onChange={(event) => {
                setName(event.target.value);
                }}
              />
            <label className='text-gray-50'>
              Description:
            </label>
              <input
                className='rounded-md'
                type="text"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            <label className='text-gray-50'>
              Price:
            </label>
              <input
                className='rounded-md'
                type="text"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            <label className="my-2">
              <select
                id="roast"
                className=" w-full text-center rounded-md px-8 cursor-pointer"
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
                className="w-full text-center rounded-md  px-8 cursor-pointer"
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
                className=" w-full text-center rounded-md  px-8 cursor-pointer"
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
                className="w-full text-center rounded-md  px-8 cursor-pointer"
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
            <label className='text-gray-50'>
              Inventory:
            </label>
              <input
                className='rounded-md'
                value={inventory}
                type="text"
                onChange={(event) => {
                  setInventory(event.target.value);
                }}
              />
            <label className='text-gray-50'>
              Image Url:
            </label>
              <input
                className='rounded-md'
                type="text"
                value={imageUrl}
                onChange={(event) => {
                  setImageUrl(event.target.value);
                }}
              />
            <div className="flex flex-row gap-6">
                <button type="submit" className="font-medium mt-2 p-1 border-zinc-900 border-solid border-2 rounded-md bg-unbleached-silk hover:bg-black-coffee hover:text-unbleached-silk transition duration-300 flex">
                  UPDATE
                </button>
                <button  onClick={closeModal} className="font-medium mt-2 p-1 border-zinc-900 border-solid border-2 rounded-md bg-unbleached-silk hover:bg-black-coffee hover:text-unbleached-silk transition duration-300 flex">
                  CANCEL
                </button>
            </div>
        </form>
    </div>,
    document.getElementById('portal')
  )
}

export default Modal
