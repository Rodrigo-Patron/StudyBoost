import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { Context } from "../../Context.jsx";
import { useParams } from "react-router-dom";
import { FiCloudLightning } from "react-icons/fi";

function Availabilities() {
  const { studentToken, setAvailability, availability } = useContext(Context);

  const { teacherId } = useParams();
  console.log("teacherId", teacherId);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${studentToken}`,
      },
    };

    fetch(`http://localhost:6500/api/availability/${teacherId}`, config)
      .then((res) => {
        if (!res.ok) {
          res.json().then((err) => console.log(err));
          return;
        }

        return res.json();
      })
      .then((result) => {
        console.log("result:", result);
        setAvailability(result);
      });
  }, []);

  return (
    <div>
      <h2>Selected teacher time slots</h2>
      <ListGroup>
        {availability && availability[0].teacher.name}
        <ListGroup.Item variant="warning">
          {availability &&
            availability.map((appointment) => (
              <div key={appointment._id}>
                <p>
                  <span>Date</span>:{" "}
                  <span className="task-input">{appointment.date}</span>
                </p>
                <p>
                  <span>Time</span>:{" "}
                  <span className="task-input">{appointment.time}</span>{" "}
                </p>
                <Button>Confirm</Button>
                <Button>Cancel</Button>
                <hr />
              </div>
            ))}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default Availabilities;
