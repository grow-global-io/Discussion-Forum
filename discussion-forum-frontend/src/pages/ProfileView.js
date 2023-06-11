import { AiOutlineCalendar, AiOutlineMail } from 'react-icons/ai';
import { BsGlobe, BsPersonCircle } from 'react-icons/bs';
import { FaGuitar } from 'react-icons/fa';
import { useLoaderData } from "react-router-dom";
import { Backend_URL } from '../Constants/backend';
import styles from '../styles/Profile.module.css';

export async function userProfileLoader({ params }) {
    const res = await fetch(Backend_URL + 'user/get/' + params.id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data;
}

const ProfileView = () => {
    const user = useLoaderData();

    return (
        <div className={styles.profileWrapper}>
                    <div className={styles.profileUser}>
                        <img src={`${user.photoURL}`} alt="" />
                        <div>
                            <p>{user.displayName}</p>
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
                        </div>
                    </div>
                </div>
    );
}

export default ProfileView;