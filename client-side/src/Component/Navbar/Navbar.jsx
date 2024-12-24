

import { motion } from "framer-motion";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import Dashboard from "../Dashboard/Dashboard";

import { FaCameraRetro } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [categories, setCategories] = useState([]);
  const [isDropdownVisibles, setIsDropdownVisibles] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();






  
 const {user, logout} = useContext(AuthContext)

 const handleLogout = ()=>{
  logout()
  .then(()=>{Swal.fire({
              text: "Logout Successfully",
              icon: "success",
            });})
  .catch(error=>console.log(error))
 }


  // search by category 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);


  const handleSearch = (category) => {
    if (categories.includes(category.toLowerCase())) {
      navigate(`/category/${category}`);
    } else {
      navigate("/all-products");
    }
    setIsDropdownVisibles(false); 
  };

  return (
    <div>
      <div className="navbar fixed z-10 bg-opacity-25 bg-base-10">
        <div className="navbar-start">
          <div className="dropdown hidden lg:block">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-blue-950 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <div className="">
                  <input
                    type="text"
                    placeholder="Search your need"
                    className="input input-bordered bg-white border-blue-900 border-2 text-gray-800
                    w-44"
                    onFocus={() => setIsDropdownVisible(true)} // Show dropdown on focus.
                  />

                  {isDropdownVisible && (
                    <div className="absolute bg-white border rounded-md shadow-lg mt-2 w-44 z-10">
                      {categories.map((category) => (
                        <p
                          key={category}
                          className="cursor-pointer p-2 hover:bg-blue-100"
                          onClick={() => handleCategorySelect(category)}
                        >
                          {category}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </li>
              <li>
                <button className="text-white text-3xl">
                  <MdOutlineShoppingCart />
                </button>
              </li>
              <li>
                <button className="text-white text-3xl">
                  <FaCameraRetro />
                </button>
              </li>
              <li>
                <p className="text-white text-3xl">
                  <FaHeartCirclePlus />
                </p>
              </li>
            </ul>
          </div>
          <a className="lg:text-xl md:text-xl text-xs  text-blue-900 font-bold">
            <Dashboard />
          </a>
        </div>

        <div className="navbar-end">
          <div className="search-container my-4 mr-5 text-center">
            <input
              type="text"
              placeholder="Search by category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={() => setIsDropdownVisibles(true)} 
              className="lg:px-4 lg:py-2 w-32 mr-10 text-xs py-2
          lg:w-full bg-white border border-blue-900 rounded-lg"
            />
            {isDropdownVisibles && (
              <div className="dropdown-menu absolute bg-blue-900 text-white border rounded-lg shadow-lg mt-2 max-h-40 overflow-y-auto">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <div
                      key={category}
                      onClick={() => handleSearch(category)}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-200 hover:text-blue-900"
                    >
                      {category}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2"><span className="loading loading-dots loading-md"></span></div>
                )}
              </div>
            )}
          </div>

            {
              user ? <>
          
                <button
                className="px-4 py-2 w-20 bg-white text-blue-900
    font-bold rounded-xl text-xs hover:bg-blue-300"
                 onClick={handleLogout}>
                  Logout
                </button>
              </> : 
              
              <>
              <Link to="/login">
            <motion.button
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.95 }}
              className="px-4 py-2 w-20 bg-white text-blue-900
    font-bold rounded-xl text-xs hover:bg-blue-300"
            >
              Sign In
            </motion.button>
          </Link>
              </>
            }

          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
