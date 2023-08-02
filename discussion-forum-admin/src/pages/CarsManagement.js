import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Box, Button, Grid, Modal, Stack, TextField  } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { toast } from 'react-hot-toast';
const CarsManagement = () => {
  const [open, setOpen] = useState(false)
  const [rowData, setRowData] = useState([
    {
      Name: "Tata", Mileage: 10, Transmission: "Automatic", Number: "AB12CD1234", Seats: 5, Type: "Sedan", Description: "...", Company: "Tata", Status: "Booked", Power: "64BHP", Pickup: "HYD"
    }
    
  ])
  const [modalData, setModalData] = useState({
    Name: "",
    Mileage: "",
    Transmission: "",
    Number: "",
    Seats: "",
    Type: "",
    Description: "",
    Company: "",
    Status: "",
    Power: "",
    Pickup: ""
  })

  const [type, setType] = useState("")
  const [updateClicked, setUpdateClicked] = useState(false)
  const [deleteClicked, setDeleteClicked] = useState(false)
  const [confirmClicked, setConfirmClicked] = useState(false)
  const [cancelClicked, setCancelClicked] = useState(false)

  const [columnDefs, setColumnDefs] = useState([
    { field: "Name", cellDataType: 'text' },
    { field: "Mileage", cellDataType: 'number' },
    { field: "Transmission", cellDataType: 'text' },
    { field: "Number", cellDataType: 'text' },
    { field: "Seats", cellDataType: 'number' },
    { field: "Type", cellDataType: 'text' },
    { field: "Description", cellDataType: 'text' },
    { field: "Company", cellDataType: 'text' },
    { field: "Status", cellDataType: 'text' },
    { field: "Power", cellDataType: 'number' },
    { field: "Pickup", cellDataType: 'text' },
  ])

  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true
  }

  const handleClick = (e) => {
    // console.log(e)
    setModalData(e.data)
    setType("edit")
    setOpen(true)
    console.log(modalData)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    overflow: "auto",
    p: 4,
    height: window.innerWidth < 480 ? "100%" : "auto",
    borderRadius:"8px"
  };

  const handleChange = (e) => {
    setModalData({ ...modalData, [e.target.name]: e.target.value })
    setUpdateClicked(false)
  }
  return (
    <div className="ag-theme-material" style={{ height: "70vh", width: "100%" }}>
      <h3>Post Management</h3>
      <Stack direction="row" justifyContent="end" sx={{mb:5}}>
        <Button endIcon={<Add />} color="success" variant='outlined' onClick={
          ()=>{
            setModalData({
              Name: "",
              Mileage: "",
              Transmission: "",
              Number: "",
              Seats: "",
              Type: "",
              Description: "",
              Company: "",
              Status: "",
              Power: "",
              Pickup: ""
            })
            setOpen(true)
            setType("create")
          }
        }>
          Add Car 
        </Button>
      </Stack>
      <AgGridReact
        pagination={true}
        paginationPageSize={10}
        rowData={rowData}
        animateRows={true}
        columnDefs={columnDefs}
        rowSelection='single'
        onRowClicked={handleClick}
        defaultColDef={defaultColDef}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack justifyContent="space-between" direction="row">
            {
              type === "edit" ? <h3>Update Car</h3> : <h3>Create Car</h3>
            }
            <Close onClick={handleClose} sx={{cursor:"pointer"}}/>
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="Name" name="Name" variant="outlined" value={modalData.Name} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="Mileage" name="Mileage" variant="outlined" value={modalData.Mileage} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="Transmission" name="Transmission" variant="outlined" value={modalData.Transmission} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="Number" name="Number" variant="outlined" value={modalData.Number} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="Seats" name="Seats" variant="outlined" value={modalData.Seats} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="Type" name="Type" variant="outlined" value={modalData.Type} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="Description" name="Description" variant="outlined" value={modalData.Description} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="Company" name="Company" variant="outlined" value={modalData.Company} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="Status" name="Status" variant="outlined" value={modalData.Status} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="Power" name="Power" variant="outlined" value={modalData.Power} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="Pickup" name="Pickup" variant="outlined" value={modalData.Pickup} onChange={handleChange} />
            </Grid>
          </Grid>
          <Stack justifyContent="center" alignItems="center">
            {
              type === "edit" && <Box sx={{ mt: 5 }}>
                {
                  deleteClicked ? <Button variant="outlined" color="error" sx={{ mr: 1 }}
                    onClick={
                      () => {
                        setDeleteClicked(false)
                        toast.success("Car has been successfully deleted!")
                        setOpen(false)
                      }
                    }

                  >Confirm Delete</Button> : <Button variant="outlined" color="error" sx={{ mr: 1 }} onClick={() => {
                    setDeleteClicked(true)
                  }}>Delete Car</Button>
                }
                {
                  updateClicked ? <Button variant="outlined" color="success"
                    onClick={
                      () => {
                        setOpen(false)
                        setUpdateClicked(false)
                        toast.success("Car has been successfully updated!")
                      }
                    }
                  >Confirm Update</Button> : <Button variant="outlined" color="success" onClick={() => {
                    setUpdateClicked(true)
                    setDeleteClicked(false)
                    

                  }}>Update Car</Button>
                }
              </Box>
            }
            {
              type==="create"&& <Box sx={{mt:5}}>
                {
                  cancelClicked?<Button variant="outlined" color='error' sx={{mr:1}}
                  onClick={
                    ()=>{
                      setModalData({})
                      setOpen(false)
                      setCancelClicked(false)
                    }
                  }
                  >Confirm Cancel</Button>:<Button variant="outlined" color='error' sx={{mr:1}} onClick={
                    ()=>{
                      setCancelClicked(true)
                    setConfirmClicked(false)
                    }
                  }>Cancel</Button>
                }
                {
                  confirmClicked? <Button variant='outlined' color='success' onClick={()=>{
                    setModalData({})
                    setOpen(false)
                    setConfirmClicked(false)
                    toast.success("Car has been added successfully!")
                  }}>Confirm Add</Button>:<Button variant='outlined' color='success'
                  onClick={
                    ()=>{
                      setConfirmClicked(true)
                      setCancelClicked(false)
                    }
                  }
                  >Add Car</Button>
                }
              </Box>
            }
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}

export default CarsManagement