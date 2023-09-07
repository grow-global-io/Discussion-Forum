import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/material";
import { fetchUsers, deleteUser, restrictUser, unrestrict } from "../app/api";
import { toast } from "react-hot-toast";

const UsersManagement = () => {
  async function fetchData() {
    const response = await fetchUsers();
    setRowData(response);
  }
  useEffect(() => {
    fetchData();
  }, []);
  const [rowData, setRowData] = useState([]);
  const handleAccept = (params) => {
    try {
      const response = restrictUser(params.id);
      console.log(response);
      toast.success(response.message);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };
  const handleReject = async (params) => {
    console.log(params);
    try {
      const response = await deleteUser(params.id);
      console.log(response);
      fetchData().then(()=>toast.success(response.message))
    } catch (e) {
      console.log(e);
    }
  };
  const handleUnrestrictUser = async (params) => {
    console.log(params);
    try {
      const response = await unrestrict(params.id);
      console.log(response);
      toast.success(response.message);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };
  // Dynamically style rows based on the isRestricted value
  const getRowStyle = (params) => {
    if (params.data.isRestricted) {
      return { backgroundColor: "#f5222d61" }; // Change to your desired style
    } else {
      return { backgroundColor: "#00800082" }; // Change to your desired style
    }
  };
  const [columnDefs, setColumnDefs] = useState([
    { field: "uid", cellDataType: "text", width: "300px" },
    { field: "displayName", cellDataType: "text" },
    { field: "email", cellDataType: "text", width: "300px" },
    {
      field: "Actions",
      sortable: false,
      floatingFilter: false,
      filter: false,
      cellRenderer: (params) => {
        return (
          <div>
            <Button
              variant="outlined"
              color="error"
              sx={{ mr: 2 }}
              onClick={() => handleAccept(params.data)}
            >
              Restrict
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleReject(params.data)}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              color="success"
              sx={{ ml: 2 }}
              onClick={() => handleUnrestrictUser(params.data)}
            >
              unrestrictUser
            </Button>
          </div>
        );
      },
      width: "500px",
    },
  ]);

  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
  };

  return (
    <div
      className="ag-theme-material"
      style={{ height: "81vh", width: "100%" }}
    >
      <h3>User Management</h3>

      <AgGridReact
        pagination={true}
        paginationPageSize={10}
        rowData={rowData}
        animateRows={true}
        columnDefs={columnDefs}
        rowSelection="single"
        defaultColDef={defaultColDef}
        getRowStyle={getRowStyle} // Apply row styles
      />
    </div>
  );
};

export default UsersManagement;
