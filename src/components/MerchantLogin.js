import { merchantLogin } from "../apiAdapter";
import React, { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import { LockClosedIcon } from '@heroicons/react/solid';
import '../input.css';

 const MerchantLogin = ({setIsLoggedIn,setIsAdmin}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
      try {
        event.preventDefault();
        const result = await merchantLogin(username, password);
        const token =result.token
        
        if(result.error){
          setError(result)
          setIsLoggedIn(false)
        }else if(token){ 
          setError(null)
          const username = result.merchant.username
          const admin = result.merchant.Admin
          const brand = result.merchant.brand
          localStorage.setItem("token", token);
          localStorage.setItem("username",username);
          localStorage.setItem("admin",admin);
          localStorage.setItem('brand', brand)
          setIsLoggedIn(true)
          setIsAdmin(true)
          navigate('../')
        }
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div className=" h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8" >
        <div >
          <div>
            <img
              className="mx-auto h-24 w-auto rounded-lg shadow-gray-700 shadow-md select-none bg-black-coffee"
              src={require('../components/Logo/coffee2.png')}
              alt="Workflow"

            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 select-none">Admin Sign in </h2>
            <p className="mt-2 text-center text-md text-gray-900">
              Or{' '}
              <Link to={'/adminRegister'} className="font-medium text-unbleached-silk hover:text-black-coffee">
                Click here to Register as an Admin 
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  onChange={({ target }) => setUsername(target.value)}
                  value={username}
                  id="username"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black-coffee focus:border-black-coffee focus:z-10 sm:text-sm "
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  value={password}
                  id="password"
                  name="password"
                  type="password"
                  onChange={({ target }) => setPassword(target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-black-coffee focus:border-black-coffee focus:z-10 sm:text-sm shadow-gray-700 shadow-lg"
                  placeholder="Password"
                />
                           {error && error.message ? <button className=" flex w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-6 rounded-md justify-center">
  <strong className="font-bold">Holy smokes!</strong>
  <span className="block sm:inline"> {error.message}</span>
  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg className="fill-current h-6 w-6 text-red-500"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>
  </span>
</button> : null}
            </div>
            </div>
            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-unbleached-silk bg-black-coffee hover:bg-black-coffee hover:bg-opacity-80 shadow-gray-700 shadow-lg transition duration-300"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3 ">
                  <LockClosedIcon className="h-5 w-5 text-unbleached-silk" aria-hidden="true" />
                </span>
                Sign in
              </button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
    );
  };

export default MerchantLogin