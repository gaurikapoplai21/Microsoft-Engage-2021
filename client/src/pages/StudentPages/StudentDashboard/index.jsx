import { useEffect, useState } from "react";
import { pageTitles } from "../../../constants/app";
import { GET } from "../../../config/api";
import { apiEndpoints } from "../../../constants/apiEndpoints";
import { Card, Row, Col, Button } from "react-bootstrap";
import Navbar from "../../../components/Navbar/TeacherNavbar";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";
import Profile from "../../Profile";
import "./StudentDashboard.module.css"

// helper functions
import { setWindowTitle } from "../../../utils/misc";

const StudentDashboard = () => {
  let history = useHistory();
  const user = useSelector(selectUser);

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
              style={{
                width: "20rem",
                marginTop: "3%",
                marginLeft: "7%",
                cursor: "pointer",
                marginBottom: "3%"
              }}
            >
              <Card.Header>Prof. {item.createdBy}</Card.Header>

              <Card.Body
                onClick={() => {
                  history.push("/event/student/" + item._id);
                }}
                style={{ cursor: "pointer" }}
              >
                <Card.Title>{item.eventName}</Card.Title>
                <Card.Text>{item.eventDescription}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button
                  style={{ display: "block", marginLeft: "25%" }}
                  variant="warning"
                  onClick={() =>
                    history.push(
                      "/register-team/" + item._id + "/" + item.eventName
                    )
                  }
                >
                  Register for Event
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
    <div >
      <Navbar userType="student" />
      {/* {user? <h2 style={{marginTop:"10px"}}>Hi {user.name}!</h2>:null} */}
      {user ? <Profile /> : null}
      <h3 style={heading}>Live Events</h3>

      <Row xs={1} md={3} className="g-4">
        {loading === false ? card : null}
      </Row>
    </div>
  );
};

export default StudentDashboard;
