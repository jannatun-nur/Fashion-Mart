import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ProductDetails = () => {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);

    useEffect(() => {
        
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, [id]);

    if (!product) {
        return <div className="min-h-screen bg-white">
       
        <span className="loading loading-bars  text-blue-900 text-center w-44 ml-20 lg:ml-72 "></span>
      </div>;
    }

    return (
        <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        
        
        
        
        className="min-h-screen">
        <div className="card lg:card-side  pt-20">
  <figure>
    <img
    src={product.image} className='w-[200px] h-[200px] lg:w-full lg:h-full'
      alt="Album" />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-gray-800 lg:text-start text-center md:text-center"> {product.title} </h2>
    <h2 className=" text-gray-800 lg:text-start md:text-start text-center">$ {product.price}</h2>
    <p className=" text-gray-800 lg:text-start md:text-start text-center"> {product.description} </p>
    
    
  </div>
</div>
</motion.div>
    );
};

export default ProductDetails;
