import { useCart } from "../CartContext";
import image from '../../public/download.png'

const CartCard = () => {
  const { cart } = useCart();

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 py-4 text-blue-900 text-center">Your Cart</h1>
      {cart.length === 0 ? (
        <div>
        <p className="text-blue-900 font-semibold font-serif text-center animate-bounce mt-10 text-4xl">OPPPSSSS !!!!</p>
        <p className="text-blue-900 font-semibold font-serif text-center my-4">Your cart is empty....</p>
        <img src={image}  className="mx-auto mt-4" />
        
        </div>
        
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 overflow-x-auto">
          {cart.map((item, index) => (
            <table 
              key={index} 
              className="w-full text-xs text-left whitespace-nowrap overflow-x-auto"
            >
              <thead  >
                <tr className="bg-blue-900 text-white">
                  <th className="p-3">Image</th>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Price</th>
                </tr>
              </thead>
              <tbody className="border-b dark:bg-gray-50 dark:border-gray-300 ">
                <tr>
                  <td className="px-3 py-2 shadow-lg shadow-blue-900">
                    <img className="md:w-10 md:h-20 lg:w-28 lg:h-24" src={item.image} alt={item.title} />
                  </td>
                  <td className="px-3 py-2 shadow-lg shadow-blue-900 font-bold text-gray-800">
                    {item.title}
                  </td>
                  <td className="px-3 py-2 shadow-lg shadow-blue-900 font-bold text-gray-800">
                    $ {item.price}
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartCard;
