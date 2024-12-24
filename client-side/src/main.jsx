import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LandingPage from './Component/LandingPage/LandingPage.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminPannel from './AdminPannel/AdminPannel.jsx';
import Signup from './Component/Signup/SignUp.jsx';
import Login from './Component/Login/Login.jsx';
import { CartProvider } from './CartContext.jsx';
import CartCard from './Component/CartCard.jsx';
import AllProduct from './Component/AllProduct/AllProduct.jsx';

import ProductDetails from './Component/AllProduct/ProductDetails.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import Category from './Component/Category/Category.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children:[
      {
        path:'/',
        element:<LandingPage/>,
      },

      {
        path:'/admin',
        element:<AdminPannel/>
      },
      {
        path:'/signup',
        element:<Signup/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/addtocart',
        element: <CartCard/>
      },
      {
        path:"/products",
        element: <AllProduct/>
      },
      {
        path:'/product/:id',
        element: <ProductDetails/>
      },
      {
        path:"/category/:category",
        element:<Category/>
      }

    ]
    }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <CartProvider>
   <AuthProvider>
   <RouterProvider router={router} />
   </AuthProvider>
   </CartProvider>
    
  </StrictMode>,
)
