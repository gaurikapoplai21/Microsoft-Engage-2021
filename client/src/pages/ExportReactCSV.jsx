import React from 'react'

import { CSVLink } from "react-csv";
import Button from "react-bootstrap/Button";

export  const ExportReactCSV = ({ csvData, fileName,headers }) => {
  return (
    <Button variant="warning">
      <CSVLink data={csvData} filename={fileName} headers={headers}>
        Export
      </CSVLink>
    </Button>
  );
};
