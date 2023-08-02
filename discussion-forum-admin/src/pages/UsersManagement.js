import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import {  Button,  } from '@mui/material';

const UsersManagement = () => {
    const [rowData, setRowData] = useState([
        {
            Name: "Tata", Mobile: 10, Aadhar: "Automatic", License: "AB12CD1234", KycStatus: 5,
        }
        ,
        {
            Name: "Tata", Mileage: 10, Transmission: "Automatic", Number: "AB12CD1234", Seats: 5, Type: "Sedan", Description: "...", Company: "Tata", Status: "Booked", Power: "64BHP", Pickup: "HYD"
        }
        ,
        {
            Name: "Tata", Mileage: 10, Transmission: "Automatic", Number: "AB12CD1234", Seats: 5, Type: "Sedan", Description: "...", Company: "Tata", Status: "Booked", Power: "64BHP", Pickup: "HYD"
        }
        ,
        {
            Name: "Tata", Mileage: 10, Transmission: "Automatic", Number: "AB12CD1234", Seats: 5, Type: "Sedan", Description: "...", Company: "Tata", Status: "Booked", Power: "64BHP", Pickup: "HYD"
        }
        ,
        {
            Name: "Tata", Mileage: 10, Transmission: "Automatic", Number: "AB12CD1234", Seats: 5, Type: "Sedan", Description: "...", Company: "Tata", Status: "Booked", Power: "64BHP", Pickup: "HYD"
        }
        ,
        {
            Name: "Tata", Mileage: 10, Transmission: "Automatic", Number: "AB12CD1234", Seats: 5, Type: "Sedan", Description: "...", Company: "Tata", Status: "Booked", Power: "64BHP", Pickup: "HYD"
        }

    ])
    

    const handleAccept = (params)=>{
        console.log(params)
    }
    const handleReject = (params)=>{
        console.log(params)
    }
    const [columnDefs, setColumnDefs] = useState([
        { field: "Name", cellDataType: 'text' },
        { field: "Mobile", cellDataType: 'number' },
        { field: "Aadhar", cellDataType: 'text' },
        { field: "License", cellDataType: 'text' },
        { headerName: "Kyc Status", field: "KycStatus", cellDataType: 'number' },
        { field: "Documents", cellDataType: 'text', sortable: false, floatingFilter: false, filter: false, },
        {
            field: "Actions", sortable: false, floatingFilter: false, filter: false, cellRenderer: params => {
                return (
                    <div>
                        <Button variant="outlined" color="success"sx={{mr:2}}  onClick={()=>handleAccept(params.data)}>Accept</Button>
                        <Button variant="outlined" color="error"  onClick={()=>handleReject(params.data)}>Reject</Button>
                    </div>
                )
            },
            width:"280px"
        }
    ])

    const defaultColDef = {
        sortable: true,
        filter: true,
        floatingFilter: true
    }



    return (
        <div className="ag-theme-material" style={{ height: "70vh", width: "100%" }}>
            <h3>User Management</h3>

            <AgGridReact
                pagination={true}
                paginationPageSize={10}
                rowData={rowData}
                animateRows={true}
                columnDefs={columnDefs}
                rowSelection='single'
                defaultColDef={defaultColDef}
            />

        </div>
    )
}

export default UsersManagement