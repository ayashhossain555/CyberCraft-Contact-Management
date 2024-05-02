import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {user, loading}= useContext(AuthContext)
    const location= useLocation()
    if(loading){
        return <div className="flex gap-4 justify-center content-center items-center">
                    <span className="min-h-screen loading loading-infinity loading-lg text-5xl text-[#3366CC] text-center flex justify-center content-center items-center justify-contents-center"></span>
                </div>
    }    
    if(user){
        return children
    }

    return <Navigate state={location.pathname} to='/login'></Navigate>;
};

export default PrivateRoute;