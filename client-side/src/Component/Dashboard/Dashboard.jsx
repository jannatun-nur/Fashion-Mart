import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useCart } from "../../CartContext";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IoCameraOutline, IoSettingsSharp } from "react-icons/io5";
import { HiOutlineShoppingCart } from "react-icons/hi";
import request from '../../../public/res.png'
import { TbAirConditioning } from "react-icons/tb";




const Dashboard = () => {
  const { cart } = useCart();
 
 
  const [categories, setCategories] = useState([]);

  const [searchResult, setSearchResult] = useState(null);



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



  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
       
        const response = await fetch("https://fakestoreapi.com/products", {
          method: "POST",
          body: JSON.stringify({ image: file.name }), 
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (data.matchedItems && data.matchedItems.length > 0) {
          setSearchResult(data.matchedItems);
          Swal.fire(
            "Product is available",
            "Matching items displayed below.",
            "success"
          );
        } else {
          Swal.fire("Stock Out!");
          setSearchResult([]);
        }
      } catch (error) {
        console.error("Error during image search:", error);
        Swal.fire("Error!", "Something went wrong. Please try again.", "error");
      }
    }
  };

  return (
    <div>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
         
          <label
            htmlFor="my-drawer"
            className="text-blue-900 font-bold lg:text-2xl"
          >
            <GiHamburgerMenu />
          </label>
        </div>
        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu  text-base-content min-h-full w-8/12 lg:w-80 p-4 bg-white shadow-2xl shadow-blue-900">
           

            <p className="text-white bg-blue-900 lg:text-xl text-center  ">
              Admin Pannel
            </p>

            <li className="text-blue-900 text-xs lg:text-xl my-1 lg:my-3 ">
              <Link to="/admin"> <img className="w-8 h-8" src={request}/> <p className="hidden lg:block">Requests</p></Link>
            </li>
          
            <li className="text-blue-900 text-xs lg:text-xl my-1 lg:my-2 ">
              <Link to=""> <p className="text-3xl"><IoSettingsSharp /></p> <p className="hidden lg:block">Setting</p></Link>
            </li>
            <li className="text-blue-900 text-xs lg:text-xl my-1 lg:my-2 ">
              <Link to=""> <p className="text-3xl"><TbAirConditioning /> </p><p className="hidden lg:block">Conditons</p></Link>
            </li>
         

            {/* customer section */}

            <p className="text-white bg-blue-900 lg:text-xl text-center mt-10 mb-4">
              Customers Services
            </p>



          
<li>

</li>
            <li>
              <label htmlFor="imageUpload" className="cursor-pointer">
                <IoCameraOutline className="text-blue-900  text-xl lg:text-3xl" />
                <span className="text-blue-900 lg:text-xl  hidden lg:block">
                 Find items
                </span>
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </li>

            <li>
              <Link to="/addtocart" className="text-blue-600">
                <span className="text-blue-900 mr-4 text-xl lg:text-3xl flex gap-2">
                  <HiOutlineShoppingCart />
                  <span className="text-blue-900 lg:text-xl  hidden lg:block">
                    Your cart
                  </span>
                </span>
                {cart.length > 0 && <span className="">{cart.length}</span>}
              </Link>
            </li>





          </ul>
        </div>
      </div>

      {/* Display search results */}
      {searchResult && (
        <div className="search-results">
          {searchResult.length > 0 ? (
            searchResult.map((item, index) => (
              <div key={index} className="product-card">
                <img src={item.image} alt={item.title} />
                <p>{item.title}</p>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
