import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Box, Button, Grid, Modal, Stack, TextField  } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import { fetchPosts,updatePost,deletePost } from '../app/api';
const CarsManagement = () => {
  const [posts, setPosts] = useState([]);
  // useEffect(async () => {
  //   try{
  //     const response = await fetchPosts();
  //     console.log(response);
  //     // setPosts(response);
  //     // setRowData(response);
  //   }
  //   catch(e){
  //     console.log(e);
  //   }

  // }, []);
  async function fetchData() {
    const response = await fetchPosts();
    console.log(response);
    setPosts(response);
    setRowData([]);
    setRowData(response);
  };
  useEffect(() => {
    
    fetchData();
  },[]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false)
  const [rowData, setRowData] = useState([
    // {
    //   Name: "Tata", Mileage: 10, Transmission: "Automatic", Number: "AB12CD1234", Seats: 5, Type: "Sedan", Description: "...", Company: "Tata", Status: "Booked", Power: "64BHP", Pickup: "HYD"
    // }
    
  ])
  const [modalData, setModalData] = useState({
    // Name: "",
    // Mileage: "",
    // Transmission: "",
    // Number: "",
    // Seats: "",
    // Type: "",
    // Description: "",
    // Company: "",
    // Status: "",
    // Power: "",
    // Pickup: ""
    composerName: "",
    composerWebsite: "",
    conductor: "",
    // cover-photo: "",
    createdDate: "",
    deadlineToJoinConsortium: "",
    duration: "",
    fundsCommittedToDate: "",
    leadCommissioner: "",
    numberOfPartnersSought: "",
    partnersCommittedToDate: "",
    performanceRequirements: "",
    premiereDate: "",
    projectDescription: "",
    projectTitle: "",
    projectType: "",
    projectWebsite: "",
    status: "",
    submissionDeadline: "",
    submissionRequirements: "",
    technicalRequirements: "",
    workDescription: "",
    workTitle: "",
    workType: "",
    userDisplayName: "",
    representativeWorkSample: "",
    soloist: "",
    totalCommissionFee: "",
    rangeOfConsortiumPartnerCommissionFees: "",
    primaryContact: "",
    primaryContactEmail: "",
    coverphoto: "",

  })

  const [type, setType] = useState("")
  const [updateClicked, setUpdateClicked] = useState(false)
  const [deleteClicked, setDeleteClicked] = useState(false)
  const [confirmClicked, setConfirmClicked] = useState(false)
  const [cancelClicked, setCancelClicked] = useState(false)

  const [columnDefs, setColumnDefs] = useState([
    { field: "composerName", cellDataType: 'text' },
    { field: "composerWebsite", cellDataType: 'text' },
    { field: "conductor", cellDataType: 'text' },
    // { field: "cover-photo", cellDataType: 'link' },
    { field: "createdDate", cellDataType: 'text' },
    { field: "deadlineToJoinConsortium", cellDataType: 'text' },
    { field: "duration", cellDataType: 'text' },
    { field: "fundsCommittedToDate", cellDataType: 'text' },
    { field: "leadCommissioner", cellDataType: 'text' },
    { field: "numberOfPartnersSought", cellDataType: 'text' },
    { field: "partnersCommittedToDate", cellDataType: 'text' },
    { field: "performanceRequirements", cellDataType: 'text' },
    { field: "premiereDate", cellDataType: 'text' },
    { field: "primaryContact", cellDataType: 'text' },
    { field: "rangeOfConsortiumPartnerCommissionFees", cellDataType: 'text' },
    { field: "representativeWorkSample", cellDataType: 'text' },
    { field: "soloist", cellDataType: 'text' },
    { field: "totalCommissionFee", cellDataType: 'text' },
    { field: "userDisplayName", cellDataType: 'text' },
    { field: "representativeWorkSample", cellDataType: 'text' },
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
    console.log(modalData);
    // console.log(modalData["cover-photo"]);
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
  const handlePostUpdate = async (data) => {
    console.log('data ',data)
    console.log('id',data.id)
    setUpdateClicked(true)
    try {
      // api to update post
      const response = await updatePost(data.id,data);
      console.log(response)
      fetchData();
      toast.success("Post Updated Successfully")
      setOpen(false)
    }
    catch (e) {
      console.log(e)
      toast.error("Something went wrong")
    }
  }
  const handlePostDelete = async (data) => {
    // console.log('data ',data)
    console.log('id',data.id)
    setUpdateClicked(true)
    try {
      // api to delete post
      const response = await deletePost(data.id);
      toast.dismiss();
      toast.success("Post deleted Successfully")
      console.log(response)
      fetchData();
      setOpen(false)
    }
    catch (e) {
      console.log(e)
      toast.error("Something went wrong")
    }
  }
  const handleFileChange = (e) => {
    console.log(e.target.files[0])
    // setModalData({ ...modalData, [e.target.name]: e.target.files[0] })
    // setUpdateClicked(false)
  }
  const compressAndEncodeImage = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            var img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                const maxWidth = 500;
                const maxHeight = 500;

                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve(reader.result);
                    };
                    reader.onerror = (error) => {
                        reject(error);
                    };
                    reader.readAsDataURL(blob);
                }, 'image/jpeg', 0.8);
            };
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
};
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    try {
        var compressedImage = await compressAndEncodeImage(file);
        // Send the compressed image to the backend
        console.log('before',modalData['cover-photo'])
        setModalData({ ...modalData, ['cover-photo']: compressedImage })
        // setModalData({ ...modalData, ['coverPhoto']: file.name })
        console.log('after',modalData['cover-photo']);
        // console.log(compressedImage)
    } catch (error) {
        console.error('Error compressing image:', error);
    }
};
  return (
    <div className="ag-theme-material" style={{ height: "80vh", width: "100%" }}>
      <h3>Post Management</h3>
      {
      //   <Stack className='m-0' direction="row" justifyContent="end" sx={{mb:5}}>
      //   <Button endIcon={<Add />} color="success" variant='outlined' onClick={
      //     ()=>{
      //       setModalData({
      //         Name: "",
      //         Mileage: "",
      //         Transmission: "",
      //         Number: "",
      //         Seats: "",
      //         Type: "",
      //         Description: "",
      //         Company: "",
      //         Status: "",
      //         Power: "",
      //         Pickup: ""

      //       })
      //       setOpen(true)
      //       setType("create")
      //     }
      //   }>
      //     Add Post 
      //   </Button>
      // </Stack>
      }
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
              type === "edit" ? <h3>Update Post</h3> : <h3>Create Post</h3>
            }
            <Close onClick={handleClose} sx={{cursor:"pointer"}}/>
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="composerName" name="composerName" variant="outlined" value={modalData.composerName} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="composerWebsite" name="composerWebsite" variant="outlined" value={modalData.composerWebsite} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="conductor" name="conductor" variant="outlined" value={modalData.conductor} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="createdDate" name="createdDate" variant="outlined" value={modalData.createdDate} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="deadlineToJoinConsortium" name="deadlineToJoinConsortium" variant="outlined" value={modalData.deadlineToJoinConsortium} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="duration" name="duration" variant="outlined" value={modalData.duration} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="fundsCommittedToDate" name="fundsCommittedToDate" variant="outlined" value={modalData.fundsCommittedToDate} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="leadCommissioner" name="leadCommissioner" variant="outlined" value={modalData.leadCommissioner} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="numberOfPartnersSought" name="numberOfPartnersSought" variant="outlined" value={modalData.numberOfPartnersSought} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="partnersCommittedToDate" name="partnersCommittedToDate" variant="outlined" value={modalData.partnersCommittedToDate} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="performanceRequirements" name="performanceRequirements" variant="outlined" value={modalData.performanceRequirements} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="premiereDate" name="premiereDate" variant="outlined" value={modalData.premiereDate} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="primaryContact" name="primaryContact" variant="outlined" value={modalData.primaryContact} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="rangeOfConsortiumPartnerCommissionFees" name="rangeOfConsortiumPartnerCommissionFees" variant="outlined" value={modalData.rangeOfConsortiumPartnerCommissionFees} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="representativeWorkSample" name="representativeWorkSample" variant="outlined" value={modalData.representativeWorkSample} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="soloist" name="soloist" variant="outlined" value={modalData.soloist} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="totalCommissionFee" name="totalCommissionFee" variant="outlined" value={modalData.totalCommissionFee} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="userDisplayName" name="userDisplayName" variant="outlined" value={modalData.userDisplayName} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <TextField fullWidth label="representativeWorkSample" name="representativeWorkSample" variant="outlined" value={modalData.representativeWorkSample} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              {
                // <TextField fullWidth label="Cover Photo" name="cover-photo" variant="outlined" value={modalData["cover-photo"]} onChange={handleChange} />
              }
              <label className='form-label'  htmlFor="coverPhoto">Cover Photo<input type="file" name="cover-photo" className='' id="cover-photo" accept="image/x-png,image/gif,image/jpeg" onChange={(e) => handleImageUpload(e)} /></label>
              {
                modalData["cover-photo"] && <img width={180} height={180} src={modalData["cover-photo"]} alt="cover"  />
              }
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
                        toast.loading("deleting the post!")
                        handlePostDelete(modalData);
                        setOpen(false)
                      }
                    }

                  >Confirm Delete</Button> : <Button variant="outlined" color="error" sx={{ mr: 1 }} onClick={() => {
                    setDeleteClicked(true)
                  }}>Delete Post</Button>
                }
                {
                  updateClicked ? <Button variant="outlined" color="success"
                    onClick={
                      () => {
                        setOpen(false)
                        setUpdateClicked(false)
                        handlePostUpdate(modalData)
                        toast.success("Post has been successfully updated!")
                      }
                    }
                  >Confirm Update</Button> : <Button variant="outlined" color="success" onClick={() => {
                    setUpdateClicked(true)
                    setDeleteClicked(false)
                    
                    
                  }}>Update Post</Button>
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