import React from 'react'
import { useHistory, useParams } from "react-router-dom";
import {useState, useEffect} from 'react';
import { GET} from "../config/api";
import {Card,Row,Col,ListGroup} from "react-bootstrap"
import Navbar from "../components/Navbar/TeacherNavbar";




const EventTeamDetails = () => {
    const histroy = useHistory();
    const params = useParams();

    let [card, setCard] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
      GET("/teams/event/" + params.id)
        .then((res) => {
          console.log(res)
          let template = res.data.map((item, i) => (
            <Col>
              <Card
                border="secondary"
                style={{
                  marginTop: "3%",
                  marginLeft: "10%",
                  marginRight: "10%",
                  backgroundColor: "#E6E6FA",
                }}
              >
                <Card.Header>{item.createdOn}</Card.Header>

                <Card.Body style={{ cursor: "pointer" }}>
                  <Card.Title>{item.teamName}</Card.Title>
                  <Card.Text>
                    {item.members.map((member, i) => (
                      <div>
                        <br />
                       
                        <ListGroup horizontal style={{display:"block"}}>
                          <ListGroup.Item>
                            {" "}
                            Name : {item.names[i]}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            {" "}
                            Email : {item.emails[i]}
                          </ListGroup.Item>
                         
                        </ListGroup>
                      </div>
                    ))}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>{item.createdBy}</Card.Footer>
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
        Hello {params.id}
        <Navbar userType="teacher" />
        <h3 style={heading}>Registered Teams</h3>
        <Row xs={1} md={1} className="g-4">
          {loading === false ? card : null}
        </Row>
      </div>
    );
}

export default EventTeamDetails
