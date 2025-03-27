import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './pages/Auth.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import EditProduct from './pages/EditProduct.jsx';
import Items from './pages/Items.jsx';
import AddProduct from './pages/AddProduct.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    children: [
      {
        path: "",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "dashboard",
        element: <Items />
      },
      {
        path: "item/create",
        element: <AddProduct />
      },
      {
        path: "item/edit/:id",
        element: <EditProduct />
      }
    ]
  }
], { basename: "/L2-Task7" });
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} fallbackElement={<div>Page Not Found</div>} />

  </StrictMode>
);

