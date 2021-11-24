import React from 'react'
import {Modal,Form,Button} from 'react-bootstrap'
import {useState} from 'react'
import { POST, PATCH } from "../config/api";


const ProjectEvaluate = (props) => {
     const [marks, setMarks] = useState();

     const handleInput = (e) => {
       const field = e.target.name;
       const value = e.target.value;
       setMarks({ ...marks, [field]: value });
     };

     const handleSubmit = () => {

         const emailData = {
           "eventName" : props.eventName,
           "contacts" : props.emails
         }
         console.log(emailData)
         let res = Object.keys(marks).map((key) => marks[key]);
         const data = {
             "marksScored" : marks
         }
         const evaluateTeam = async () => {
            const response = await PATCH(
              "/teams/" + props.teamId + "/evaluate",
              data
            );
          };
          evaluateTeam()
            .then((response) => {
              console.log(response)
            })
            .catch((err) => {
              console.log(err);
              alert("Project evaluation unsuccessful");
            });

             const sendEmail = async () => {
               const response = await POST(
                 "/email/marksuploaded",
                 emailData
               );
             };
             sendEmail()
               .then((response) => {
                 alert("Project evaluation successful");
                 props.hidemodalcallback();
               })
               .catch((err) => {
                 console.log(err);
                 alert("Email reminder not successful");
               });

     }
    return (
      <div>
        <Modal show={props.show} onHide={props.hidemodalcallback}>
          <Modal.Header closeButton>
            <Modal.Title>Project Evaluation Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                <h5>Marks awarded</h5>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                {props.names.map((member, i) => (
                   <div> 
                  <Form.Label>{member}</Form.Label>
                  <Form.Control
                  type="text"
                  placeholder="Enter marks"
                  name={props.members[i]}
                  //value={"marks" + i}
                  onChange={handleInput}
                />
                </div>
                    
                ))}
                
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

export default ProjectEvaluate
