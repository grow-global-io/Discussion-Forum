import {
    Button,
    Card,
    CardContent,
    Container,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../features/authSlice';

const Login = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleSubmit = async () => {

        if (username && password) {
            setError('');
            if (
                username === process.env.REACT_APP_USERNAME &&
                password === process.env.REACT_APP_PASSWORD
            ) {
                const data = {
                    user: username,
                    password
                }
                await dispatch(setUser(data))
                return navigate('/home');
            } else {
                setError('Please enter correct username and password');
            }
        }
        else {

            setError('please enter username and password');
        }
    };

    return (
        <Container>
            <Card sx={{ maxWidth: 345, margin: '0 auto' }}>
                <div style={{ position: 'relative', padding: '5px', display: "flex", justifyContent: "center" }}>
                    <img
                        src="aco-logo.svg"
                        alt="logo"
                        style={{ width: '100%', maxWidth: "150px" }}
                    />
                </div>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Welcome back, Admin!
                    </Typography>
                </CardContent>
                <div style={{ paddingInline: '25px' }}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        color="secondary"
                        style={{ width: '100%', marginBottom: '5px' }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        color="secondary"
                        style={{ width: '100%', marginBottom: '5px' }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <p style={{ color: 'red', marginBlock: '5px' }}>
                            {error}
                        </p>
                    )}
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="secondary"
                        style={{ marginBottom: '25px', width: '100%' }}
                    >
                        Submit
                    </Button>
                </div>
            </Card>
        </Container>
    );
};

export default Login;
