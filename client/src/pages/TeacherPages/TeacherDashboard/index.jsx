import { useEffect, useState } from "react";
import { pageTitles } from "../../../constants/app";
import CreateEvent from "../../CreateEventPage/index";
import { GET,DELETE } from "../../../config/api";
import { apiEndpoints } from "../../../constants/apiEndpoints";
import { Card, Row, Col,Button} from "react-bootstrap";
import Navbar from "../../../components/Navbar/TeacherNavbar";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";
import Profile from "../../Profile"
import "./TeacherDashboard.module.css"

// helper functions
import { setWindowTitle } from "../../../utils/misc";

const TeacherDashboard = () => {
  let history = useHistory();
  const user = useSelector(selectUser);


  
  useEffect(() => {
    setWindowTitle(pageTitles.TEACHER_DASHBOARD);
  }, []);

  

  let [card, setCard] = useState([]);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    GET(apiEndpoints.EVENTS + "/teacher/" + user.id)
      .then((res) => {
        let template = res.data.map((item, i) => (
          <Col>
            <Card
              border="secondary"
              style={{
                width: "20rem",
                marginTop: "3%",
                marginLeft: "10%",
                marginBottom: "3%",
                cursor: "pointer",
                backgroundColor: "",
              }}
            >
              <Card.Header>Created On : {item.createdOn}</Card.Header>

              <Card.Body
                onClick={() => history.push("/event/teacher/" + item._id)}
              >
                <Card.Title>{item.eventName}</Card.Title>
                <Card.Text>{item.eventDescription}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="primary"
                  onClick={() => history.push("/teams/teacher/" + item._id)}
                >
                  View Team Details{" "}
                </Button>
              </Card.Footer>
              <Card.Footer>
                <Button
                  variant="success"
                  onClick={() =>
                    history.push(
                      "/scheduler/" + item._id + "/" + item.eventName
                    )
                  }
                >
                  Schedule Presentations
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
    marginTop: "3%",
    display: "inline-block",
  };
  const button = {
    display: "inline-block",
    marginLeft: "24%",
  };
  
  return (
    <div >
      <Navbar userType="teacher" />
      {/* {user? <h2 style={{marginTop:"10px"}}>Hi {user.name}!</h2>:null} */}
      {user ? <Profile /> : null}
      <div>
        <h3 style={heading}>Events Created</h3>
       
        <Row xs={1} md={3} className="g-4">
          {loading === false ? card : null}
        </Row>
      </div>
    </div>
  );
};

export default TeacherDashboard;
