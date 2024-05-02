import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import Root from './components/Root';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AuthProvider from './providers/AuthProvider';
import Dashboard from './components/Dashboard';
import PrivateRoute from './routes/PrivateRoutes';
import Logout from './components/Logout';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/logout',
        element: <Logout></Logout>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
