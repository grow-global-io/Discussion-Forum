import styles from '../styles/Post.module.css';

const PostComments = ({  comment }) => {
    console.log(comment)
    return (
        <div className={styles.comment}>
            <img
                src={comment?.userProfilePhoto}
                alt="user"
                width={50}
                height={50}
                style={{ borderRadius: '50%' }}
            />
            <div className={styles.commentDetails}>
                <div className={styles.commentHeader}>{comment?.userDisplayName}
                    <i>{comment?.createdAt}</i>
                </div>
                <div className={styles.commentBody}>
                    <p>{comment?.comment}</p>
                </div>
            </div>
        </div>
    );
};

export default PostComments;
