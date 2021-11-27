import React from "react";
import Navbar from "../components/Navbar/TeacherNavbar";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { GET,DELETE } from "../config/api";
import { useEffect, useState } from "react";
import { Table,Button } from "react-bootstrap";
import {ExportReactCSV} from "./ExportReactCSV";

const MySchedulesTeacher = () => {

 const headers = [
   {label : "Scheduled Date", key:"startDate"},
   {label : "Presentation Time",key:"startTime"},
   {label: "Duration of Presentation", key:"duration"},
   {label: "Team Name", key:"teamName"},
   {label: "Names of Members", key:"names"},
   {label: "Emails", key:"emails"}
   
 ]
 const handleSchedule = (schedule) => {
   let cust = []
   Object.keys(schedule).map((d, key) => {
     cust.push(
       {startDate:schedule[d].startDate, startTime:schedule[d].startTime, duration:schedule[d].duration, teamName:schedule[d].teamName, names:schedule[d].names, emails:schedule[d].emails}
     )
     });
    return cust;
    console.log(cust)
 }
 const user = useSelector(selectUser);
 let [card, setCard] = useState([]);
 let [loading, setLoading] = useState(true);
 const handleDelete = (scheduleId) => {
      DELETE("/schedule/" + scheduleId)
        .then((response) => {
          alert("Schedule successfully deleted");
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
          alert("Schedule deletion unsuccessful");
        });
 }
 
 useEffect(() => {
   GET("/schedule/" + user.id)
     .then((res) => {
      
       let template = res.data.map((item, i) => (
         <div>
           <div style={{ marginBottom: "1%" }}>
             <h5 style={{ display: "inline-block" }}>{item.eventName}</h5>
             <Button
               variant="danger"
               style={{ display: "inline-block", marginLeft: "30%" }}
               onClick={() => handleDelete(item._id)}
             >
               Delete
             </Button>
             <div  style={{display:"inline-block", marginLeft:"1%"}}>
              
               <ExportReactCSV
                  csvData={handleSchedule(item.schedule)}
                  fileName={"Schedule-" + item.eventName}
                  headers={headers}
               />
             </div>
           </div>
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
     <Navbar userType={user.userType} />
     <br />
     <div style={{ marginLeft: "2%", marginRight: "2%" }}>
       {loading === false ? card : null}
     </div>
   </div>
 );
};

export default MySchedulesTeacher;
