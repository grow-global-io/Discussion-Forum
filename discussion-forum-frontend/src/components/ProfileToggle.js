import React from 'react';
import { Image } from 'react-bootstrap';

import styles from '../styles/Profile.module.css';

import { BiLogOut } from 'react-icons/bi';
import { BsChevronRight } from 'react-icons/bs';
import { Backend_URL, Base_URL } from '../Constants/backend';

const ProfileToggle = ({ user, show }) => {
    const logout = () => {
        // window.open(Backend_URL+'auth/logout', '_self');
        localStorage.clear()

        //Tatz
        window.open("/home", "_self");
    };

    return (
        <>
            {show && (
                <div className={styles.ProfileToggle}>
                    <div className={styles.profileHead}>
                        <div className={styles.user}>
                            <Image
                                src={user.photoURL}
                                alt="user image"
                                referrerPolicy="no-referrer"
                                height={50}
                                className="rounded-circle"
                            />
                            <p className="">
                                {user.displayName}
                            </p>
                        </div>
                            <div className={styles.profileRoute}><a href={`/profile/${user.uid}`} className=''><p>View Profile</p><BsChevronRight width={44} /></a></div>
                    </div>
                    <button className={styles.profileLogout} onClick={logout}><BiLogOut width={44} className={styles.icon} /> Logout</button>
                </div>
            )}
        </>
    );
};

export default ProfileToggle;
