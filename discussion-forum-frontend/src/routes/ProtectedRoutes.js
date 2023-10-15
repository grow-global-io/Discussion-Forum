import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { Backend_URL } from "../Constants/backend";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import { getUser } from "../features/auth/authSlice";
import Home from "../pages/Home";
import PostPage from "../pages/PostPage";
import { triggerLoading } from "../features/loading/loadingSlice";
import Loading from '../assets/gramaphone.json'
import LottieLoader from 'react-lottie-loader'
export default function ProtectedRoutes() {
    const loading = useSelector(state => state.loading.loading)
    const user = useSelector(state => state.auth.userInfo)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const id = localStorage.getItem("uid")
        if (id) {
            dispatch(triggerLoading(true))
            fetch(Backend_URL + "user/get/" + id).then(data => data.json()).then(data => { dispatch(getUser(data)); dispatch(triggerLoading(false)) }).catch(err => { console.log(err); 
                
                // localStorage.clear(); 
                // window.location.reload() 
            })
        }
    }, [dispatch])
    if (loading) {
        return (<LottieLoader animationData={Loading} style={{ height: "300px" }} loop={true} />)

    }
    else {
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
                <>
                    <NavigationBar />
                    <Home />
                </>
            )
        }
    }
}