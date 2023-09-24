import React, { useEffect, useState } from 'react';

import { Checkbox, Chip } from '@mui/material';
import styles from '../styles/Post.module.css';

import toast from 'react-hot-toast';
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
    const [subscribe, setSubscribe] = useState(false);

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

    useEffect(() => {
        if (post && post.threadPosts.length > 0) {
            if (post.threadPosts.some(e => e.userId === user.uid)) {
                setSubscribe(true);
            }
        }
    }, [subscribe, post, user])

    const handleSubscribe = async () => {
        if (!subscribe) {
            setSubscribe(true)
            const data = {
                userId: user.uid,
                email: user.email
            }
            await fetch(Backend_URL+"post/add-thread/"+post.id, {
                method: "POST",
                body: JSON.stringify(data)
            })
            toast("Subscribed to post");
        } else {
            setSubscribe(false);
            const data = {
                valueToRemove: {
                    
                    userId: user.uid,
                    email: user.email
                    
                }
            }
            await fetch(Backend_URL+"post/remove-thread/"+post.id, {
                method: "DELETE",
                body: JSON.stringify(data)
            })
        }
    }
    
    return (
        <div className={`${styles.post} ${showMore ? styles.full : ''}`}>

            <div className={styles.postUser}>
                <UserProfile post={post} />
            </div>
            <div className={styles.sampleLinks}>
                <a href={post.composerWebsite} target='_blank' rel="noreferrer">
                    <IoMdLink /> View Website
                </a>
                <a href={post.representativeWorkSample} target='_blank' rel="noreferrer">
                    <IoMdLink /> View Sample
                </a>
            </div>
            <div className={styles.postBody}>
                {post.tags && (<div className={styles.postTags}>
                    {post.tags.map((tag,index) => (
                        <Link to={"/"+tag} key={index} role="button">
                        <Chip key={tag} label={`#${tag}`} variant='filled' color='secondary' size='small' />
                        </Link>
                    ))}
                </div>)}
                <p>
                    <strong>Composer Name: </strong>
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
                            <strong>Composer Race/Ethnicity: </strong>
                            {post.ethnicity}
                        </p>
                        <p>
                            <strong>Composer Gender: </strong>
                            {post.gender}
                        </p>
                        <p>
                            <strong>Performance Requirements: </strong>
                            {post.performanceRequirements}
                        </p>
                        <p>
                            <Checkbox checked={subscribe} onClick={handleSubscribe} size='small' color='secondary' />
                            <strong>Subscribe to post</strong>
                        </p>
                        <p className={styles.postDescription}>
                            <strong>Post Description </strong> 
                            <p style={{marginTop: '10px'}} dangerouslySetInnerHTML={{__html: post.postDescription}}></p>
                        </p>
                    </React.Fragment>
                )}
                {post.coverPhoto && (
                    <div className={styles.postHighlight} style={{overflow: `${showMore ? 'auto' : 'hidden'}`, aspectRatio: `${showMore ? '' : '1 / 0.5'}`}}>
                        <img src={post["cover-photo"]} style={{margin: '0 auto'}} alt="" />
                    </div>
                )}
            </div>
            <PostFooter data={data} post={post} like={like} dislike={dislike} handleComments={handleComments} />
        </div>
    );
};

export default Post;
