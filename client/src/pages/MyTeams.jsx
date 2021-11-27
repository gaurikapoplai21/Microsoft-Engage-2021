import React from "react";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GET,DELETE } from "../config/api";
import Navbar from "../components/Navbar/TeacherNavbar";
import { Card, Button,Row,Table} from "react-bootstrap";
import Modal from "./ProjectSubmission";


const MyTeams = () => {
  const user = useSelector(selectUser);
  const history = useHistory()

  let [card, setCard] = useState([]);
  let [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [teamId, setTeamId] = useState("")
  const [members, setMembers] = useState();
  const [eventName, setEventName] = useState();


  

  const hidemodal = () => {
    setModalShow(false);
  };
 


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
                Team Name : {item.teamName}
                <br />
                <br />
                <Table responsive="sm" striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  {item.names.map((member, i) => (
                    <tbody>
                      <tr>
                        <td>{item.names[i]}</td>
                        <td>{item.emails[i]}</td>
                      </tr>
                    </tbody>
                  ))}
                </Table>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
              {" "}
              <Button
                variant="secondary"
                onClick={() =>
                  history.push(
                    "/edit-team/" + item._id + "/" + item.names.length
                  )
                }
              >
                Edit
              </Button>
              <Button
                variant="warning"
                style={{ marginLeft: "10px" }}
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </Button>
              <Button
                style={{
                  marginLeft: "10px",
                }}
                variant="success"
                onClick={() => {
                  setTeamId(item._id);
                  setModalShow(true);
                  setMembers(item.emails)
                  setEventName(item.eventName)
                }}
              >
                Submit Project{" "}
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
  }, []);
  const handleDelete = (teamId) =>{
      DELETE("/teams/" + teamId)
        .then((response) => {
          alert("Team successfully deleted");
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
          alert("Team deletion unsuccessful");
        });
  }
  return (
    <div>
      <Navbar userType={user.userType} />
      <h3 style={{ marginTop: "30px" }}> {user.name}'s Teams</h3>
        {loading === false ? card : null}
      <Modal show={modalShow} hidemodalcallback={hidemodal}  teamId={teamId} members = {members} eventName={eventName}/>
    </div>
  );
};

export default MyTeams;
