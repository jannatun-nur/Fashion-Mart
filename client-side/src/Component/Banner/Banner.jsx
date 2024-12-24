
import { Link } from 'react-router-dom';
import './banner.css'
import Navbar from '../Navbar/Navbar';


const Banner = () => {
    return (
        <div>
       <Navbar/>
           <div className="landing-page">
        <div className="flex">
          <div className="image-container left">
           
          </div>

          <div className="image-container right">
            <p className="headline text-xl md:text-3xl lg:text-6xl font-serif text-white font-bold py-8">
            BIG DEAL , DISCOUNT 42 %
            </p>
            <p className="subheadline text-lg md:text-2xl lg:text-2xl font-serif text-white  py-1 lg:py-8">
            To keep in your pocket , 
            right now do
            </p>
            <Link to="/signup">
            
              <button className="discover-btn
               bg-gradient-to-r from-indigo-800 via-blue-600 to-blue-400 px-5 py-2 rounded-2xl
                text-white font-serif text-lg md:text-xl ">
                SIGN UP 
              </button>
            </Link>
          </div>
        </div>
      </div>  
        </div>
    );
};

export default Banner;