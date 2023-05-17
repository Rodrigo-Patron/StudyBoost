import React, { useState } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
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
  const [showNavExternal3, setShowNavExternal3] = useState(false);

  return (
    <>
      <MDBNavbar sticky light >
        <MDBContainer fluid>
        <MDBNavbarBrand href='#'><strong>Study Boost.</strong> app</MDBNavbarBrand>
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
          <MDBNavbarLink active aria-current='page' href='#Home'>
          <Link to="/Home">Home</Link>
              </MDBNavbarLink>
          </MDBBtn>
          <MDBBtn block className="border-bottom m-0" color="black">
          <MDBNavbarLink active aria-current='page' href='#About'>
          <Link to="/About">About Us</Link>
              </MDBNavbarLink>
            
          </MDBBtn>
        </div>
      </MDBCollapse>
    </>
  );
}

// import React, { useState } from 'react';
// import "mdb-react-ui-kit/dist/css/mdb.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import {
//   MDBNavbar,
//   MDBContainer,
//   MDBIcon,
//   MDBNavbarNav,
//   MDBNavbarItem,
//   MDBNavbarLink,
//   MDBNavbarToggler,
//   MDBCollapse,
  
// } from 'mdb-react-ui-kit';

// export default function Navbar() {
//   const [showNavLeft, setShowNavLeft] = useState(false);

//   return (
//     <MDBNavbar expand='lg' light bgColor='light'>
//       <MDBContainer fluid>
//         <MDBNavbarToggler
//           type='button'
//           data-target='#navbarLeftAlignExample'
//           aria-controls='navbarLeftAlignExample'
//           aria-expanded='false'
//           aria-label='Toggle navigation'
//           onClick={() => setShowNavLeft(!showNavLeft)}
//         >
//           <MDBIcon icon='bars' fas />
//         </MDBNavbarToggler>

//         <MDBCollapse navbar show={showNavLeft}>
//           <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
//             <MDBNavbarItem>
//               <MDBNavbarLink active aria-current='page' href='#'>
//                 Home
//               </MDBNavbarLink>
//             </MDBNavbarItem>
//             <MDBNavbarItem>
//               <MDBNavbarLink href='#'>Link</MDBNavbarLink>
//             </MDBNavbarItem>

//           </MDBNavbarNav>
//         </MDBCollapse>
//       </MDBContainer>
//     </MDBNavbar>
//   );
// }