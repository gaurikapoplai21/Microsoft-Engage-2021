import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import {Card} from "react-bootstrap"


const Profile = (props) => {
  const user = useSelector(selectUser);

  return (
    <div>

      <Card  style={{ backgroundColor: "#E6E6FA",marginLeft:"25%", marginTop:"2%",width:"50%"}}>
        <Card.Header>Joined On : {user.joinedOn}</Card.Header>
        <Card.Body>
          <Card.Title>Hi {user.name}!</Card.Title>
          <Card.Text>
              Email : {user.email}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
