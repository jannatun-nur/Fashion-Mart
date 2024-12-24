import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const Category = () => {
 
  const { category } = useParams(); 
  const [products, setProducts] = useState([]); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate()

 


  useEffect(() => {
    if (!category) return;

    fetch(`http://localhost:5000/search/category/${category}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No products found for this category.");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setError(null); 
      })
      .catch((err) => {
        setProducts([]);
        setError(err.message);
      });
  }, [category]);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`); 
  };

  return (
    <div   
 
    
    >
     
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : products.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {products.map((product) => (
            <li key={product.id}>
              <motion.div 
               initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}

              onClick={()=>handleCardClick(product.id)}
              className="card bg-white w-[300px] lg:w-[350px] lg:h-[500px] shadow-xl my-4 shadow-slate-400 ml-3  lg:ml-10">
                <figure className="px-10 pt-10">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="rounded-xl h-[150px] w-[150px] lg:h-full lg:w-[300px]"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-gray-800 text-xs lg:text-xl">{product.title}</h2>
                  <p className="text-gray-800">${product.price}</p>
                </div>
              </motion.div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="min-h-screen bg-white">
       
        <span className="loading loading-bars  text-blue-900 text-center w-44 ml-20 lg:ml-72 "></span>
      </div>
      )}
    </div>
  );
};

export default Category;
