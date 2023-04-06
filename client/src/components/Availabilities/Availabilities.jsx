import React from "react";
import { Button } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { Context } from "../../Context.jsx";
import { useParams } from "react-router-dom";

function Availabilities() {
  return (
    <div>
      <h2>Selected teacher time slots</h2>
      <Button>Confirm</Button>
      <Button>Cancel</Button>
    </div>
  );
}

export default Availabilities;
