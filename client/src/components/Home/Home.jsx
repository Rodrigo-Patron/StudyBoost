import "./Home.scss";
import Header from "../Header/Header";
import React from "react";
import { Container, Row, Button, Card, Col, CardGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

// function Home() {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(max-width: 768px)');
//     setIsMobile(mediaQuery.matches);

//     const handleResize = () => setIsMobile(mediaQuery.matches);

//     mediaQuery.addEventListener('change', handleResize);

//     return () => mediaQuery.removeEventListener('change', handleResize);
//   }, []);

function Home() {
  return (
    
    <div className="home">
     <Header/>
      <Row className="home-row">
        <div className="background">
          <NavLink to="/teachersPage">
            <Button className="home-btn" variant="outline-dark">
              Teachers
            </Button>
          
          </NavLink>

          <NavLink to="/studentsPage">
            <Button className="home-btn" variant="outline-dark">
              Students
            </Button>
          </NavLink>
        </div>
      </Row>

      <Card>
        <Card.Body>
          <h2>About us</h2>
        </Card.Body>
      </Card>
      <Container>
        <Row className="about">
          <Col sm={6} className="about1">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum, eum. Corporis aspernatur laborum qui dignissimos sit,
              vero vitae eos, labore consequatur dolores illum! Perspiciatis,
              deleniti magnam. Nesciunt doloribus ipsa ex! Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Iusto molestiae ex cum, modi
              non quas nobis ab aliquid aperiam, consequatur, laudantium impedit
              sint rem. Obcaecati qui animi eius sunt reprehenderit?
            </p>
          </Col>
          <Col sm={6} className="about2">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Distinctio sit, quasi fugiat, adipisci veritatis cupiditate iste
              quia officiis itaque corporis, voluptatum ipsa possimus
              exercitationem perferendis error amet omnis impedit esse! Lorem
              ipsum, dolor sit amet consectetur adipisicing elit. Optio repellat
              sapiente eveniet mollitia nulla beatae magni similique dolorem
              earum repudiandae, ullam dolores saepe consectetur dolor! A ipsam
              molestias at provident.
            </p>
          </Col>
        </Row>
      </Container>

      <Card>
        <Card.Body>
          <h2>Our Team</h2>
        </Card.Body>
      </Card>

      <CardGroup>
        <Card>
          <Card.Img variant="top"  className="RodrigoCard"/>
          <Card.Body>
            <Card.Title>Rodrigo</Card.Title>
            <Card.Text>
              <p>Full stack Developer</p>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card >
          <Card.Img variant="top" className="MohammadCard"/>
          <Card.Body>
            <Card.Title>Mohammad</Card.Title>
            <Card.Text>
              <p>Full stack Developer</p>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card >
          <Card.Img variant="top" className="AgathaCard"/>
          <Card.Body>
            <Card.Title>Agatha</Card.Title>
            <Card.Text>
              <p>Full stack Developer</p>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant="top" className="DavidCard" />
          <Card.Body>
            <Card.Title>David</Card.Title>
            <Card.Text>
              <p>Full stack Developer</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
   

    </div>
  );
}

export default Home;


// import { Row, Col, Container, Card, CardGroup, Button } from 'react-bootstrap';
// import { NavLink } from 'react-router-dom';
// import Header from './Header';
// import './Home.css';

// function Home() {
//   return (
//     <div className="home">
//       <Header />
//       <Row className="home-row">
//         <div className="background">
//           <NavLink to="/teachersPage">
//             <Button className="home-btn" variant="outline-dark">
//               Teachers
//             </Button>
//           </NavLink>
//           <NavLink to="/studentsPage">
//             <Button className="home-btn" variant="outline-dark">
//               Students
//             </Button>
//           </NavLink>
//         </div>
//       </Row>

//       <Card>
//         <Card.Body>
//           <h2>About us</h2>
//         </Card.Body>
//       </Card>
//       <Container>
//         <Row className="about">
//           <Col xs={12} md={6} className="about1">
//             <p>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
//               eum. Corporis aspernatur laborum qui dignissimos sit, vero vitae eos,
//               labore consequatur dolores illum! Perspiciatis, deleniti magnam.
//               Nesciunt doloribus ipsa ex! Lorem ipsum dolor sit amet consectetur
//               adipisicing elit. Iusto molestiae ex cum, modi non quas nobis ab
//               aliquid aperiam, consequatur, laudantium impedit sint rem. Obcaecati
//               qui animi eius sunt reprehenderit?
//             </p>
//           </Col>
//           <Col xs={12} md={6} className="about2">
//             <p>
//               Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
//               sit, quasi fugiat, adipisci veritatis cupiditate iste quia officiis
//               itaque corporis, voluptatum ipsa possimus exercitationem perferendis
//               error amet omnis impedit esse! Lorem ipsum, dolor sit amet consectetur
//               adipisicing elit. Optio repellat sapiente eveniet mollitia nulla beatae
//               magni similique dolorem earum repudiandae, ullam dolores saepe consectetur
//               dolor! A ipsam molestias at provident.
//             </p>
//           </Col>
//         </Row>
//       </Container>

//       <Card>
//         <Card.Body>
//           <h2>Our Team</h2>
//         </Card.Body>
//       </Card>

//       <CardGroup>
//         <Card>
//           <Card.Img variant="top" className="RodrigoCard img-fluid" />
//           <Card.Body>
//             <Card.Title>Rodrigo</Card.Title>
//             <Card.Text>
//               <p>Full stack Developer</p>
//             </Card.Text>
//           </Card.Body>
//         </Card>
//         <Card
