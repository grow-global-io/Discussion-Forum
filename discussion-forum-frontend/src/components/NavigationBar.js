import React, { useEffect, useState } from "react";
import { Card, Container, Image, Navbar } from "react-bootstrap";
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
  const [togglerData, setTogglerData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  useEffect(() => {
    fetch(Backend_URL + "post/get-data").then(data => data.json()).then(data => { data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)); setTogglerData(data.slice(0, 3)) })
    setFilteredData(togglerData)
  }, [window.location])

  const changeHandler = (e="") => {
    setFilteredData(
      togglerData.filter(each => each.postDescription.toLowerCase().includes(e.target.value.toLowerCase())|| each.composerName.toLowerCase().includes(e.target.value.toLowerCase()))
    )
  }

  const redirectHandler = (each)=>{
    window.location.pathname = "/post/"+each.id
  }

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
          <TextField variant="standard" fullWidth style={{ maxWidth: 600 }} className="mx-5 mt-3 mt-md-0" type="search"
            onChange={(e) => changeHandler(e)}
            placeholder="Search..." onFocus={() => {
              setToggler(true)
            }}  
            
            onBlur={()=>{
              setTimeout(()=>{
                setToggler(false)
              },[200  ])
            }}
            />
          {
            toggler && <Card style={{
              position: "absolute",
              right: "50vw",
              top: "80px",
              padding: "10px 30px"
            }} >
              {filteredData.length>0? filteredData.map(each => {
                return (
                  <div onClick={()=>redirectHandler(each)}  style={{textDecoration:"none",color:"black", borderBottom:"1px solid rgba(0,0,0,0.25)", minWidth:"300px"}} className="d-flex justify-content-between">
                    <div className="">
                      <p>{each.composerName}</p>
                      <p>{each.leadCommissioner}</p>
                    </div>
                    <div>
                      <img src={each["cover-photo"]} height={50}/>
                    </div>
                  </div>
                )
              }):togglerData.map(each => {
                return (
                  <div onClick={()=>redirectHandler(each)}  style={{textDecoration:"none",color:"black", borderBottom:"1px solid rgba(0,0,0,0.25)", minWidth:"300px"}} className="d-flex justify-content-between">
                    <div className="">
                      <p>{each.composerName}</p>
                      <p>{each.leadCommissioner}</p>
                    </div>
                    <div>
                      <img src={each["cover-photo"]} height={50}/>
                    </div>
                  </div>
                )
              })
              
              }
            </Card>
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