import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/mg1.png";
import { FaShuffle, FaUser } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { FaInfoCircle } from 'react-icons/fa'; // import ListIcon from "@mui/icons-material/ListRounded";
import { FaSignOutAlt } from 'react-icons/fa';
import {  FaList, FaUsers } from 'react-icons/fa';

import {
  CircleMenu,
  CircleMenuItem,
  TooltipPlacement,
} from "react-circular-menu";
import { useGetStorysQuery } from "../slices/storysApiSlice";
import Loader from '../components/Loader';

function Header({ handleBackgroundBlur }) {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [closeMenu, setCloseMenu] = React.useState(true);
  const [closeAdminMenu, setCloseAdminMenu] = React.useState(true);

  const { data, isLoading, error } = useGetStorysQuery({fetchAll:'true'});

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleRandomClick = () => {
    if (data && data.storys) {
      const randomIndex = Math.floor(Math.random() * data.storys.length);
      const randomStoryId = data.storys[randomIndex]._id;
      console.log(randomStoryId);
      navigate(`/story/${randomStoryId}`);
    }
  };
  

  const handleProfileClick = () => {
    navigate("/profile");
  };
 const handleStoryListClick =()=>{
  navigate("/admin/StoryList");
 }
 const handleUserListClick =()=>{
  navigate("/admin/userlist");
 }
  const handleMenuOpen = () => {
    setCloseMenu(false);
    handleBackgroundBlur(true);
  };

  const handleMenuClosed = async () => {
    setCloseMenu(true);
    handleBackgroundBlur(false);
  };

  const handleAdminMenuOpen = () => {
    setCloseAdminMenu(false);
    handleBackgroundBlur(true);
  };

  const handleAdminMenuClosed = async () => {
    setCloseAdminMenu(true);
    handleBackgroundBlur(false);
  };


  React.useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header>
      <Navbar bg="light" variant="" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="brand-text">
              <img
                src={logo}
                alt="nothing"
                style={{ width: "60px", height: "40px", padding: "0" }}
              />
              𝔐𝔦𝔫𝔡𝔣𝔲𝔩 𝔇𝔦𝔞𝔩𝔬𝔤𝔲𝔢{" "}
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px", marginLeft: "207px" }}
              navbarScroll
            >
              <LinkContainer to="/Type">
                <Nav.Link>Type</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Genre">
                <Nav.Link>Genre</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/Filter">
                <Nav.Link>Filter</Nav.Link>
              </LinkContainer>

              {userInfo && (
                <Nav.Link onClick={handleRandomClick}>
                  <FaShuffle />
                  Random
                </Nav.Link>
              )}
              {/* <SearchBox/> */}
            </Nav>
            

            <Nav className="ms-auto">
              {userInfo ? (
                <p style={{ marginBottom: "3px", marginRight: "9px" }}>
                  {userInfo.name}
                </p>
              ) : (
                <LinkContainer to="/Login">
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
            <>
              {userInfo && screenWidth < 992 ? (
                <>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#/"
                      style={{ color: "#282828" }}
                    >
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#/"
                      style={{ color: "#282828" }}
                    >
                      Profile
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#/"
                      onClick={() => alert("No info just yet :(")}
                      style={{ color: "#282828" }}
                    >
                      Info
                    </a>
                  </li>
                  <hr></hr>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#/"
                      style={{ color: "#282828" }}
                      onClick={logoutHandler}
                    >
                      Logout
                    </a>
                  </li>
                  <hr></hr>
                </>
              ) : null}
            </>

            <span className="navbar-text">
              { userInfo && screenWidth > 991 && !userInfo.isAdmin ? (
                <div className="mobile-width">
                  <CircleMenu
                    startAngle={180}
                    rotationAngle={-120}
                    itemSize={1}
                    radius={5}
                    open={closeMenu ? false : true}
                    rotationAngleInclusive={false}
                    onMenuToggle={(menuActive) =>
                      menuActive === true
                        ? handleMenuOpen()
                        : handleMenuClosed()
                    }
                  >
                    <CircleMenuItem
                      tooltip="Edit Profile"
                      tooltipPlacement={TooltipPlacement.Left}
                      onClick={() => {
                        handleProfileClick();
                        handleMenuClosed();
                      }}
                    >
                      <FaUser />
                    </CircleMenuItem>

                    <CircleMenuItem
                      tooltip="Logout"
                      onClick={() => {
                        logoutHandler();
                        handleMenuClosed(); // Blur background on logout
                      }}
                      tooltipPlacement={TooltipPlacement.Left}
                    >
                      <FaSignOutAlt />
                    </CircleMenuItem>
                    <CircleMenuItem
                      onClick={() => alert("No info just yet :(")}
                      tooltip="Info"
                      tooltipPlacement={TooltipPlacement.Bottom}
                    >
                      <FaInfoCircle />
                    </CircleMenuItem>
                  </CircleMenu>
                </div>
              ) : !userInfo ? null : null}

            </span>
            {userInfo && userInfo.isAdmin && (
              <span className="navbar-text" style={{marginLeft:"20px" }}>
                <div className="mobile-width">
                  <CircleMenu
                    startAngle={180}
                    rotationAngle={-120}
                    itemSize={1}
                    radius={5}
                    open={closeAdminMenu ? false : true}
                    rotationAngleInclusive={false}
                    onMenuToggle={(men) =>
                      men === true
                        ? handleAdminMenuOpen()
                        : handleAdminMenuClosed()
                    }
                  >
                    <CircleMenuItem
                      tooltip="Edit Profile"
                      tooltipPlacement={TooltipPlacement.Left}
                      onClick={() => {
                        handleProfileClick();
                        handleAdminMenuClosed();
                      }}
                    >
                      <FaUser />
                    </CircleMenuItem>
                    <CircleMenuItem
                      tooltip="Story List"
                      tooltipPlacement={TooltipPlacement.Left}
                      onClick={() => {
                        handleStoryListClick();
                        handleAdminMenuClosed();
                      }}
                    >
                      <FaList />
                    </CircleMenuItem>
                    <CircleMenuItem
                      onClick={() => {
                        handleUserListClick();
                        handleAdminMenuClosed();
                      }}
                      tooltip="User List"
                      tooltipPlacement={TooltipPlacement.Bottom}
                    >
                      <FaUsers />
                    </CircleMenuItem>
                    <CircleMenuItem
                      tooltip="Logout"
                      onClick={() => {
                        logoutHandler();
                        handleAdminMenuClosed(); // Blur background on logout
                      }}
                      tooltipPlacement={TooltipPlacement.Left}
                    >
                      <FaSignOutAlt />
                    </CircleMenuItem>
                    
                  </CircleMenu>
                </div>
              </span>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
