import React, { useState } from "react";
import "./Header.scss";
import { useContext } from "react";
import { Context } from "../../Context.jsx";
import { Link } from "react-router-dom";
import logo from './Logo.png';
import collapsedLogo from './B0.png'

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FiHome, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";

//import sidebar css from react-pro-sidebar module and our custom css
// import "react-pro-sidebar/dist/css/styles.css";


const Header = () => {

  const { isCollapsed, setIsCollapsed } = useContext(Context);
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(true);

  //create a custom function that will change menuCollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
   setMenuCollapse(!menuCollapse);
   setIsCollapsed(menuCollapse)
  };

  return (
    <>



      <div id="header">
        {/* collapsed props to change menu size using menuCollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logoText">
              {/* small and big change using menuCollapse state */}
              <p>{menuCollapse ? <img src={collapsedLogo} className= "collapsedLogo" width = "100" height = "100" alt="collapsedLogo" />  
              : <img src={logo}  className= "logo"  width = "250" height = "180" alt="logo" />}</p>
            </div>
            <div className="closeMenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />}>
                <Link to="/Home">Home</Link>
              </MenuItem>
              <MenuItem active={true} icon={<RiPencilLine />}>
                <Link to="/About">About Us</Link>
              </MenuItem>
            </Menu>
          </SidebarContent>

          <SidebarFooter>
            {/* <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu> */}
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;
