import React from 'react'
import Navbar from "../components/Navbar/TeacherNavbar";
import {useState,useEffect} from 'react'
import {useHistory,useParams} from 'react-router-dom'
import { GET, POST } from "../config/api";
import { apiEndpoints } from "../constants/apiEndpoints";
import {Card,ListGroup} from 'react-bootstrap'
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
 



const EventDetails = () => {
    const params = useParams();
    let history = useHistory();
    const user = useSelector(selectUser);


    const [event, setEvent] = useState({
      eventName: "",
      eventDescription: "",
      minTeamSize: "",
      maxTeamSize: "",
      maxMarks: "",
      createdBy: user.name,
      createdOn: "",
      uploadedFiles: "",
      referenceLinks: "",
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
              uploadedFiles: res.data.uploadedFiles,
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
        <Navbar userType={params.userType}/>
        <h2 style={{ marginTop: "20px" }}> Event Details </h2>
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
              {params.userType==="student"? <div><ListGroup.Item variant="light">
                Professor :{" "}
                {event.createdBy}
              </ListGroup.Item><br /></div> : null}
              <ListGroup.Item variant="light">
                Registration Deadline :{" "}
                {event.registrationDeadline.substring(0, 10)}
              </ListGroup.Item>
              <br />
              <ListGroup.Item variant="light">
                Submission Deadline :{" "}
                {event.submissionDeadline.substring(0, 10)}
              </ListGroup.Item>
              <br />
              <ListGroup.Item variant="light">
                Mininmum Team Size : {event.minTeamSize}
              </ListGroup.Item>
              <br />
              <ListGroup.Item variant="light">
                Maximum Team Size : {event.maxTeamSize}
              </ListGroup.Item>
              <br />
              <ListGroup.Item variant="light">
                Maximum Marks : {event.maxMarks}
              </ListGroup.Item>
              <br />
              <ListGroup.Item variant="light">
                Reference Links : {event.referenceLinks}
              </ListGroup.Item>
              <br />
              <ListGroup.Item variant="light">
                Uploaded Files : {event.uploadedFiles}
              </ListGroup.Item>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
}

export default EventDetails
