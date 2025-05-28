import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";

export const OAuth2Callback = () =>  { 

   const {setIsAuthenticated, setAccessToken} = useAuth()!;
   const location = useLocation();
   const navigate = useNavigate();

useEffect( () => { 
  const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      
      setAccessToken(token);
      setIsAuthenticated(true); 
      console.log(token);
      
      navigate("/", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [location.search, navigate, setAccessToken, setIsAuthenticated]);
   
    return (
        <div className="text-center text-lg"> Loading... </div>
    )
}