import Navbar from "../components/Navbar/TeacherNavbar";
import React from "react";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GET, DELETE } from "../config/api";
import {Table,Button} from "react-bootstrap"


const MySubmissions = () => {
   const user = useSelector(selectUser);
   let [card, setCard] = useState([]);
   let [loading, setLoading] = useState(true);
useEffect(() => {
  GET("/teams/user/" + user.id)
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
                <th>Event Name</th>
                <th>Team Name</th>
                <th>Project Title</th>
                <th>Submission Link</th>
                <th>Submitted On</th>
                <th>Marks Scored</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{item.eventName}</td>
                <td>{item.teamName}</td>
                <td>{item.projectTitle}</td>

                <td>{item.submissionLink}</td>
                <td>{item.submittedOn}</td>
                <td>{item.marksScored[user.id]}</td>
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
                <Button variant="primary" style={{ cursor: "text" }}>
                  Project Not Evaluated
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
  return (
    <div>
      <Navbar userType={user.userType} />
      <br />
      <br />
      <div style={{ marginLeft: "2%", marginRight: "2%" }}>
        {loading === false ? card : null}
      </div>
    </div>
  );
};

export default MySubmissions;
