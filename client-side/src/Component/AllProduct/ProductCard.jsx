import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext";
import { motion } from "framer-motion";

import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const ProductCard = ({ products }) => {
  const { id, title, image, price } = products; 
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const handlePost = () => {
    const postData = {
      ...products,
      status: "pending",
    };

    fetch("http://localhost:5000/order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Are you sure to confirm order?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Confirm",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              "Your order has been confirmed successfully.",
              "",
              "success"
            );
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      });
  };

  const handleAddToCart = () => {
    addToCart(products);
    Swal.fire("Added to cart!", "", "success");
  };

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      onClick={handleCardClick}
      className="cursor-pointer"
    >
      <div className="card bg-white w-[300px] md:h-[400px] lg:w-[350px] lg:h-[500px] shadow-xl my-4 shadow-slate-400 ml-3 lg:ml-10">
        <figure className="px-10 pt-10">
          <img
            src={image}
            alt={title}
            className="rounded-xl h-[150px] w-[150px] lg:h-full lg:w-[300px]"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-gray-800 text-xl ">{title}</h2>
          <p className="text-gray-800">${price}</p>
          <div className="card-actions">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (user) {
                  handlePost();
                } else {
                  navigate("/login");
                }
              }}
              className="px-4 py-2 text-blue-900 bg-white hover:bg-blue-900 hover:text-white font-semibold rounded-se-box"
            >
              Buy Now
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              className="px-4 py-2 hover:text-blue-900 hover:bg-white bg-blue-900 text-white font-semibold rounded-es-xl border border-blue-900"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
