import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import {  Button,  } from '@mui/material';
import { fetchUsers,deleteUser } from '../app/api';
import { toast } from 'react-hot-toast';

const UsersManagement = () => {

    async function fetchData() {
        const response = await fetchUsers();
        console.log(response);
        setRowData([]);
        setRowData(response);
      };
      useEffect(() => {
        
        fetchData();
      },[]);
    const [rowData, setRowData] = useState([
    ]);
    

    const handleAccept = (params)=>{
        console.log(params)
    }
    const handleReject = async (params)=>{
        console.log(params);
        try{
            const response = await deleteUser(params.id);
            console.log(response);
            toast.success(response.message);
            fetchData();
        }
        catch(e){
            console.log(e);
        }
    }
    const [columnDefs, setColumnDefs] = useState([
        { field: "uid", cellDataType: 'text',width:'300px' },
        { field: "displayName", cellDataType: 'text' },
        { field: "email", cellDataType: 'text',width:'300px' },
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
        <div className="ag-theme-material" style={{ height: "81vh", width: "100%" }}>
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