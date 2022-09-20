import React, { useState, useEffect } from "react";
import { getProductsByCategoryCountry } from "../apiAdapter";

const ProductCountry = ({productsList, setProductsList}) => {
    const [country, setCountry] = useState("")
  const [getProduct, setGetProduct] = useState([]);


  async function handleSubmit(event) {
    event.preventDefault();
    const getTheProduct = await getProductsByCategoryCountry(country);
    console.log(getTheProduct, "Product by grind")
    setProductsList(getTheProduct);
  }

//   useEffect(() => {
//     fetchProductGrind();
//   }, []);
const productgrind = productsList.map((element, index) => {
    return(
    <div key={`Product ${index}`} className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-800 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 group-hover:shadow-2xl xl:max-w-sm ">
        <img
          src={require("./Logo/coffeeBag.jpg")}
          className=" xl:max-w-full h-full object-center object-cover  group-hover:scale-150 transition duration-500"
        />
      </div>

      <h3 className=" text-center mt-2 text-2xl  text-gray-700 justify-center">
        {element.name}
      </h3>
      <p className="text-center mt-1 text-xl font-medium text-gray-900 ">
        ${element.price}
      </p>
      <div className=" inline-flex text-center items-center w-full gap-14 text-clip">
        
      </div>
    </div>
  )})

  return (
    <div>
          <form className="flex flex-col " onSubmit={handleSubmit}>
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
    <button id="Category button" type="submit">Grind</button>
    </form>
     <div>
        {productgrind}
    </div>
    </div>

  );
};

export default ProductCountry;
