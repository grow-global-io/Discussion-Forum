import React from "react";
import { Container } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { post } from '../assets/post-data';
import { CircularProgress } from "@mui/material";
import { Backend_URL } from "../Constants/backend";
import Post from "../components/Post";
import styles from "../styles/Home.module.css";
const Home = () => {
  const [post, setPost] = React.useState([]);
  const [sortBy, setSortBy] = React.useState("newestFirst");
  const user = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();

  React.useEffect(() => {
    let url = Backend_URL + "post/get-data";

    if (sortBy === 'comments') {
      url += "?sortBy=comments";
    } else if (sortBy === 'likes') {
      url += "?sortBy=likes";
    }
    else if (sortBy === 'newestFirst') {
      url += "?sortBy=newestFirst";
    }
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => setPost(data));
  }, [sortBy]);

  const createNewPost = () => {
    navigate(`/create/${user.id}`);
  };

  return (
    <Container>
      {!post && (
        <div
          style={{
            display: "grid",
            placeItems: "center",
            maxHeight: "60vw",
            minHeight: "60vh",
          }}
        >
          <CircularProgress />
        </div>
      )}

      <div className={styles.home}>
        {user.id && (
          <button className={styles.newPost} onClick={createNewPost}>
            <AiOutlinePlus /> New Post
          </button>
        )}
        {
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.sortDropdown}
          >
            <option value="newestFirst">Sort By Newest First</option>
            <option value="comments">Number of Comments</option>
            <option value="likes">Number of Likes</option>
          </select>
        }

        {/* <aside className={styles.menuWrapper}>
                    <div className={styles.menu}>
                        <h6>MENU</h6>
                        <a href="/" className={styles.active}>
                            🏠 Home
                        </a>
                        <a href="/">🎶 Explore</a>
                        <a href="/">🗂️ Topics</a>
                        <a href="/">📝 My answers</a>
                    </div>
                </aside> */}
        <div className={styles.posts}>
        {post ? (
          post.map((p) => (
            <Post user={user} post={p} key={p.id} showMore={false} />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
    </Container >
  );
};

export default Home;
