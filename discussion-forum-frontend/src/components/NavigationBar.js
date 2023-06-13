import React, { useState } from "react";
import { Container, Image, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BrandLogo from "../assets/aco-logo.png";
import styles from "../styles/Home.module.css";
import ProfileToggle from "./ProfileToggle";

const NavigationBar = () => {
  const user = useSelector((state) => state.auth.userInfo);
  const [visible, setVisible] = useState(false);

  const userProfileImage = user.photoURL  ? (
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
    <>
      <Navbar className="shadow">
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
                <Link to="/" style={{color: '#722282', display: 'inline'}}>National Co-Commissioning Hub</Link>
          </div>
          
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
    </>
  );
};

export default NavigationBar;