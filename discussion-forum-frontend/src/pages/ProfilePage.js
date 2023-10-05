import { useDispatch } from 'react-redux';

import styles from '../styles/Profile.module.css';

import { InputLabel } from '@mui/material';

import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Container, ProgressBar } from 'react-bootstrap';
import { AiOutlineCalendar, AiOutlineMail } from 'react-icons/ai';
import { BsGlobe, BsPersonCircle } from 'react-icons/bs';
import { FaGuitar } from 'react-icons/fa';
import { Form, redirect, useParams } from 'react-router-dom';
import { Backend_URL } from '../Constants/backend';
import { getUser } from '../features/auth/authSlice';

let CoverPhoto;
export async function profileAction({ request, params }) {
    const data = await request.formData();
    const { ...values } = Object.fromEntries(data);
    values.photoURL = CoverPhoto;
    await fetch(Backend_URL + "user/update-profile/" + params.id, {
        method: "POST",
        body: JSON.stringify(values)
    })
    return window.location.reload();
}

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { id } = useParams()
    const [user, setUser] = useState()
    const [edit, setEdit] = useState(false);
    const [coverImage, setCoverImage] = useState("");
    const fetchData = async () => {
        console.log("fetchData Called")
        await fetch(Backend_URL + "user/get/" + id, {
            method: "GET"
        }).then(data => data.json()).then(data => {
            setUser(data);
            setCoverImage(data.photoURL)
            CoverPhoto = data.photoURL
            console.log(data)
            dispatch(getUser(data))
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        try {
            var compressedImage = await compressAndEncodeImage(file);
            // Send the compressed image to the backend
            sendToBackend(compressedImage);
        } catch (error) {
            console.error('Error compresing image:', error);
        }
    };
    const compressAndEncodeImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                var img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    const maxWidth = 400;
                    const maxHeight = 400;

                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;

                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            resolve(reader.result);
                        };
                        reader.onerror = (error) => {
                            reject(error);
                        };
                        reader.readAsDataURL(blob);
                    }, 'image/jpeg', 0.8);
                };
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    };

    const sendToBackend = (compressedImage) => {
        // Send the compressed image to the backend
        // Implement your API call or data submission logic here
        setCoverImage(compressedImage)
        CoverPhoto = compressedImage
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const values = Object.fromEntries(formData.entries());
        console.log(CoverPhoto);
        const body = { ...values, photoURL: CoverPhoto }
        await fetch(Backend_URL + 'user/update-profile/' + id, {
            method: 'POST',
            body: JSON.stringify(body)
        }).then(() => {
            fetchData();
            setEdit(false);
        })
    }


    return (
        <Container>
            {
                user &&
                <div className={styles.profileWrapper}>
                    <div className={styles.profileUser}>
                        <img src={`${user.photoURL}`} alt="" />
                        <div>
                            <p>{user.displayName}</p>
                            <button onClick={() => setEdit(!edit)}>Edit Profile</button>
                        </div>
                    </div>
                    <div className={styles.userDetails}>
                        <div>
                            {
                                user.email &&
                                <div>
                                    <AiOutlineMail className="icon" /> {user.email}{' '}
                                </div>
                            }
                            {
                                user.dob &&
                                <div>
                                    <AiOutlineCalendar className="icon" />
                                    {user.dob}
                                </div>
                            }
                            {
                                user.personality &&
                                <div>
                                    <BsPersonCircle className='icon' />
                                    {user.personality}
                                </div>
                            }
                            {
                                user.instrument &&
                                <div>
                                    <FaGuitar className='icon' />
                                    {user.instrument}
                                </div>
                            }
                            {
                                user.website &&
                                <div>
                                    <BsGlobe className='icon' />
                                    {user.website}
                                </div>
                            }
                            {/* {
                                user.ethnicity &&
                                <div>
                                    <IoIosPeople className='icon' />
                                    {user.ethnicity}
                                </div>
                            }
                            {
                                user.gender &&
                                <div>
                                    <BsGenderAmbiguous className='icon' />
                                    {user.gender}
                                </div>
                            } */}
                        </div>
                        <div>
                            <p>Profile Filled</p>
                            <ProgressBar now={60} />
                        </div>
                    </div>
                </div>
            }

            {edit && user && (
                <Form onSubmit={submitHandler} className={styles.create}>
                    <div >
                        <label htmlFor="profilePhoto" style={{ display: 'grid', placeItems: 'center', cursor: "pointer" }}>
                            <img src={coverImage} width={75} height={75} style={{ borderRadius: '50%' }} alt="" />
                            <InputLabel>Change Profile Picture</InputLabel>
                            <input type="file" color='secondary' accept='image/png, image/jpeg' style={{ display: 'none' }} name="profilePhoto" id="profilePhoto" onChange={(e) => handleImageUpload(e)} />
                        </label>
                    </div>
                    <div>
                        <TextField name='displayName' color='secondary' id="displayName" label="Name" defaultValue={user.displayName} variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <TextField type='email' color='secondary' name="email" id="email" label="Email" defaultValue={user.email} variant="outlined" style={{ width: '100%' }} disabled />
                    </div>
                    <div>
                        <TextField type="date" color='secondary' name="dob" id="dob" InputLabelProps={{ shrink: true, required: true }} label='Date of Birth' variant="outlined" style={{ width: '100%' }} defaultValue={user.dob} />
                    </div>
                    <div>
                        <TextField label="Personality" color='secondary' name="personality" id="personality" variant="outlined" style={{ width: '100%' }} defaultValue={user.personality} />
                    </div>
                    <div>
                        <TextField label="Instrument" color='secondary' name="instrument" id="instrument" variant="outlined" style={{ width: '100%' }} defaultValue={user.instrument} />
                    </div>
                    <div>
                        <TextField label="Website" color='secondary' name="website" id="website" variant="outlined" style={{ width: '100%' }} defaultValue={user.website} />
                    </div>
                    {/* <div>
                        <FormControl variant="outlined" style={{ width: '100%' }}>
                            <InputLabel>Ethnicity</InputLabel>
                            <Select
                                multiple
                                value={ethnicity}
                                onChange={(e) => {
                                    setEthnicity(e.target.value);
                                    ethnicityValue = e.target.value
                                }}
                                label="Ethnicity"
                                renderValue={(selected) => selected.join(', ')}
                                input={<OutlinedInput label="Ethnicity" />}
                                style={{ marginTop: '8px' }}
                            >
                                {ethnicityOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                            {
                                // <FormHelperText>Please select your ethnicity</FormHelperText>
                            }
                        </FormControl>
                    </div>
                    <div>
                        <FormControl variant="outlined" style={{ width: '100%' }}>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                value={gender}
                                onChange={(e) => {
                                    setGender(e.target.value);
                                    genderValue = e.target.value
                                }}
                                label="Gender"
                                input={<OutlinedInput label="Gender" />}
                                style={{ marginTop: '8px' }}
                            >
                                {genderOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                            {
                                // <FormHelperText>Please select your gender</FormHelperText>
                            }
                        </FormControl>
                    </div> */}

                    <div className={styles.submit} onSubmit={submitHandler}>
                        <button type="submit">Save Profile</button>
                    </div>
                </Form>
            )}
        </Container>
    );
};

export default ProfilePage;
