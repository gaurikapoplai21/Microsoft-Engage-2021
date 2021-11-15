import {useEffect,useState} from 'react'
import {pageTitles} from '../../../constants/app'
import Button from "@mui/material/Button";
import CreateEvent from "../../CreateEventPage/index"
import { GET } from "../../../config/api";
import { apiEndpoints} from "../../../constants/apiEndpoints"
import {Card} from "react-bootstrap"


// helper functions
import {setWindowTitle} from '../../../utils/misc'
const TeacherDashboard = () => {
     useEffect(()=>{
        setWindowTitle(pageTitles.TEACHER_DASHBOARD)
    },[])
    let [card, setCard] = useState([]);
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        GET(apiEndpoints.EVENTS + "/all")
        .then((res) => {
          let template = res.data.map((item, i) => 
          
           <Card border="primary" style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>{item.eventName}</Card.Title>
      <Card.Text>
       {item.eventDescription}
      </Card.Text>
    </Card.Body>
  </Card>
          );

          setCard(template);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
     
    return (
      <div>
        {/* <h3>Events Created</h3>
        <Button variant="contained" >
          Create Event{" "}
        </Button> */}
        {/* <CreateEvent /> */}
        {loading === false ? card : null}
      </div>
    );
}

export default TeacherDashboard
