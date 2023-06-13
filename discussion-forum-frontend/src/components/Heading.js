import { Chip } from '@mui/material';
import styles from '../styles/Home.module.css';

import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from 'react-icons/ai';
import { IoMdLink } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Backend_URL } from '../Constants/backend';
import PostFooter from './PostFooter';
import UserProfile from './UserProfile';


const Heading = ({ post, showMore }) => {
    
    
    return (
        <div className={styles.heading}>
<i>
                The National Co-Commissioning Hub is an online forum for orchestras, composers, and commissioners to discover, initiate, and/or join consortium commissions throughout the US. The Hub is administered by the <a href="https://americancomposers.org/">American Composers Orchestra</a>, was initiated with <a href="https://roco.org/">ROCO</a>, <a href="https://composersforum.org/">American Composers Forum</a>, and <a herf="https://newmusicusa.org/">New Music USA</a>, and is a resource within ACF's <a href="https://composersforum.org/anatomy-of-a-commission/#:~:text=Designed%20for%20both%20music%20creators,creators%20and%20encourage%20equitable%20experiences.">Anatomy of a Commission </a>initiative.

            Posts are available for public view, and can be created by any registered user. To learn more about joining a project posted on the Hub, please reply to the original post to indicate your interest. 
            </i></div>
    );
};

export default Heading;
