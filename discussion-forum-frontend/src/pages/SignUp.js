import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Form, useNavigate } from 'react-router-dom';
import BrandLogo from '../assets/aco-logo.png';
import emailjs from '@emailjs/browser'
import { randomString } from '../assets/utils';
import toast, { Toaster } from "react-hot-toast";

import styles from '../styles/Login.module.css';
import { Backend_URL } from '../Constants/backend';

const Signup = () => {
  const isLoggedIn = false;
  const navigate = useNavigate();
  const [emailOTP, setEmailOTP] = useState('');
  const [otp, setOtp] = useState(false);
  const [formInput, updateFormInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    otp: ''
  });

  const sendOTP = () => {
    const OTP = randomString(6);
    setEmailOTP(OTP);
    setOtp(true);

    const templateParams = {
      user: "Your Name",
      email: formInput.email,
      message: OTP
    };

    emailjs.send('service_b3tfuxp', 'template_oul3w55', templateParams, 'wYWNPlxaAjQrG0S0w')
      .then(function (response) {
        toast.success('OTP sent successfully');
      })
      .catch(function (error) {
        toast.error('Failed to send OTP');
      });
  };

  const onSubmitOTP = () => {
    if (emailOTP.toString() === formInput.otp) {
      toast.success('OTP verified');
      setOtp(false);

      // Perform signup process
      if (formInput.firstName.trim() === '' || formInput.lastName.trim() === '' || formInput.email.trim() === '') {
        toast.error('Please fill in all fields');
      } else {
        // Handle the signup process
        const signupData = {
          firstName: formInput.firstName,
          lastName: formInput.lastName,
          email: formInput.email
        };

        // Call the backend API for signup
        fetch(Backend_URL+'user/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(signupData)
        })
          .then((response) => response.json())
          .then((data) => {
            toast.success('Signup successful');
            navigate('/login');
            
          })
          .catch((error) => {
            toast.error('Signup failed');
          });
      }
    } else {
      toast.error('Wrong OTP entered');
    }
  };

  if (!isLoggedIn) {
    return (
      <Container>
        <Toaster position='top-center' reverseOrder={false} />
        <div className={styles.loginWrapper}>
          <div className={styles.login}>
            <img src={BrandLogo} alt="" />
            <Form>
              <TextField
                type='text'
                onChange={(e) =>
                  updateFormInput((formInput) => ({
                    ...formInput,
                    firstName: e.target.value,
                  }))
                }
                name='firstName'
                id="firstName"
                label="First Name"
                variant="outlined"
                color='secondary'
                style={{ width: '400px' }}
              />
              <TextField
                type='text'
                onChange={(e) =>
                  updateFormInput((formInput) => ({
                    ...formInput,
                    lastName: e.target.value,
                  }))
                }
                name='lastName'
                id="lastName"
                label="Last Name"
                variant="outlined"
                color='secondary'
                style={{ width: '400px' }}
              />
              <TextField
                type='email'
                onChange={(e) =>
                  updateFormInput((formInput) => ({
                    ...formInput,
                    email: e.target.value,
                  }))
                }
                name='email'
                id="email"
                label="Email"
                variant="outlined"
                color='secondary'
                style={{ width: '400px' }}
              />
              {otp === true ? (
                <>
                  <TextField
                    type='text'
                    onChange={(e) =>
                      updateFormInput((formInput) => ({
                        ...formInput,
                        otp: e.target.value,
                      }))
                    }
                    name='OTP'
                    id="otp"
                    label="Enter Your OTP"
                    variant="outlined"
                    color='secondary'
                    style={{ width: '400px' }}
                  />
                  <Button type="submit" onClick={() => onSubmitOTP()}>Sign Up</Button>
                </>
              ) : (
                <Button type="submit" onClick={() => sendOTP()}>Send OTP</Button>
              )}
            </Form>
          </div>
        </div>
      </Container>
    );
  } else {
    return navigate('/home');
  }
};

export default Signup;
