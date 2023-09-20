import { Container } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { Form, useParams } from "react-router-dom";
// import { post } from "../assets/post-data";
import { Checkbox, CircularProgress, FormControlLabel } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Backend_URL } from '../Constants/backend';
import Post from "../components/Post";
import PostComment from "../components/PostComment";
import styles from '../styles/Post.module.css';

export async function commentAction({ request }) {
    const data = await request.formData();
    const { ...values } = await Object.fromEntries(data);
}



const PostPage = () => {
    const user = useSelector((state) => state.auth.userInfo);

    const handleSubmit= async (e)=>{
        e.preventDefault()
        /**
         * userDisplayName
         * userId
         * userProfilePhoto
         */

        const getPostUserEmail = await fetch(Backend_URL + 'user/get/' + data.userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const { email: postUserEmail} = await getPostUserEmail.json();

        if(Object.keys(user).length > 0){
            const body = {
                userDisplayName: user.displayName,
                userId: user.uid,
                userProfilePhoto: user.photoURL,
                comment: textAreaRef.current.value
            }
            fetch(Backend_URL+"post/create-thread/"+id,{
            method:"POST",
            body:JSON.stringify(body)
        })
        const commentNotifierBody = {
            emails: [postUserEmail],
            subject: `You got a comment on your Post!`,
            html: `<h1>${user.displayName} commented on your post</h1><a href='https://commissioning-hub.web.app/post/${id}'>Go to post</a>`,
        }
        await fetch('https://us-central1-email-service-e8713.cloudfunctions.net/api/v1/sendEmail', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentNotifierBody)
        })
        }
        else{
            const body = {
                userDisplayName:"Anonymous",
                userId:uuidv4(),
                userProfilePhoto:"https://st3.depositphotos.com/6672868/13701/v/1600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
                comment:textAreaRef.current.value
            }
            fetch(Backend_URL+"post/create-thread/"+id,{
            method:"POST",
            body:JSON.stringify(body)
        })
        const commentNotifierBody = {
            emails: [postUserEmail],
            subject: `You got a comment on your Post!`,
            html: `<h1>An anonymous person commented on your post</h1><a href='https://commissioning-hub.web.app/post/${id}'>Go to post</a>`,
        }
        await fetch('https://us-central1-email-service-e8713.cloudfunctions.net/api/v1/sendEmail', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentNotifierBody)
        })
        }
        fetch(Backend_URL + "post/get-data/" + id).then(data => data.json()).then(data => {
            setData(data);
            setComments(data.comments);
        })
        window.location.reload();
    }
    const textAreaRef = useRef();
    const [checked, setChecked] = useState(false);
    const { id } = useParams()
    const [data, setData] = useState()
    const [comments, setComments] = useState()
    useEffect(() => {
        fetch(Backend_URL+"post/get-data/" + id).then(data => data.json()).then(data => {
            setData(data);
            setComments(data.comments);
        })
    }, [])

    const handleChecked = () => {
        setChecked(!checked);
    }


    return (
        <Container>
        {!data && <div style={{display: 'grid', placeItems: 'center', maxHeight: '60vw', minHeight: '60vh'}}>
            <CircularProgress />
        </div>}            
            
            {data && <div className={styles.postWrapper}>
                <Post post={data} showMore={true} />
                <div className={styles.comments} id="comments">
                    <p className={styles.commentHead}>Comments</p>
                    <Form method='post' className={styles.commentBox} onSubmit={handleSubmit}>
                        <textarea ref={textAreaRef} name="comment" id="comment" cols="30" rows={2} placeholder='Leave Your Thoughts here...'></textarea>
                        <button type="submit">Comment</button>
                        {/* <FormControlLabel control={<Checkbox checked={checked} onChange={handleChecked} color='secondary' type="checkbox" name="anonymous" value='anonymous' id="anonymous" />} label="Comment as anonymous" /> */}
                    </Form>
                    {
                        comments.map((comment, index) => (
                            <PostComment key={index} comment={comment} />
                        ))
                    }
                </div>
            </div>}
        </Container>
    );
}

export default PostPage;