//import useState hook to create menu collapse state
import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../../Context.jsx";
import { Link, useNavigate } from "react-router-dom";
import logo from './Logo.png';
import collapsedLogo from './B.png'

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList } from "react-icons/fa";
import {
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiLogOut,
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./THeader.scss";

const THeader = () => {
  const { teacher, setTeacher, setTeacherToken } = useContext(Context);
  const navigate = useNavigate();

  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menuCollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  function logoutHandler() {
    localStorage.removeItem("teacherToken");
    localStorage.removeItem("teacher");
    navigate("/Home");

    setTeacher(null);
    setTeacherToken(null);
  }

  return (
    <>
      <div className="t-header-wrapper">
        <div id="header2">
          {/* collapsed props to change menu size using menuCollapse state */}
          <ProSidebar collapsed={menuCollapse}>
            <SidebarHeader>
              <div className="logoText">
                {/* small and big change using menuCollapse state */}
                <p>{menuCollapse ? <img src={collapsedLogo} className= "collapsedLogo" width = "50" height = "50" alt="collapsedLogo" />  
              : <img src={logo}  className= "logo"  width = "250" height = "150" alt="logo" />}</p>
              </div>
              <div className="closeMenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
                {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
              </div>
            </SidebarHeader>
            <SidebarContent>
              <div className="profile-card">
                {/* <img
                  src="https://via.placeholder.com/80"
                  alt="Profile"
                  className="profile-img"
                /> */}
                <div className="profile-info">
                  <span id="LoggedInAs">{teacher.name}</span>
                  <span className="profile-subject">{teacher.subject}</span>
                </div>
              </div>
              <Menu iconShape="square">
                <MenuItem active={true} icon={<RiPencilLine />}>
                  <Link to="/availability">Set Availability</Link>
                </MenuItem>
                <MenuItem active={true} icon={<FaList/>}>
                  <Link to="/availability/teacherAppointments">Appointments</Link>
                </MenuItem>
                <MenuItem icon={<i className="fa fa-bell"></i>}>
                  <Link to="/notifications">Notifications</Link>
                </MenuItem>
                {/* <MenuItem icon={<i className="fa fa-envelope"></i>}>
                  <Link to="/messages">Messages</Link>
                </MenuItem>
                <MenuItem icon={<i className="fa fa-calendar-check-o"></i>}>
                  <Link to="/appointment-history">Appointment History</Link>
                </MenuItem>
                <MenuItem icon={<i className="fa fa-book"></i>}>
                  <Link to="/resources">Resources and Materials</Link>
                </MenuItem>
                <MenuItem icon={<i className="fa fa-cog"></i>}>
                  <Link to="/settings">Settings</Link>
                </MenuItem> */}
              </Menu>
            </SidebarContent>
            <SidebarFooter>
              <Menu iconShape="square">
                {/* <Logout /> */}
                <MenuItem onClick={logoutHandler} icon={<FiLogOut />}>
                  Logout
                </MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>
        </div>
      </div>
    </>
  );
};

export default THeader;
