import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, redirect, useNavigate } from "react-router-dom";
import { Backend_URL } from "../Constants/backend";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import { getUser } from "../features/auth/authSlice";
import Home from "../pages/Home";
import PostPage from "../pages/PostPage";

export default function ProtectedRoutes() {
    const user = useSelector(state => state.auth.userInfo)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(() => {
        // fetch(Backend_URL+"auth/login/success", {
        //     method: "GET",
        //     credentials: "include",
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //         "Access-Control-Allow-Crendentials": true,
        //     }
        // }).then(res => {
        //     if (res.status === 200) {
        //         return res.json();
        //     }
        //     throw new Error("Authentication failed");
        // }).then(
        //     resObj => dispatch(getUser(resObj.user))
        // ).catch(err => {
        //     console.log(err);
        // })
        const id = localStorage.getItem("uid")
        fetch(Backend_URL+"user/get/"+id).then(data=>data.json()).then(data=>{dispatch(getUser(data))})
    }, [dispatch])
    if (Object.entries(user).length > 0) {
        return (
            <>
                <NavigationBar />
                <Outlet />
                <Footer />
            </>
        )
    }
    else if (window.location.pathname.includes("/post")) {
        return <PostPage />
    }
    else {
        return (
            <Home />
        )
    }
}