import {  useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function Root(){
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.userInfo);
    
    useEffect(()=>{
        if(isLoggedIn){
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