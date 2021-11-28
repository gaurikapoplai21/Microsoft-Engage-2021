import React from 'react'
import Navbar from "../components/Navbar/TeacherNavbar";
import {useState,useEffect} from 'react'
import {useHistory,useParams} from 'react-router-dom'
import { GET, POST,DELETE } from "../config/api";
import { apiEndpoints } from "../constants/apiEndpoints";
import {Card,ListGroup,Table} from 'react-bootstrap'
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import {Button} from "react-bootstrap";
 



const EventDetails = () => {
    const params = useParams();
    let history = useHistory();
    const user = useSelector(selectUser);

    const deleteEvent = (eventId) => {
      const deleteEvent = async () => {
        const response = await DELETE(apiEndpoints.EVENTS + "/" + eventId);
      };
      deleteEvent().then((response) => {
         alert("Event successfully deleted");
          history.push("/teacher-dashboard");
      })
        .catch((err) => {
          console.log(err);
          alert("Event deletion not successful");
        });
     

      const deleteTeams = async () => {
        const response = await DELETE("/teams/" + eventId + "/delete");
      };
      deleteTeams()
        .then((response) => {})
        .catch((err) => {
          console.log(err);
          alert("Teams deletion not successful");
        });
    };;



    const [event, setEvent] = useState({
      eventName: "",
      eventDescription: "",
      minTeamSize: "",
      maxTeamSize: "",
      maxMarks: "",
      createdBy: user.name,
      createdOn: "",
      referenceLinks: [],
      registrationDeadline: "",
      submissionDeadline: ""

    });

    useEffect(() => {
      GET(apiEndpoints.EVENTS + "/" + params.id)
        .then((res) => {
            setEvent({
              eventName: res.data.eventName,
              eventDescription: res.data.eventDescription,
              minTeamSize: res.data.minTeamSize,
              maxTeamSize: res.data.maxTeamSize,
              maxMarks: res.data.maxMarks,
              createdBy: res.data.createdBy,
              createdOn: res.data.createdOn,
              referenceLinks: res.data.referenceLinks,
              registrationDeadline: res.data.registrationDeadline,
              submissionDeadline: res.data.submissionDeadline
            });
          
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    return (
      <div>
        <Navbar userType={params.userType} />
        <div>
        <h2 style={{ marginTop: "20px",display: "inline-block" }}> Event Details </h2>
        {(params.userType==="teacher")? 
        <> 
        <Button
          variant="warning"
          onClick={() => history.push("/edit-event/" + params.id)}
          style={{display:"inline-block",marginLeft:"30%"}}
        >
          Edit{" "}
        </Button>
        <Button
          variant="secondary"
          style={{ marginLeft: "10px" }}
          onClick={() => deleteEvent(params.id)}
        >
          Delete{" "}
        </Button>
        </>
        :null}
       
        </div>
        <br />
        <Card
          className="text-center"
          style={{
            marginLeft: "10%",
            marginRight: "10%",
            backgroundColor: "#E6E6FA",
            marginBottom: "30px",
          }}
        >
          <Card.Header>{event.createdOn}</Card.Header>
          <Card.Body>
            <Card.Title>{event.eventName}</Card.Title>
            <Card.Text>
              {event.eventDescription}
              <br />
              <br />
              {params.userType === "student" ? (
                <div>
                  <ListGroup.Item variant="light">
                    CreatedBy : Prof. {event.createdBy}
                  </ListGroup.Item>
                  <br />
                </div>
              ) : null}
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Registration Deadline</th>
                    <th>Submission Deadline</th>
                    <th>Minimum Team Size</th>
                    <th>Maximum Team Size</th>
                    <th>Maximum Marks</th>
                    <th>Reference Links</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{event.registrationDeadline.substring(0, 10)}</td>
                    <td>{event.submissionDeadline.substring(0, 10)}</td>
                    <td>{event.minTeamSize}</td>
                    <td>{event.maxTeamSize}</td>
                    <td>{event.maxMarks}</td>
                    <td>
                      {event.referenceLinks.map((item, i) => (
                        <div>
                          <a href={item}>{item} </a>
                          <br />
                        </div>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
}

export default EventDetails
