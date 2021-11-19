import React from 'react'
import { useHistory, useParams } from "react-router-dom";
import {useState, useEffect} from 'react';
import { GET} from "../config/api";


const EventTeamDetails = () => {
    const params = useParams();

    useEffect(() => {
      GET("/teams/event/" + params.id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    
    return (
        <div>
            Hello {params.id}
           


    </div>
    )
}

export default EventTeamDetails
