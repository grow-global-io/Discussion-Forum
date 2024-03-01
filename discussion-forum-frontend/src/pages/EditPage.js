import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { ThemeProvider, Remirror, useRemirror, Toolbar, ToggleBoldButton, ToggleItalicButton, ToggleUnderlineButton, ToggleStrikeButton, HeadingLevelButtonGroup, ListButtonGroup, CreateTableButton } from "@remirror/react";
import { htmlToProsemirrorNode, prosemirrorNodeToHtml } from "@remirror/core";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Backend_URL } from "../Constants/backend";
import toast from "react-hot-toast";
import axios from "axios";
import styles from "../styles/Create.module.css";
const EditPage = () => {
  const [modalData, setModalData] = useState({
    // Name: "",
    // Mileage: "",
    // Transmission: "",
    // Number: "",
    // Seats: "",
    gender: "",
    postDescription: "",
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
  });
  const genderOptions = [
    "Female",
    "Male",
    "Nonbinary",
    "Gender Nonconforming",
    "A Different Gender Identity",
  ];
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setModalData({ ...modalData, [e.target.name]: e.target.value });
  };
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    try {
      var compressedImage = await compressAndEncodeImage(file);

      setModalData({ ...modalData, ["cover-photo"]: compressedImage });
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };
  const { id } = useParams();
  useEffect(() => {
    fetch(Backend_URL + "post/get-data/" + id)
      .then((data) => data.json())
      .then((data) => {
        setModalData(data);

        const initialState = htmlToProsemirrorNode({
          schema: manager.schema,
          content: data.postDescription,
        });

        setState(initialState);
      });
  }, []);
  const navigate = useNavigate();
  const compressAndEncodeImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        var img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

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

          canvas.toBlob(
            (blob) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve(reader.result);
              };
              reader.onerror = (error) => {
                reject(error);
              };
              reader.readAsDataURL(blob);
            },
            "image/jpeg",
            0.8
          );
        };
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };
  const updatePost = async (id, data) => {
    try {
      const response = await axios.post(
        `${Backend_URL}post/update/${id}`,
        data
      );
      toast.success("Post Updated Successfully");
      return response.data;
    } catch (error) {
      console.error("Error updating post:", error);
      throw new Error("Error updating post");
    }
  };
  const handlePostUpdate = async (data) => {
    try {
      // api to update post
      await updatePost(data.id, data);
      // console.log(response)
      toast.success("Updated Successfully!");
      navigate("/");
    } catch (e) {
      // console.log(e)
      toast.error("Something went wrong");
    }
  };
  const { manager } = useRemirror();

  // Convert your HTML string to a ProseMirror node

  // Set up your component state
  const [state, setState] = useState(null);
  const [post, setPost] = useState("");

  return (
    <Paper sx={{ m: 5, p: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} lg={3}>
          <TextField
            fullWidth
            label="Composer Name"
            name="composerName"
            variant="outlined"
            value={modalData.composerName}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={4} lg={3}>
          <FormControl fullWidth>
            <InputLabel id="gender-label" color="secondary">
              Composer Gender
            </InputLabel>
            <Select
              // defaultValue={modalData.gender}
              value={modalData.gender}
              onChange={handleChange}
              labelId="gender-label"
              name="gender"
              id="gender"
              color="secondary"
              required
              label="Composer Gender"
            >
              {genderOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <TextField
            fullWidth
            label="Composer Website"
            name="composerWebsite"
            variant="outlined"
            value={modalData.composerWebsite}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <TextField
            fullWidth
            label="conductor"
            name="conductor"
            variant="outlined"
            value={modalData.conductor}
            onChange={handleChange}
          />
        </Grid>
        {/* <Grid item xs={12} sm={4} lg={3}>
          <TextField
            fullWidth
            label="Created Date"
            name="createdDate"
            variant="outlined"
            value={modalData.createdDate}
            onChange={handleChange}
          />
        </Grid> */}
        <Grid item xs={12} sm={4} lg={3}>
          <TextField
            fullWidth
            label="Deadline To Join Consortium"
            name="deadlineToJoinConsortium"
            variant="outlined"
            value={modalData.deadlineToJoinConsortium}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <TextField
            fullWidth
            label="Duration"
            name="duration"
            variant="outlined"
            value={modalData.duration}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <TextField
            fullWidth
            label="Funds Committed To Date"
            name="fundsCommittedToDate"
            variant="outlined"
            value={modalData.fundsCommittedToDate}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <TextField
            fullWidth
            label="Lead Commissioner"
            name="leadCommissioner"
            variant="outlined"
            value={modalData.leadCommissioner}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <TextField
            fullWidth
            label="Number Of Partners Sought"
            name="numberOfPartnersSought"
            variant="outlined"
            value={modalData.numberOfPartnersSought}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <TextField
            fullWidth
            label="Partners Committed To Date"
            name="partnersCommittedToDate"
            variant="outlined"
            value={modalData.partnersCommittedToDate}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <TextField
            fullWidth
            label="Performance Requirements"
            name="performanceRequirements"
            variant="outlined"
            value={modalData.performanceRequirements}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <TextField
            fullWidth
            label="Premiere Date"
            name="premiereDate"
            variant="outlined"
            value={modalData.premiereDate}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <TextField
            fullWidth
            label="Primary Contact"
            name="primaryContact"
            variant="outlined"
            value={modalData.primaryContact}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={4} lg={3}>
          <FormControl fullWidth>
            <InputLabel id="partnerFees">
              Consortium Partner Commission Fees
            </InputLabel>
            <Select
              labelId="partnerFees"
              label="Consortium Partner Commission Fees"
              name="rangeOfConsortiumPartnerCommissionFees"
              value={
                modalData.rangeOfConsortiumPartnerCommissionFees || "0-2499"
              }
              onChange={handleChange}
            >
              <MenuItem value={"0-2499"}>0-2499 </MenuItem>
              <MenuItem value={"2500-4999"}>2500-4999 </MenuItem>
              <MenuItem value={"5000-9999"}>5000-9999 </MenuItem>
              <MenuItem value={"10000 and above"}>10000 and above</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4} lg={3}>
          <TextField
            fullWidth
            label="Soloist"
            name="soloist"
            variant="outlined"
            value={modalData.soloist}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <FormControl fullWidth>
            <InputLabel id="totalCommissionFee">
              Total Commission Fee
            </InputLabel>
            <Select
              name="totalCommissionFee"
              id="totalCommissionFee"
              labelId="totalCommissionFee"
              label="Total Commission Fee"
              value={modalData.totalCommissionFee || "5000-9999"}
              onChange={handleChange}
              defaultValue={modalData.totalCommissionFee || "5000-9999"}
            >
              <MenuItem value={"5000-9999"}>5000-9999</MenuItem>
              <MenuItem value={"10000-14999"}>10000-14999</MenuItem>
              <MenuItem value={"15000-19999"}>15000-19999</MenuItem>
              <MenuItem value={"20000 and above"}>20000 and above</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {modalData.postDescription && (
          <Grid item xs={12}>
            <div className={styles.postDescription}>
              <InputLabel htmlFor="postDescription">
                Post Description
              </InputLabel>
              <input
                type="hidden"
                name="postDescription"
                value={post}
                required
              />
              <div className="remirror-theme" name="card" id="card">
                <ThemeProvider>
                  <Remirror
                    manager={manager}
                    initialContent={state}
                    onChange={(paramater) => {
                      console.log(prosemirrorNodeToHtml(paramater.state.doc));
                      setPost(prosemirrorNodeToHtml(paramater.state.doc));
                    }}
                    autoRender="start"
                  >
                    <Toolbar style={{ flexWrap: "wrap" }}>
                      <ToggleBoldButton />
                      <ToggleItalicButton />
                      <ToggleUnderlineButton />
                      <ToggleStrikeButton />
                      <HeadingLevelButtonGroup showAll />
                      <ListButtonGroup />
                      <CreateTableButton />
                    </Toolbar>
                  </Remirror>
                </ThemeProvider>
              </div>
            </div>
          </Grid>
        )}
        <Grid item xs={12} sm={4} lg={3}>
          <TextField
            fullWidth
            label="User Display Name"
            name="userDisplayName"
            variant="outlined"
            value={modalData.userDisplayName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <TextField
            fullWidth
            label="Representative Work Sample"
            name="representativeWorkSample"
            variant="outlined"
            value={modalData.representativeWorkSample}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          {
            // <TextField fullWidth label="Cover Photo" name="cover-photo" variant="outlined" value={modalData["cover-photo"]} onChange={handleChange} />
          }
          <label
            className="form-label btn text-white"
            style={{
              backgroundColor: "#EE9B00",
            }}
            htmlFor="coverPhoto"
          >
            Cover Photo
          </label>
          <input
            type="file"
            name="cover-photo"
            className=""
            id="coverPhoto"
            accept="image/x-png,image/gif,image/jpeg"
            onChange={(e) => handleImageUpload(e)}
            style={{ display: "none" }}
          />
          {modalData["cover-photo"] && (
            <img
              width={180}
              height={180}
              src={modalData["cover-photo"]}
              alt="cover"
              style={{ marginLeft: 50 }}
            />
          )}
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            color="success"
            onClick={() => {
              handlePostUpdate({ ...modalData, postDescription: post });
              toast.success("Post has been successfully updated!");
            }}
          >
            Confirm Update
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EditPage;
