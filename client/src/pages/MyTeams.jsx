import React from "react";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GET,DELETE } from "../config/api";
import Navbar from "../components/Navbar/TeacherNavbar";
import { Card, Button,ListGroup,Row} from "react-bootstrap";

const MyTeams = () => {
  const user = useSelector(selectUser);
  const history = useHistory()

  let [card, setCard] = useState([]);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    GET("/teams/user/" + user.id)
      .then((res) => {
        let template = res.data.map((item, i) => (
          <Card
            className="text-center"
            style={{
              marginTop: "3%",
              marginLeft: "15%",
              marginRight: "15%",
              backgroundColor: "#E6E6FA",
              width: "70%",
            }}
          >
            <Card.Header>Created On : {item.createdOn}</Card.Header>
            <Card.Body>
              <Card.Title>{item.eventName}</Card.Title>
              <Card.Text>
                <ListGroup.Item> Team Name : {item.teamName}</ListGroup.Item>
                {item.names.map((member, i) => (
                  <div>
                    <br />

                    <ListGroup horizontal style={{ display: "block" }}>
                      <ListGroup.Item> Name : {item.names[i]}</ListGroup.Item>
                      <ListGroup.Item> Email : {item.emails[i]}</ListGroup.Item>
                    </ListGroup>
                  </div>
                ))}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
              {" "}
              <Button variant="secondary" onClick={()=>history.push("/edit-team/" + item._id + "/" + item.names.length)}>Edit</Button>
              <Button
                variant="warning"
                style={{ marginLeft: "10px" }}
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </Button>
            </Card.Footer>
          </Card>
        ));

        setCard(template);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [card]);
  const handleDelete = (teamId) =>{
      DELETE("/teams/" + teamId)
        .then((response) => {
          alert("Team successfully deleted");
          //window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
          alert("Team deletion unsuccessful");
        });
  }
  return (
    <div>
      <Navbar userType={user.userType} />
      <h3 style={{marginTop:"30px"}}> {user.name}'s Teams</h3>
      <Row xs={1} md={1} className="g-4">
        {loading === false ? card : null}
      </Row>
    </div>
  );
};

export default MyTeams;
