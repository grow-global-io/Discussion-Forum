import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/authSlice";


export default function Root(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.userInfo);
    useEffect(() => {
        const initUser = localStorage.getItem("username");
        const initPass = localStorage.getItem("password");
        if (initUser === process.env.REACT_APP_USERNAME &&
            initPass === process.env.REACT_APP_PASSWORD) {
            const data = {
                user: initUser,
                initPass,
              };
              
              dispatch(setUser(data));
            return navigate("/home");
    
        }
      }, []);
    useEffect(()=>{
        if(Object.entries(isLoggedIn).length > 0 ){
            navigate("/home")
        }
        else{
            navigate("/login")
        }
    })
    return(
        <>
            Loading ...
        </>
    )
}