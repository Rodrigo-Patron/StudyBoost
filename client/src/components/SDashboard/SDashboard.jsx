import React from "react";
import "./SDashboard.scss";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context.jsx";
import { Row, Button, ListGroup, Container } from "react-bootstrap";
import SHeader from "../S-Header/SHeader";
import { useNavigate } from "react-router-dom";
import { CContainer, CCol, CRow } from '@coreui/bootstrap-react'

function SDashboard() {
  const navigate = useNavigate();
  const { student, teacher, setTeacher, studentToken, isCollapsed, setIsCollapsed } = useContext(Context);
  const [query, setQuery] = useState("");

  //  get all teachers
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${studentToken}`,
      },
    };
    fetch("http://localhost:6500/api/teachers/", config)
      .then((res) => {
        if (!res.ok) {
          res.json().then((err) => console.log(err));
          return;
        }

        return res.json();
      })
      .then((result) => {
        // console.log(result.reverse());
        //^ new teacher show at the top
        setTeacher(result);
      });
  }, []);

  const headerWidth = isCollapsed ? 3 : 1
  const remainingWidth = 12 - headerWidth
  
  return (
  
//     <div class="d-flex bd-highlight">
//   <div class="p-2 w-100 bd-highlight">Flex item</div>
//   <div class="p-2 flex-shrink-1 bd-highlight">Flex item</div>
// </div>

  // <div className="student-dashboard">
     
      <CContainer fluid={true} className="appointment-container" >
      <CRow>
    <CCol xs="12" md={headerWidth}> <SHeader/></CCol>
    <CCol xs="12" md={remainingWidth}>
    <div className="appointment-row">
    <div className="top-header">
          <h3 className="title">
            Hello <span className="student-name">{student.name}</span>, find a
            teacher and book your appointment
          </>
          <div className="search-bar">
            <input
              placeholder="Search..."
        
       onChange={(e) => setQuery(e.target.value)}
       
      
            />
            </div>   


          </div>
          <ListGroup className="teacher-details">
            <ListGroup.Item variant="light">
              {teacher &&
                teacher
                  .filter((appointment) => {
                    if (query === "") {
                      return appointment;
                    } else if (
                      appointment.name
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                      appointment.subjects
                        .toLowerCase()
                        .includes(query.toLowerCase())
                    ) {
                      return appointment;
                    }
                  })
                  .map((appointment) => (
                    <div key={appointment._id}>
                      <p>
                        <span>Name: </span>{" "}
                        <span className="teacher-input">
                          {appointment.name}
                        </span>
                      </p>

                      <p>
                        <span>Subject:</span>{" "}
                        <span className="teacher-input">
                          {appointment.subjects}
                        </span>{" "}
                      </p>

                      <Button
                        size="sm"
                        className="appointment-btn"
                        disabled={
                          !appointment.availabilityByTeacher.length
                            ? true
                            : false
                        }
                        onClick={(e) => {
                          navigate(`/studentDashboard/${appointment._id}`);
                        }}
                      >
                        {!appointment.availabilityByTeacher.length
                          ? "No availability"
                          : "Book appointment"}
                      </Button>

                      <hr />
                    </div>
                  ))}
            </ListGroup.Item>
          </ListGroup>
        </div>
      
    </CCol>
  </CRow>
        
      </CContainer>
    // </div>
  );
}

export default SDashboard;
