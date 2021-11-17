import { useEffect, useState } from "react";
import { pageTitles } from "../../../constants/app";
import CreateEvent from "../../CreateEventPage/index";
import { GET, DELETE } from "../../../config/api";
import { apiEndpoints } from "../../../constants/apiEndpoints";
import { Card, Row, Col, Button } from "react-bootstrap";
import Navbar from "../../../components/Navbar/TeacherNavbar";
import { useHistory } from "react-router-dom";

// helper functions
import { setWindowTitle } from "../../../utils/misc";
const StudentDashboard = () => {
  let history = useHistory();

  

  useEffect(() => {
    setWindowTitle(pageTitles.STUDENT_DASHBOARD);
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
              style={{ width: "18rem", marginTop: "30px", marginLeft: "50px" }}
            >
              <Card.Header>Prof.  {item.createdBy}</Card.Header>

              <Card.Body>
                <Card.Title>{item.eventName}</Card.Title>
                <Card.Text>{item.eventDescription}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button variant="warning">Register </Button>
                <Button
                  variant="secondary"
                  style={{ marginLeft: "10px" }}
                >
                  Submit{" "}
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
 
  return (
    <div>
      <Navbar userType="student"/>
      <h3 style={heading}>Live Events</h3>
     
      <Row xs={1} md={3} className="g-4">
        {loading === false ? card : null}
      </Row>
    </div>
  );
};

export default StudentDashboard;
