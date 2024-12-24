import "./Login.css";

import signin from "../../../public/login(1).png";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Login = () => {

  const {signInUser} = useContext(AuthContext)

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
  
    console.log(email, password);
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        text: "Please enter correct/valid email.",
        icon: "warning",
      });
      return; 
    }
  
    // Connect with Firebase
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
  
        if (result.user.emailVerified) {
          Swal.fire({
            text: "Login successfully",
            icon: "success",
          });
            navigate('/')

        } else {
          Swal.fire({
            text: "Please verify your email.",
            icon: "warning",
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
  
        // Handle Firebase-specific errors
        if (error) {
          Swal.fire({
            text: "Please enter correct email/password.",
            icon: "error",
          });
         
        } 
      });
  };
  
  return (
    <div>
      <p className="text-pink-900 font-bold text-xl lg:text-3xl text-center mb-4 pt-7">
        {" "}
        SIGN IN TO ACCESS YOUR ACCOUNT
      </p>
      <div className="signin-container">
        {/* Left-side form */}
        <div className="form-containers">
          <div className="form-content">
            <form 
            onSubmit={handleLogin}
            className="form">
              <input name="email" type="text" placeholder="Email" className="form-input" />
              <input name="password" type="password" placeholder="Password" className="form-input" />
              <button type="submit" className="submit-buttons">
                SUBMIT
              </button>
            </form>
          </div>
        </div>

        {/* Right-side image and icons */}
        <div className="image-container">
          <img
            src={signin}
            alt="Signup Illustration"
            className="illustration"
          />
          <p className="text-gray-800 font-semibold">
            New here? Please create an account...
          </p>
          <Link to="/signup">
            <motion.button

whileHover={{ scale: 1.1 }}
whileTap={{ scale: 0.95 }}
              className="discover-btn
                         
                          text-pink-800 font-serif text-lg md:text-xl "
            >
              SIGN UP
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
