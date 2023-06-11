import React from "react";
import { Container } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { post } from '../assets/post-data';
import { CircularProgress } from "@mui/material";
import { Backend_URL } from "../Constants/backend";
import Post from "../components/Post";
import Trends from "../components/Trends";
import styles from "../styles/Home.module.css";
const Home = () => {
  const [post, setPost] = React.useState([]);
  const [unique, setUnique] = React.useState([]);
  const [temporaryPost, setTemporaryPost] = React.useState([]);
  // let unique = [];
  const [sortBy, setSortBy] = React.useState("newestFirst");
  const user = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  let url = Backend_URL + "post/get-data";

  React.useEffect(() => {

    if (sortBy === 'comments') {
      url += "?sortBy=comments";
    } else if (sortBy === 'likes') {
      url += "?sortBy=likes";
    } else if (sortBy === 'newestFirst') {
      url += "?sortBy=newestFirst";
    }
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setPost(data);
        setTemporaryPost(data);
        console.log("data", data)
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          let tags = element.tags;
          for (let index = 0; index < tags.length; index++) {
            const element = tags[index];
            setUnique((prev) => {
              return [...prev, element];
            });
          }
        }
      });
    console.log("🚀 ~ unique ~ unique:", unique)
  }, [sortBy]);

  const createNewPost = () => {
    navigate(`/create/${user.id}`);
  };

  const sortByTag = (e) => {
    // fetch(url, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((data) => data.json())
    //   .then((data) => setPost(data));
    console.log(e.target.outerText) // tag clicked on
    const tagsPost = temporaryPost.filter((p) => {
      for (let index = 0; index < p.tags.length; index++) {
        const element = p.tags[index];
        console.log("🚀 ~ tagsPost ~ element:", element)
        if ('#' + element === e.target.outerText) {
          return true;
        } else {
          continue;
        }
        return false;
      }
    })
    console.log("🚀 ~ tagsPost ~ tagsPost:", tagsPost)
    setPost(tagsPost);
  }

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
            <option value="newestFirst">Sort By Newest</option>
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
        <div className={styles.trends}>
          <p>Popular Trends</p>
          {post ? (
            <Trends tags={unique} sort={sortByTag} />
          ) : (<></>)}
        </div>
        <a className={styles.homeLink} href="/home">All Posts</a>
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
    </Container>
  );
};

export default Home;