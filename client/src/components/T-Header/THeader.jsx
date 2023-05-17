//import useState hook to create menu collapse state
import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../../Context.jsx";
import { Link, useNavigate } from "react-router-dom";
import logo from "./Logo1.png";
import collapsedLogo from "./B.png";

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
import { BsCalendar3 } from "react-icons/bs";

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
      <div id="header2">
        {/* collapsed props to change menu size using menuCollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logoText">
              {/* small and big change using menuCollapse state */}
              <p>
                {menuCollapse ? (
                  <img
                    src={collapsedLogo}
                    className="collapsedLogo"
                    width="100"
                    height="100"
                    alt="collapsedLogo"
                  />
                ) : (
                  <img
                    src={logo}
                    className="logo"
                    width="250"
                    height="180"
                    alt="logo"
                  />
                )}
              </p>
            </div>
            <div className="closeMenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <div className="profile-card">
              <div className="profile-info">
                <p id="LoggedInAs">{teacher.name}</p>
                <p>Subject: {teacher.subjects}</p>
              </div>
            </div>
            <Menu iconShape="square">
              <MenuItem icon={<RiPencilLine />}>
                <Link to="/teacherDashboard">Set Availability</Link>
              </MenuItem>
              <MenuItem icon={<i className="fa fa-calendar-check-o"></i>}>
                <Link to="/teacherDashboard/teacherAvailabilities">
                  Your availability
                </Link>
              </MenuItem>
              <MenuItem icon={<FaList />}>
                <Link to="/teacherDashboard/teacherAppointments">
                  Your appointments
                </Link>
              </MenuItem>

              
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem onClick={logoutHandler} icon={<FiLogOut />}>
                Logout
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default THeader;
