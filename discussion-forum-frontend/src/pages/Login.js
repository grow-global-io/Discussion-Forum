import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Form, useNavigate } from 'react-router-dom';
import BrandLogo from '../assets/aco-logo.svg';
import toast, { Toaster } from "react-hot-toast"
import { randomString } from '../assets/utils'
import emailjs from '@emailjs/browser'
import { v4 as uuidv4 } from 'uuid';
import { triggerLoading } from '../features/loading/loadingSlice';
import styles from '../styles/Login.module.css';
import { Backend_URL } from '../Constants/backend';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/fbconfig';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../features/auth/authSlice';
import LottieLoader from 'react-lottie-loader';
import Loading from '../assets/gramaphone.json'
const Login = () => {
    const isLoggedIn = false;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading.loading)
    const [emailOTP, setEmailOTP] = useState('')
    const [otp, setOtp] = useState(false)
    const [formInput, updateFormInput] = useState({
        displayName: "",
        email: '',
        photoURL: "https://as2.ftcdn.net/v2/jpg/02/17/34/67/1000_F_217346782_7XpCTt8bLNJqvVAaDZJwvZjm0epQmj6j.jpg",
        otp: ''
    })
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        provider.addScope("profile");
        provider.setCustomParameters({
            login_hint: "user@example.com",
        });
        await signInWithPopup(auth, provider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = await GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // The signed-in user info.
                let user = result.user;
                localStorage.setItem("uid", user.providerData[0].uid);
                localStorage.setItem("displayName", user.providerData[0].displayName);
                localStorage.setItem("email", user.providerData[0].email);
                const data = user.providerData[0]
                fetch(Backend_URL + "user/create", {
                    method: "POST",
                    body: JSON.stringify(data)
                }).then(data => data.json()).then(data => { dispatch(getUser(data)); navigate("/") })
            })
    }
    const id = localStorage.getItem("uid")
    useEffect(() => {
        if (id) {
            dispatch(triggerLoading(true))

            fetch(Backend_URL + `user/get/${id}`, {
                method: "GET",
            })
                .then(data => data.json()).then(data => { dispatch(getUser(data)); navigate("/"); dispatch(triggerLoading(false)) }).catch(err => {
                    console.error(err)
                    dispatch(triggerLoading(false))
                })
        }
    }, [])

    const triggerOTP = () => {
        const OTP = randomString(10)
        setEmailOTP(OTP)
        var templateParams = {
            user: "American Composers",
            email: formInput.email,
            message: OTP,
        }
        emailjs
            .send(
                'service_5gdzlon',
                'template_rf1wj7v',
                templateParams,
                'V02Ae6OjPmCFPW1ft'
            )
            .then(
                function (response) {
                    toast.success('Check email for OTP')
                },
                function (error) {
                }
            )
        setOtp(true)
    }

    const onSubmitOTP = async () => {
        if (emailOTP.toString() === formInput.otp) {
            // toast.success('Login Successful !!')
            toast.success('OTP verified')
            setOtp(false);
            // Write your Login redirection code here


            // if (Object.keys(res).length > 0) {
            // localStorage.setItem("uid", res.uid);
            // localStorage.setItem("displayName", res.displayName);
            // localStorage.setItem("email", res.email);
            //     dispatch(getUser(res)); navigate("/")
            // }
            // else{

            // }
            const data = {
                displayName: formInput.displayName,
                photoURL: formInput.photoURL,
                email: formInput.email,
                uid: uuidv4()
            }

            fetch(Backend_URL + "user/create", {
                method: "POST",
                body: JSON.stringify(data)
            }).then(data => data.json()).then(data => {
                dispatch(getUser(data)); navigate("/");

                localStorage.setItem("uid", data.uid);
                localStorage.setItem("displayName", data.displayName);
                localStorage.setItem("email", data.email);
            })



        } else {
            toast.error('Wrong OTP entered.')
        }
    }

    if (!isLoggedIn) {
        if (loading) {
            return (<LottieLoader animationData={Loading} style={{ height: "300px" }} loop={true} />)

        }
        else {
            return (

                <Container>
                    {/* <Row className='justify-content-center align-items-center mt-5'>
                    <Col xs={8} >
                        <Card className='p-5'>
                            <h3 className='text-center'>Please Login Using</h3>
                            <Button className="w-30 mx-auto mt-3" onClick={googleSignIn}>Login with Google</Button>
                        </Card>
                    </Col>
                </Row> */}
                    <Toaster position='top-center' reverseOrder="false" />
                    <div className={styles.loginWrapper}>
                        <div className={styles.login}>
                            <img src={BrandLogo} alt="" />
                            {otp === true ? (
                                <Form>

                                    <TextField onChange={
                                        (e) =>
                                            updateFormInput((formInput) => ({
                                                ...formInput,
                                                otp: e.target.value,
                                            }))
                                    } name='OTP' id="otp" label="Enter Your OTP" variant="outlined" color='secondary' style={{ width: '400px' }} />
                                    <button type="submit" onClick={() => onSubmitOTP()}>Verify</button>
                                </Form>
                            ) : (
                                <>
                                    {
                                        <Form>
                                            <TextField
                                                onChange={
                                                    (e) => updateFormInput((formInput) => ({
                                                        ...formInput,
                                                        displayName: e.target.value
                                                    }))
                                                }
                                                label="Enter Your Name" variant="outlined" color='secondary' style={{ width: '400px' }}
                                            />
                                            <TextField type='email' onChange={
                                                (e) =>
                                                    updateFormInput((formInput) => ({
                                                        ...formInput,
                                                        email: e.target.value,
                                                    }))
                                            } name='email' id="email" label="Enter Your Email" variant="outlined" color='secondary' style={{ width: '400px' }} />
                                            <button type="submit" onClick={() => triggerOTP()}>Login</button>
                                            <button type="submit" onClick={googleSignIn}>Login with Google</button>
                                        </Form>

                                    }

                                    {
                                        //     <p>Login using</p>
                                        // <Button variant="outlined" color='secondary' onClick={googleSignIn} startIcon={<FcGoogle />}>Google</Button>
                                    }
                                    {/* <Button variant="outlined" color="primary" startIcon={<FaDiscord />}>
                                            Discord
                                        </Button>
                                        <Button variant="outlined" color="primary" startIcon={<FaFacebookF />}>
                                            Facebook
                                        </Button> */}
                                </>
                            )}

                        </div>
                    </div >
                </Container >
            )
        }
    }
    else
        return navigate("/home")
}

export default Login
