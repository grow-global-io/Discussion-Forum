import React from "react";
import { Container } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { BsGrid, BsList } from 'react-icons/bs';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { post } from '../assets/post-data';
import { CircularProgress } from "@mui/material";
import { Backend_URL } from "../Constants/backend";
import Heading from '../components/Heading';
import Post from "../components/Post";
import Trends from "../components/Trends";
import styles from "../styles/Home.module.css";
const Home = () => {
  const [post, setPost] = React.useState([]);
  const [unique, setUnique] = React.useState([]);
  const [temporaryPost, setTemporaryPost] = React.useState([]);
  // let unique = [];
  const [sortBy, setSortBy] = React.useState("newestFirst");
  const [viewLayout, setViewLayout] = React.useState('list');
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
    const tagsPost = temporaryPost.filter((p) => {
      for (let index = 0; index < p.tags.length; index++) {
        const element = p.tags[index];
        if ('#' + element === e.target.outerText) {
          return true;
        } else {
          continue;
        }
        return false;
      }
    })
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
      <Heading />
      <div className={`${styles.home} ${viewLayout === 'grid' ? `${styles.grid}` : ''}`}>
        {user.id && (
          <button className={`${styles.newPost} ${viewLayout === 'grid' ? `${styles.grid}` : ''}`} onClick={createNewPost}>
            <AiOutlinePlus /> New Post
          </button>
        )}
        {
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`${styles.sortDropdown} ${viewLayout === 'grid' ? `${styles.grid}` : ''}`}
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
        <div className={`${styles.trends} ${viewLayout === 'grid' ? `${styles.grid}` : ''}`}>
          <p>Popular Tags</p>
          {post ? (
            <Trends tags={unique} sort={sortByTag} />
          ) : (<></>)}
        </div>
        <div className={`${styles.viewLayout} ${viewLayout === 'grid' ? `${styles.grid}` : ''}`}>
          <div style={{cursor: 'pointer'}} onClick={() => setViewLayout('list')}>
            <BsList />
          </div>
          <div style={{cursor: 'pointer'}} onClick={() => setViewLayout('grid')}>
            <BsGrid />
          </div>
        </div>
        <a className={styles.homeLink} href="/home">All Posts</a>
        <div className={`${styles.posts} ${viewLayout === 'grid' ? `${styles.grid}` : ''}`}>
          {post ? (
            post.map((p) => (
              <>

                <Post user={user} post={p} key={p.id} showMore={false} />
              </>
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