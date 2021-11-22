import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GET } from "../config/api";
import { Table, Button, Badge } from "react-bootstrap";
import Navbar from "../components/Navbar/TeacherNavbar";
import Modal from "./ProjectEvaluate";

const EventTeamDetails = () => {
  const params = useParams();

  let [card, setCard] = useState([]);
  let [loading, setLoading] = useState(true);

  const [modalShow, setModalShow] = useState(false);
  const [teamId, setTeamId] = useState("")
  const [teamNames, setTeamNames] = useState([]);
  const [members, setMembers] = useState()
   const hidemodal = () => {
     setModalShow(false);
   };
 

  useEffect(() => {
    GET("/teams/event/" + params.id)
      .then((res) => {
        console.log(res)
        let template = res.data.map((item, i) => (
          <div>
            <Table
              striped
              bordered
              hover
              size="sm"
              responsive
              style={{ backgroundColor: "#E6E6FA" }}
            >
              <thead>
                <tr>
                  <th>Team Name</th>
                  <th>Names of members</th>
                  <th>Emails of Members</th>
                  <th>Project Title</th>
                  <th>Submission Link</th>
                  <th>Marks Scored</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{item.teamName}</td>
                  <td>
                    {item.names.map((member, i) => (
                      <div>
                        {" "}
                        {member} <br />{" "}
                      </div>
                    ))}
                  </td>
                  <td>
                    {item.emails.map((email, i) => (
                      <div>
                        {email} <br />
                      </div>
                    ))}
                  </td>

                  <td>{item.projectTitle}</td>
                  <td> {item.submissionLink}</td>
                  <td>
                    {item.marksScored.map((marks, i) => (
                      <div>
                        {marks} <br />
                      </div>
                    ))}
                  </td>
                </tr>
                {item.submissionLink === "" ? (
                  <Button variant="warning" style={{ cursor: "text" }}>
                    No Submission
                  </Button>
                ) : item.marksScored.length !== 0 ? (
                  <Button variant="success" style={{ cursor: "text" }}>
                    Project Evaluated
                  </Button>
                ) : (
                  <Button
                    style={{ marginBottom: "10px" }}
                    variant="primary"
                    onClick={() => {
                      setTeamNames(item.names);
                      setTeamId(item._id);
                      setModalShow(true);
                      setMembers(item.members)
                    }}
                  >
                    Evaluate Project{" "}
                  </Button>
                )}
              </tbody>
            </Table>
          </div>
          // <Col>
          //   <Card
          //     border="secondary"
          //     style={{
          //       marginTop: "3%",
          //       marginLeft: "10%",
          //       marginRight: "10%",
          //       backgroundColor: "#E6E6FA",
          //     }}
          //   >
          //     <Card.Header>Created on : {item.createdOn}</Card.Header>

          //     <Card.Body style={{ cursor: "pointer" }}>
          //       <Card.Title>{item.teamName}</Card.Title>
          //       <Card.Text>
          //         {item.names.map((member, i) => (
          //           <div>
          //             <br />

          //             <ListGroup horizontal style={{display:"block"}}>
          //               <ListGroup.Item>
          //                 {" "}
          //                 Name : {item.names[i]}
          //               </ListGroup.Item>
          //               <ListGroup.Item>
          //                 {" "}
          //                 Email : {item.emails[i]}
          //               </ListGroup.Item>

          //             </ListGroup>

          //           </div>
          //         ))}
          //       </Card.Text>
          //     </Card.Body>
          //     <Card.Footer>Created By : {item.createdBy}</Card.Footer>
          //   </Card>
          // </Col>
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
    marginBottom: "3%",
  };
  return (
    <div>
      <Navbar userType="teacher" />
      <h3 style={heading}>Registered Teams</h3>
      <div style={{ marginLeft: "2%", marginRight: "2%" }}>
        {loading === false ? card : null}
      </div>
      <Modal show={modalShow} hidemodalcallback={hidemodal} teamId={teamId} names={teamNames} members={members}/>
    </div>
  );
};

export default EventTeamDetails;
