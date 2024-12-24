
import { Link, useNavigate } from "react-router-dom";

import signup from "../../../public/signup.jpg";

import {  sendEmailVerification } from "firebase/auth/cordova";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Signup = () => {

  const {createUser} = useContext(AuthContext)
const navigate = useNavigate()

  const handleSignup = e =>{
    e.preventDefault()


    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const number = form.number.value
    const address = form.address.value
    console.log(name, email, number, address, password);

  
    // create user through firebase

    createUser( email, password)
    .then(result =>{
      console.log(result.user)

sendEmailVerification(result.user)
.then(()=>{
  
})

      Swal.fire({
        text: "You have been create an account successfully. Please check your email to verify account.",
        icon: "success"
      });
navigate("/login")
      
    })
    .catch(error=>{
      console.error(error.message)
      if(error){
        Swal.fire({
          icon: "error",
          text: "Something is wrong. Please try later.",
      
        })
      }
      
      return
    })







  }

  


  return (
    <div className="min-h-screen bg-white">
    
    <p className="text-blue-900 font-bold text-xl lg:text-3xl text-center mb-4 pt-7">CREATE AN ACCOUNT </p>
    
    
    
    <div className="flex flex-1 justify-around">

    
      {/* Left-side form */}
      
      <div className="">
     
      <form onSubmit={handleSignup} className="lg:ml-10 w-4-5/12 lg:w-96 mx-4">
            <div className="space-y-1 text-sm">
              <label className="block text-blue-900 text-xs lg:text-xl font-serif">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="username"
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-md border border-blue-900 dark:bg-white text-black "
              />
            </div>
            <div className="space-y-1 text-sm">
              <label className="block text-blue-900 text-xs pt-1 lg:text-xl font-serif">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email address"
                className="w-full px-4 py-3 rounded-md border border-blue-900 dark:bg-white text-black "
              />
            </div>
            <div className="space-y-1 text-sm">
              <label className="block text-blue-900 text-xs pt-1 lg:text-xl font-serif">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-md border border-blue-900 dark:bg-white text-black "
              />
            </div>
            <div className="space-y-1 text-sm">
              <label className="block text-blue-900 text-xs pt-1 lg:text-xl font-serif">
                Number
              </label>
              <input
                type="text"
                name="number"
                id="number"
                placeholder="number"
                className="w-full px-4 py-3 rounded-md border border-blue-900 dark:bg-white text-black "
              />
            </div>
            <div className="space-y-1 text-sm">
              <label className="block text-blue-900 text-xs pt-1 lg:text-xl font-serif">
                Address
              </label>
              <input
                type="address"
                name="address"
                id="address"
                placeholder="address"
                className="w-full px-4 py-3 rounded-md border border-blue-900 dark:bg-white text-black "
              />
            </div>
         

            <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            className="block w-full p-3 text-center bg-blue-900 text-white rounded-s-md mt-4 font-bold">
              Sign Up
            </motion.button>
          </form>
      </div>

      

      {/* Right-side image  */}
      <div className="">
        <img src={signup} alt="Signup Illustration" className="mt-4 rounded-lg hidden md:block lg:block" />
        <p className="text-gray-800 font-semibold text-center">Already have account?</p>
        <Link to="/login">
              <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              
              
              className="ml-28 lg:ml-16
               
                text-blue-900 font-serif text-lg md:text-xl ">
                SIGN IN
              </motion.button>
            </Link>
      </div>
      <div>
        
      </div>
    </div>
    </div>
  );
};

export default Signup;
