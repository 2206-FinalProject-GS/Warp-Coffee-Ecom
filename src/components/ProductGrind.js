import React, { useState, useEffect } from "react";
import { getProductsByCategoryGrind } from "../apiAdapter";

const ProductGrind = () => {
    const [grind, setGrind] = useState("")
  const [getProduct, setGetProduct] = useState([]);
  async function handleSubmit(event) {
    const getTheProduct = await getProductsByCategoryGrind(grind);
    setGetProduct(getTheProduct);
  }

//   useEffect(() => {
//     fetchProductGrind();
//   }, []);

  return (
    <div>
    <label className="my-2">
      <select
        id="weight"
        className="w-full text-center rounded-md focus:ring-rose-900 focus:border-rose-900 focus:z-10"
        type="text"
        value={grind}
        onChange={(event) => {
          setGetProduct(event.target.value);
        }}
      >
        <option defaultValue>--Select Weight--</option>
        <option value="0.25 lb">0.25 lb</option>
        <option value="0.5 lb">0.5 lb</option>
        <option value="1 lb">1 lb</option>
        <option value="5 lb">5 lb</option>
      </select>
    </label>
    <div>
        {getProduct.map((element, index) => (
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
          ))}
    </div>
</div>

  );
};

export default ProductGrind;
