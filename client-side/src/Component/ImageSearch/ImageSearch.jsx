import { useState } from "react";

const ImageSearch = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      performImageSearch(file);
    }
  };

  const performImageSearch = async (file) => {
    setIsSearching(true);
    if (products.length === 0) {
      await fetchProducts();
    }
    setTimeout(() => {
      const similarProducts = products.filter((product) =>
        product.title.toLowerCase().includes("shirt") 
      );

      if (similarProducts.length > 0) {
        setSearchResult(similarProducts);
      } else {
        setSearchResult("Stock out");
      }
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className="image-search-container">
      <div className="upload-section">
        <label className="btn btn-primary">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            hidden
          />
        </label>
      </div>
      {selectedImage && (
        <div className="preview-section mt-4">
          <img
            src={selectedImage}
            alt="Selected"
            className="w-32 h-32 object-cover rounded-md"
          />
        </div>
      )}
      {isSearching ? (
        <p className="mt-4 text-blue-600">Searching for similar items...</p>
      ) : searchResult === "Stock out" ? (
        <p className="mt-4 text-red-600">Stock out</p>
      ) : (
        searchResult && (
          <div className="results mt-4">
            <h3 className="text-lg font-semibold mb-2">Similar Products:</h3>
            <ul>
              {searchResult.map((product) => (
                <li key={product.id} className="mb-2">
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <p>{product.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
};
export default ImageSearch;