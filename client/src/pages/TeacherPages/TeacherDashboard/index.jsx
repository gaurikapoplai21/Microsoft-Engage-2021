import { useEffect, useState } from "react";
import { pageTitles } from "../../../constants/app";
import CreateEvent from "../../CreateEventPage/index";
import { GET,DELETE } from "../../../config/api";
import { apiEndpoints } from "../../../constants/apiEndpoints";
import { Card, Row, Col,Button} from "react-bootstrap";
import Navbar from "../../../components/Navbar/TeacherNavbar";
import { useHistory } from "react-router-dom";

// helper functions
import { setWindowTitle } from "../../../utils/misc";

const TeacherDashboard = () => {
  let history = useHistory();

  const deleteEvent = (eventId) => {
     
     DELETE(apiEndpoints.EVENTS + "/" + eventId)
       .then((response) => {
         alert("Event successfully deleted");
         window.location.reload(false);

       })
       .catch((err) => {
         console.log(err)
         alert("Event deletion unsuccessful");
       });


  }

  useEffect(() => {
    setWindowTitle(pageTitles.TEACHER_DASHBOARD);
  }, []);
  let [card, setCard] = useState([]);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    GET(apiEndpoints.EVENTS + "/all")
      .then((res) => {
        let template = res.data.map((item, i) => (
          <Col>
            <Card
              border="secondary"
              style={{
                width: "18rem",
                marginTop: "30px",
                marginLeft: "50px",
                cursor: "pointer",
              }}
            >
              <Card.Header>{item.createdOn}</Card.Header>

              <Card.Body
                onClick={() => history.push("/event/teacher/" + item._id)}
              >
                <Card.Title>{item.eventName}</Card.Title>
                <Card.Text>{item.eventDescription}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="warning"
                  onClick={() => history.push("/edit-event/" + item._id)}
                >
                  Edit{" "}
                </Button>
                <Button
                  variant="secondary"
                  style={{ marginLeft: "10px" }}
                  onClick={() => deleteEvent(item._id)}
                >
                  Delete{" "}
                </Button>
              </Card.Footer>
              <Card.Footer>
                <Button
                  variant="primary"
                 
                  onClick={()=>history.push("/teams/teacher/" + item._id)}
                >
                  View Team Details{" "}
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ));

        setCard(template);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const heading = {
    marginTop: "30px",
    display: "inline-block",
  };
  const button = {
    display: "inline-block",
    marginLeft: "70%",
  };
  const handleCreateEvent = () => {
    history.push("/create-event");
  };
  return (
    <div>
      <Navbar userType="teacher"/>
      <h3 style={heading}>Events Created</h3>
      <Button variant="primary" style={button} onClick={handleCreateEvent}>
        Create Event{" "}
      </Button>
      <Row xs={1} md={3} className="g-4">
     
      {loading === false ? card : null}
     
      </Row>
    </div>
  );
};

export default TeacherDashboard;
