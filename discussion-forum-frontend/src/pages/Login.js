import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';
import { Form, useNavigate } from 'react-router-dom';
import BrandLogo from '../assets/aco-logo.png';
import toast, { Toaster } from "react-hot-toast"
import { FaDiscord, FaFacebookF } from 'react-icons/fa';

import styles from '../styles/Login.module.css';
import { Backend_URL } from '../Constants/backend';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/fbconfig';
import { useDispatch } from 'react-redux';
import { getUser } from '../features/auth/authSlice';

const Login = () => {
    const isLoggedIn = false;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [emailOTP, setEmailOTP] = useState('')
    const [otp, setOtp] = useState(false)
    const [formInput, updateFormInput] = useState({
        email: '',
        otp: ''
    })
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
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
                }).then(data => data.json()).then(data=>{dispatch(getUser(data));navigate("/")})
            })
    }
    const id = localStorage.getItem("uid")
    useEffect(() => {
        if (id)
            navigate("/")
    }, [id])

    const onSubmitOTP = () => {
        if (emailOTP.toString() === formInput.otp) {
            // toast.success('Login Successful !!')
            toast.success('OTP verified')
            setOtp(false);
            let url = Backend_URL + "auth/login/email";
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: formInput.email })
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (!data) {
                        toast.error('Sign Up first')
                        // navigate to signup page

                        navigate("/signup");
                    }
                    else {
                        toast.success('Login Successful !!')
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("user", JSON.stringify(data.user));
                        navigate("/home");
                    }

                })
                .catch((err) => {
                    console.log(err);
                });

            // Write your Login redirection code here
        } else {
            toast.error('Wrong OTP entered.')
        }
    }

    if (!isLoggedIn)

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
                                    //     <Form>
                                    //     <TextField type='email' onChange={
                                    //         (e) =>
                                    //             updateFormInput((formInput) => ({
                                    //                 ...formInput,
                                    //                 email: e.target.value,
                                    //             }))
                                    //     } name='email' id="email" label="Enter Your Email" variant="outlined" color='secondary' style={{ width: '400px' }} />
                                    //     <button type="submit" onClick={() => triggerOTP()}>Login</button>
                                    // </Form>
                                }

                                <p>Login using</p>
                                <Button variant="outlined" color='secondary' onClick={googleSignIn} startIcon={<FcGoogle />}>Google</Button>
                                <Button variant="outlined" color="primary" startIcon={<FaDiscord />}>
                                    Discord
                                </Button>
                                <Button variant="outlined" color="primary" startIcon={<FaFacebookF />}>
                                    Facebook
                                </Button>
                            </>
                        )}

                    </div>
                </div >
            </Container >
        )
    else
        return navigate("/home")
}

export default Login
