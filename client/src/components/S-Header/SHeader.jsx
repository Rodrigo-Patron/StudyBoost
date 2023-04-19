//import useState hook to create menu collapse state
import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../../Context.jsx";
import { Link, useNavigate } from "react-router-dom";
import logo from "./Logo.png";
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

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./SHeader.scss";

const SHeader = () => {
  const { student, setStudent, setStudentToken } = useContext(Context);
  const navigate = useNavigate();

  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menuCollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  function logoutHandler() {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("student");
    navigate("/Home");

    setStudent(null);
    setStudentToken(null);
  }

  return (
    <>
      <div id="header">
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
                    width="50"
                    height="50"
                    alt="collapsedLogo"
                  />
                ) : (
                  <img
                    src={logo}
                    className="logo"
                    width="250"
                    height="150"
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
            <p id="LoggedInAs">
              <span>{student.name}</span>
            </p>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<RiPencilLine />}>
                <Link to="/studentDashboard">Book appointments</Link>
              </MenuItem>
              <MenuItem active={true} icon={<FaList />}>
                <Link to="/studentDashboard/studentAppointments">
                  Your appointments
                </Link>
              </MenuItem>
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
    </>
  );
};

export default SHeader;
