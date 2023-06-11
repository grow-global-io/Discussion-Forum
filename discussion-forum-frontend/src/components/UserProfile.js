import { Link } from 'react-router-dom';
import styles from '../styles/Post.module.css';

const UserProfile = ({ post }) => {
    return (
        <>
            <img src={post.userProfilePhoto} alt="user" />
                <div className={styles.postUserName}>
                    <Link to={`/user/${post.userId}/${post.userDisplayName}`}>
                        <strong>{post.userDisplayName}</strong>
                    </Link>
                    <a href="/">{post.category}</a>
                    <p>{post.primaryContactEmail}</p>
                </div>
        </>
    );
}

export default UserProfile;