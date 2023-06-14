import React, { useEffect, useState } from "react";
import { Container, Image, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BrandLogo from "../assets/aco-logo.png";
import styles from "../styles/Home.module.css";
import ProfileToggle from "./ProfileToggle";
import { TextField } from "@mui/material";
import { Backend_URL } from "../Constants/backend";

const NavigationBar = () => {
  const user = useSelector((state) => state.auth.userInfo);
  const [visible, setVisible] = useState(false);
  const [toggler, setToggler] = useState(false);
  const [togglerData,setTogglerData] = useState([])
  useEffect(()=>{
    fetch(Backend_URL+"post/get-data").then(data=>data.json()).then(data=>{data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)); setTogglerData(data.slice(0,3))})
  },[])

  console.log(togglerData)
  const userProfileImage = user.photoURL ? (
    <Image
      src={user.photoURL}
      alt="user image"
      referrerPolicy="no-referrer"
      height={50}
      role="button"
      className="rounded-circle"
      onClick={() => setVisible(!visible)}
    />
  ) : null;
  const navigate = useNavigate();
  return (
    <div>
      <Navbar className="shadow flex-wrap">
        <Container>
          <div className="d-flex flex-column flex-sm-row align-items-sm-center">
            <Navbar.Brand>
              <Link to="/">
                <Image
                  src={BrandLogo}
                  alt="American Composers Orchestra"
                  height="50"
                />
              </Link>
            </Navbar.Brand>
            <Link to="/" style={{ color: '#722282', display: 'inline' }}>National Co-Commissioning Hub</Link>
          </div>
          <TextField variant="standard" fullWidth style={{ maxWidth: 600 }} className="mx-5 mt-3 mt-md-0" type="search" placeholder="Search..." onFocus={() => {
            setToggler(true)
          }} onBlur={() => {
            setToggler(false)
          }} />
          {
            toggler && <div>
              Toggled
            </div>
          }
          <Navbar.Collapse className="justify-content-end">
            {!user.id && (
              <button
                className={styles.newPost}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
            )}
            {userProfileImage}
          </Navbar.Collapse>

        </Container>
      </Navbar>
      
      <ProfileToggle user={user} show={visible} />
    </div>
  );
};

export default NavigationBar;