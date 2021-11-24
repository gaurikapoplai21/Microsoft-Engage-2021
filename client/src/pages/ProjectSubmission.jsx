import React from 'react'
import {Modal, Button,Form} from 'react-bootstrap'
import {useState} from 'react'
import { PATCH,POST } from "../config/api";


const ProjectSubmission = (props) => {
    let re = new RegExp("((git|ssh|http(s)?)|(git@[\w.-]+))(:(//)?)([\w.@\:/~-]+)(\.git)(/)?");

    const handleSubmit = () =>{
        
        const data = {...submission}
        const emailData = {
          "contacts" : props.members,
          "eventName" : props.eventName
        }
        console.log(data)
        if(re.test(data.submissionLink))
        {
          const editTeam = async () => {
            const response = await PATCH(
              "/teams/" + props.teamId + "/submit",
              data
            );
          };
          editTeam()
            .then((response) => {
              
            })
            .catch((err) => {
              console.log(err);
              alert("Project submission unsuccessful");
            });

            const sendEmail = async () => {
              const response = await POST("/email/submissionreceived", emailData);
            };
            sendEmail()
              .then((response) => {
                alert("Project submission successful");
                props.hidemodalcallback();
              })
              .catch((err) => {
                console.log(err);
                alert("Email reminder not successful");
              });

          setSubmission({
            projectTitle: "",
            submissionLink: "",
          });

        }
        else
        {
          alert("Enter a valid GitHub link")
        }
        
          

    }
    const [submission, setSubmission] = useState({
        projectTitle : "",
        submissionLink: ""

    })

     const handleInput = (e) => {
       const field = e.target.name;
       const value = e.target.value;
       setSubmission({ ...submission, [field]: value });
     };
   
    return (
      <div>
        <Modal show={props.show} onHide={props.hidemodalcallback}>
          <Modal.Header closeButton>
            <Modal.Title>Project Submission Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Project Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Project Title"
                  name="projectTitle"
                  value={submission.projectTitle}
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Github Link</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Enter GitHub Link of repository"
                  name="submissionLink"
                  value={submission.submissionLink}
                  onChange={handleInput}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.hidemodalcallback}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Submit Project
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
}

export default ProjectSubmission
