import React from "react";
import Navbar from "../components/Navbar/TeacherNavbar";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { GET } from "../config/api";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const MySchedules = () => {
  const user = useSelector(selectUser);
  let [card, setCard] = useState([]);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    GET("/schedule/all")
      .then((res) => {
        let template = res.data.map((item, i) => (
          <div>
            <h5 style={{marignBottom:"1%"}}>{item.eventName}</h5>
            <Table
              striped
              bordered
              hover
              responsive
              style={{ backgroundColor: "#E6E6FA" }}
            >
              <thead>
                <tr>
                  <th>Scheduled Date</th>
                  <th>Presentation Time</th>
                  <th> Duration of Presentation</th>
                  <th>Team Name</th>
                  <th>Names of Members</th>
                  <th>Emails</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(item.schedule).map((d, key) => (
                  <tr>
                    <td>{item.schedule[d].startDate}</td>
                    <td>{item.schedule[d].startTime}</td>
                    <td>{item.schedule[d].duration}</td>
                    <td>{item.schedule[d].teamName}</td>
                    <td>
                      {item.schedule[d].names.map((member, i) => (
                        <div>
                          {member}
                          <br />
                        </div>
                      ))}
                    </td>
                    <td>
                      {item.schedule[d].emails.map((email, i) => (
                        <div>
                          {email}
                          <br />
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
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
      <Navbar usertype={user.userType} />
      <br />
      <div style={{marginLeft:"2%", marginRight:"2%"}}>{loading === false ? card : null}</div>
    </div>
  );
};

export default MySchedules;
