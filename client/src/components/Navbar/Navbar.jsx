import React, { useContext } from "react";
import { Context } from "../../Context.jsx";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBCollapse,
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarLink,
  MDBNavbarBrand,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function Navbar() {
  const { showNavExternal3, setShowNavExternal3 } = useContext(Context);

  return (
    <>
      <MDBNavbar sticky light>
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">
            <strong>Study Boost.</strong> app
          </MDBNavbarBrand>
          <MDBNavbarToggler
            className="ms-auto"
            type="button"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNavExternal3(!showNavExternal3)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
        </MDBContainer>
      </MDBNavbar>

      <MDBCollapse show={showNavExternal3}>
        <div className="bg-yellow shadow-3 p-8">
          <MDBBtn block className="border-bottom m-0" color="black">
            <MDBNavbarLink
              className="links"
              active
              aria-current="page"
              href="/Home"
            >
              Home
            </MDBNavbarLink>
          </MDBBtn>
          <MDBBtn block className="border-bottom m-0" color="black">
            <MDBNavbarLink
              className="links"
              active
              aria-current="page"
              href="/About"
            >
              About Us
            </MDBNavbarLink>
          </MDBBtn>
        </div>
      </MDBCollapse>
    </>
  );
}
