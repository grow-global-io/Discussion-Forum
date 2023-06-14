import React from 'react'

import { Chip } from '@mui/material';
import styles from '../styles/Post.module.css';

import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from 'react-icons/ai';
import { IoMdLink } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Backend_URL } from '../Constants/backend';
import PostFooter from './PostFooter';
import UserProfile from './UserProfile';


const Post = ({ post, showMore }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.userInfo);

    const data = {
        userId: user.uid
    }
    const like = async () => {
        if (Object.keys(user).length > 0) {
            const res = await fetch(Backend_URL+"post/add-like/" + post.id, {
                method: "POST",
                body: JSON.stringify(data)
            })
        }
        else {
            navigate("/login")
        }
    }
    const dislike = async () => {
        const data = {
            valueToRemove:user.uid
        }
        const res = await fetch(Backend_URL+"post/" +"remove-like/"+ post.id, {
            method: "DELETE",
            body: JSON.stringify(data)
        })
    }

    const handleComments = () => {
        navigate('/post/' + post.id + '#comments');
        navigate(0);
    }
    return (
        <div className={styles.post}>

            <div className={styles.postUser}>
                <UserProfile post={post} />
            </div>
            <div className={styles.sampleLinks}>
                <a href={post.composerWebsite} target='_blank' rel="noreferrer">
                    <IoMdLink /> View Website
                </a>
                {/* <a href={post.representativeWorkSample} target='_blank' rel="noreferrer">
                    <IoMdLink /> View Sample
                </a> */}
            </div>
            <div className={styles.postBody}>
                {post.tags && (<div className={styles.postTags}>
                    {post.tags.map(tag => (
                        <Link to={"/"+tag} role="button">
                        <Chip key={tag} label={`#${tag}`} variant='filled' color='secondary' size='small' />
                        </Link>
                    ))}
                </div>)}
                <p>
                    <p>Composer Name: </p>
                    {post.composerName}
                </p>
                <p>
                    <strong>Lead Commissioner: </strong>
                    {post.leadCommissioner}
                </p>
                <p>
                    <strong>Total Commission Fees: </strong>
                    {post.totalCommissionFee}
                    {!showMore && <a href={`/post/${post.id}`}>...see more</a>}
                </p>

                {showMore && (
                    <React.Fragment>
                        <p>
                            <b>Funding Status: </b>
                            {post.fundingStatus}{' '}
                        </p>
                        <p>
                            <strong>Deadline to Join Consortium: </strong>
                            {post.deadlineToJoinConsortium}
                        </p>
                        <p>
                            <strong>Numbers of Partners Sought: </strong>
                            {post.numberOfPartnersSought}
                        </p>
                        <p>
                            <strong>Partners Committed to Date: </strong>
                            {post.partnersCommittedToDate}
                        </p>
                        <p>
                            <strong>
                                Range of Consortium Partner Commission Fees:{' '}
                            </strong>
                            {post.rangeOfConsortiumPartnerCommissionFees}
                        </p>
                        <p>
                            <strong>Duration: </strong>
                            {post.duration}
                        </p>
                        <p>
                            <strong>Instrumentation: </strong>
                            {post.instrumentation}
                        </p>
                        <p>
                            <strong>Conductor: </strong>
                            {post.conductor}
                        </p>
                        <p>
                            <strong>Soloist: </strong>
                            {post.soloist}
                        </p>
                        <p>
                            <strong>Performance Requirements: </strong>
                            {post.performanceRequirements}
                        </p>
                        <p className={styles.postDescription}>
                            <strong>Post Description </strong> 
                            <p style={{marginTop: '10px'}} dangerouslySetInnerHTML={{__html: post.postDescription}}></p>
                        </p>
                    </React.Fragment>
                )}
                {post.coverPhoto && (
                    <div className={styles.postHighlight}>
                        <img src={post["cover-photo"]} alt="" />
                    </div>
                )}
            </div>
            <PostFooter data={data} post={post} like={like} dislike={dislike} handleComments={handleComments} />
        </div>
    );
};

export default Post;
