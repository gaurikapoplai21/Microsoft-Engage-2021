import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GET,POST } from "../config/api";
import { Table, Button, Badge } from "react-bootstrap";
import Navbar from "../components/Navbar/TeacherNavbar";
import Modal from "./ProjectEvaluate";
import { ExportReactCSV } from "./ExportReactCSV";



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
  const [contacts, setContacts] = useState([])
  const [eventName, setEventName] = useState('')
  const [emails, setEmails] = useState()
 

  const handleEmail = () => {

    const data = {
      "eventName" : eventName,
      "contacts" : contacts
    }
    console.log(data)
     const sendEmail = async () => {
       const response = await POST("/email/initiatereminder", data);
     };
     sendEmail()
       .then((response) => {
         alert("Email reminder sent successfully");
       })
       .catch((err) => {
         console.log(err);
         alert("Email reminder not successful");
       });

  }

  const [res, setRes] = useState()

  useEffect(() => {
    GET("/teams/event/" + params.id)
      .then((res) => {
        setRes(res)
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
                  <td> <a href={item.submissionLink}>{item.submissionLink} </a></td>
                  <td>
                    {Object.keys(item.marksScored).map((key) => (
                      <div>
                        {item.marksScored[key]} <br />
                      </div>
                    ))}
                  </td>
                </tr>
                {item.submissionLink === "" ? (
                  <Button variant="warning" style={{ cursor: "text" }}>
                    {item.emails.map((email, i) =>
                      setContacts((oldArray) => [...oldArray, email])
                    )}
                    {setEventName(item.eventName)}
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
                      setEmails(item.emails);
                      setEventName(item.eventName);
                      setTeamId(item._id);
                      setModalShow(true);
                      setMembers(item.members);
                    }}
                  >
                    Evaluate Project{" "}
                  </Button>
                )}
              </tbody>
            </Table>
          </div>
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
      <Button
        variant="primary"
        style={{ marginLeft: "30%", cursor: "pointer" }}
        onClick={handleEmail}
      >
        Inititate Reminder
      </Button>
      <div style={{ marginLeft: "2%", marginRight: "2%" }}>
        {loading === false ? card : null}
      </div>
      <Modal
        show={modalShow}
        hidemodalcallback={hidemodal}
        teamId={teamId}
        names={teamNames}
        members={members}
        emails={emails}
        eventName={eventName}
      />
    </div>
  );
};

export default EventTeamDetails;
