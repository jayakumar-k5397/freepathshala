import React, {useState,useEffect,useContext} from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { ProjectSettings } from '../ProjectSettingsContext';

export default function Dashboard() {

     // Row Data: The data to be displayed.
     const [rowData, setRowData] = useState([]  );
     const settings = useContext(ProjectSettings);

      useEffect(() => {
        axios.get(`http://${settings.env==="dev"?settings.ipAddr:'localhost'}:3000/pickupSchedules`)
          .then((response) => {
            console.log(response.data);
            setRowData(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, [settings.env,settings.ipAddr]);



  
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState([
    { field: "name" },
    { field: "phone" },
    { field: "mail" },
    { field: "pickupDate" },
    { field: "address" },
    { field: "message" }, 
    { field: "status" }, 
    { field: "gpsAddress" },
    { field: "location" }  ]);

  return (
    <div className='p-3' style={{color: "white"}}>
    <h2>Dashboard</h2>

    <div
    className="ag-theme-quartz m-3" // applying the Data Grid theme
    style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
    <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
    />
    </div>
  </div>
  )
}
