import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";

const AllProduct = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [showAll, setShowAll] = useState(false); 
    const location = useLocation();
    

    // Fetch products and categories
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);

                
                const uniqueCategories = ["all", ...new Set(data.map((product) => product.category))];
                setCategories(uniqueCategories);

              
                const searchCategory = new URLSearchParams(location.search).get("category");
                if (searchCategory && uniqueCategories.includes(searchCategory)) {
                    setSelectedCategory(searchCategory);
                    setFilteredProducts(data.filter((product) => product.category === searchCategory));
                } else {
                    setFilteredProducts(data);
                }
            });
    }, [location]);


    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setShowAll(false); 
        if (category === "all") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter((product) => product.category === category));
        }
    };

    
    const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, 6);

    return (
        <div>
        <p className="mt-16 text-blue-900 text-2xl lg:text-4xl lg:ml-4 font-serif pb-5 lg:text-start text-center">For you</p>
          
            {!location.search && (
                <div className="">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`btn btn-secondary ml-5 my-3 ${
                                selectedCategory === category
                                    ? "bg-purple-500 text-white"
                                    : "bg-white text-black border-gray-300"
                            }`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
            )}

           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-0 md:ml-7 lg:ml-1">
                {displayedProducts.map((product) => (
                    <ProductCard key={product.id} products={product} />
                ))}
            </div>

            {/* "See All" Button */}
            {!showAll && filteredProducts.length > 6 && (
                <div className="text-center my-4">
                    <button
                        onClick={() => setShowAll(true)}
                        className="btn btn-primary bg-blue-900 text-white px-4 py-2 rounded-se-md"
                    >
                        See All Collections
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllProduct;
