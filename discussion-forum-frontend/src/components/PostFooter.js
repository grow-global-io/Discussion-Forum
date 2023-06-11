import { useState } from 'react';
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Post.module.css';

const PostFooter = ({ data, post, like, dislike, handleComments }) => {
    console.log(data)
    console.log(post.likedBy?.includes(data.userId))
    const navigate = useNavigate();
    const [likes, setLikes] = useState(post.likedBy?.length);
    const [isLiked, setIsLiked] = useState(post.likedBy?.includes(data.userId));

    const handleLike = () => {
        setLikes(() => {
            return likes + 1;
        });
        setIsLiked(true);
        like();
    }

    const handleDislike = () => {
        setLikes(() => {
            return likes - 1;
        })
        setIsLiked(false);
        dislike();
    }

    return (
        <div className={styles.postFooter}>
                {post.likedBy && !isLiked ? (
                    <button onClick={handleLike}>
                        <AiOutlineHeart />{' '}
                        {post.likedBy ? likes : 0}
                    </button>
                ) : (
                    <button>
                        <AiFillHeart style={{ color: 'red' }} onClick={handleDislike} />{' '}
                        {post.likedBy ? likes : 0}
                    </button>
                )}
                <button onClick={handleComments}>
                    <AiOutlineComment />{' '}
                    {post.comments ? post.comments.length : 0}
                </button>
            </div>
    );
}
 
export default PostFooter;