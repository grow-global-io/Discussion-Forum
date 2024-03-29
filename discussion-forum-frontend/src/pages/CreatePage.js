import {
  Box,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  CreateTableButton,
  HeadingLevelButtonGroup,
  ListButtonGroup,
  Remirror,
  ThemeProvider,
  ToggleBoldButton,
  ToggleItalicButton,
  ToggleStrikeButton,
  ToggleUnderlineButton,
  Toolbar,
  useRemirror,
} from "@remirror/react";
import { MuiChipsInput } from "mui-chips-input";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Form, Link, redirect } from "react-router-dom";
import { htmlToProsemirrorNode, prosemirrorNodeToHtml } from "remirror";
import {
  BoldExtension,
  BulletListExtension,
  CalloutExtension,
  DropCursorExtension,
  HardBreakExtension,
  HeadingExtension,
  ImageExtension,
  ItalicExtension,
  LinkExtension,
  OrderedListExtension,
  StrikeExtension,
  TableExtension,
  TaskListExtension,
  UnderlineExtension,
} from "remirror/extensions";
import "remirror/styles/all.css";
import { Backend_URL } from "../Constants/backend";
import styles from "../styles/Create.module.css";

var CoverPhoto;
var ChipArr = [];

export async function createAction({ request }) {
  const data = await request.formData();
  const { ...values } = Object.fromEntries(data);
  // values["userInfo"] = user
  // const tags = values["tags"].split(" ");
  values["tags"] = ChipArr;
  values["comments"] = [];
  values["likedBy"] = [];
  values["cover-photo"] = CoverPhoto;
  values["userConfirmation"] = true;
  //Tatz
  if (values["composerWebsite"].substring(0, 4).toLowerCase() != "http") {
    values["composerWebsite"] = "http://" + values["composerWebsite"];
  }
  if (
    values["representativeWorkSample"].substring(0, 4).toLowerCase() != "http"
  ) {
    values["representativeWorkSample"] =
      "http://" + values["representativeWorkSample"];
  }

  await fetch(Backend_URL + "post/create", {
    method: "POST",
    body: JSON.stringify(values),
  });
  return redirect("/home");
}

const CreatePage = () => {
  const [tagArr, setTagArr] = useState([]);
  const [userConfirmation, setUserConfirmation] = useState(false);
  const user = useSelector((state) => state.auth.userInfo);
  const [coverImage, setCoverImage] = useState("");
  const [post, setPost] = useState("");
  const [ethnicity, setEthnicity] = useState([]);
  const ethnicityOptions = [
    "American Indian or Alaska Native",
    "Asian",
    "Black or African American",
    "Hispanic or Latine",
    "Native Hawaiian or Other Pacific Islander",
    "White",
  ];
  const genderOptions = [
    "Female",
    "Male",
    "Nonbinary",
    "Gender Nonconforming",
    "A Different Gender Identity",
  ];

  const { manager, state } = useRemirror({
    extensions: () => [
      new BoldExtension(),
      new ItalicExtension(),
      new CalloutExtension({ defaultType: "warn" }),
      new LinkExtension({ autoLink: true }),
      new UnderlineExtension(),
      new StrikeExtension(),
      new HeadingExtension(),
      new DropCursorExtension(),
      new ImageExtension(),
      new BulletListExtension(),
      new OrderedListExtension(),
      new TaskListExtension(),
      new HardBreakExtension(),
      new TableExtension(),
    ],
    content: "",
    stringHandler: htmlToProsemirrorNode,
  });

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    try {
      var compressedImage = await compressAndEncodeImage(file);
      // Send the compressed image to the backend
      sendToBackend(compressedImage);
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };
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

  const sendToBackend = (compressedImage) => {
    // Send the compressed image to the backend
    // Implement your API call or data submission logic here
    setCoverImage(compressedImage);
    CoverPhoto = compressedImage;
  };

  return (
    <Container>
      <div className={styles.createWrapper}>
        <Form className={styles.create} method="post">
          <input type="hidden" name="userId" defaultValue={user.uid} />
          <input
            type="hidden"
            name="userDisplayName"
            defaultValue={user.displayName}
          />
          <input
            type="hidden"
            name="userProfilePhoto"
            defaultValue={user.photoURL}
          />
          <div>
            <TextField
              name="composerName"
              color="secondary"
              required
              id="composerName"
              label="Composer Name"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <TextField
              name="composerWebsite"
              color="secondary"
              id="composerWebsite"
              label="Composer Website"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <TextField
              name="representativeWorkSample"
              color="secondary"
              id="representativeWorkSample"
              label="Representative Work Sample"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <TextField
              name="leadCommissioner"
              color="secondary"
              id="leadCommissioner"
              label="Lead Commissioner"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <TextField
              name="primaryContact"
              color="secondary"
              id="primaryContact"
              label="Primary Contact/Email"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <TextField
              type="date"
              color="secondary"
              name="premiereDate"
              id="premiereDate"
              label="Premiere Date"
              InputLabelProps={{ shrink: true, required: true }}
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            {/* <TextField
              type="number"
              name="totalCommissionFee"
              color="secondary"
              id="totalCommissionFee"
              label="Total Commission Fee"
              variant="outlined"
              style={{ width: "100%" }}
            /> */}
            <FormControl fullWidth>
              <InputLabel id="totalCommissionFee">
                Total Commission Fee
              </InputLabel>
              <Select
                name="totalCommissionFee"
                id="totalCommissionFee"
                labelId="totalCommissionFee"
                label="Total Commission Fee"
              >
                <MenuItem value={"5000-9999"}>5000-9999</MenuItem>
                <MenuItem value={"10000-14999"}>10000-14999</MenuItem>
                <MenuItem value={"15000-19999"}>15000-19999</MenuItem>
                <MenuItem value={"20000 and above"}>20000 and above</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel id="fundingStatus-label" color="secondary">
                Funding Status
              </InputLabel>
              <Select
                labelId="fundingStatus-label"
                color="secondary"
                required
                name="fundingStatus"
                id="fundingStatus"
                label="Funding Status"
                defaultValue="seekingFunding"
              >
                <MenuItem value="Seeking Funding">Seeking Funding</MenuItem>
                <MenuItem value="Partially Funded">Partially Funded</MenuItem>
                <MenuItem value="Fully Funded">Fully Funded</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <TextField
              type="number"
              name="numberOfPartnersSought"
              color="secondary"
              id="numberOfPartnersSought"
              label="Number of Partners Sought"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <TextField
              type="number"
              name="fundsCommittedToDate"
              color="secondary"
              id="fundsCommittedToDate"
              label="Funds Committed to Date"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <TextField
              type="date"
              name="deadlineToJoinConsortium"
              color="secondary"
              id="deadlineToJoinConsortium"
              label="Deadline to Join Consortium"
              variant="outlined"
              InputLabelProps={{ shrink: true, required: true }}
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <TextField
              type="number"
              name="partnersCommittedToDate"
              color="secondary"
              id="partnersCommittedToDate"
              label="Partners Committed to Date"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel id="partnerFees">
                Consortium Partner Commission Fees
              </InputLabel>
              <Select
                labelId="partnerFees"
                label="Consortium Partner Commission Fees"
                name="rangeOfConsortiumPartnerCommissionFees"
              >
                <MenuItem value={"0-2499"}>0-2499 </MenuItem>
                <MenuItem value={"2500-4999"}>2500-4999 </MenuItem>
                <MenuItem value={"5000-9999"}>5000-9999 </MenuItem>
                <MenuItem value={"10000 and above"}>10000 and above</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <TextField
              name="duration"
              color="secondary"
              id="duration"
              label="Duration"
              variant="outlined"
              InputLabelProps={{ shrink: true, required: true }}
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel id="instrumentation-label" color="secondary">
                Instrumentation
              </InputLabel>
              <Select
                labelId="instrumentation-label"
                name="instrumentation"
                id="instrumentation"
                color="secondary"
                required
                label="Instrumentation"
                defaultValue="fixed"
              >
                <MenuItem value="Fixed">Fixed</MenuItem>
                <MenuItem value="Flexible">Flexible</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <TextField
              name="conductor"
              color="secondary"
              id="conductor"
              label="Conductor"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <TextField
              name="soloist"
              color="secondary"
              id="soloist"
              label="Soloist"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          {/* <div>
            <MuiChipsInput
              color="secondary"
              placeholder="Enter Tag, Press enter"
              value={tagArr}
              onChange={(e) => {
                setTagArr(e);
                ChipArr = e;
              }}
            />
            {/* <TextField name='tags' color='secondary' required id="tags" label="Post Tags" variant="outlined" style={{width: '100%'}} placeholder='new band guitarist' /> 
          </div> 
          */}
          <div>
            <FormControl fullWidth>
              <InputLabel color="secondary" id="demo-multiple-name-label">
                Composer Race/Ethnicity
              </InputLabel>
              <Select
                color="secondary"
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                label="Composer Race/Ethnicity"
                value={ethnicity}
                onChange={(e) => setEthnicity(e.target.value)}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip color="secondary" key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {ethnicityOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <input
              type="hidden"
              name="ethnicity"
              id="ethnicity"
              value={ethnicity}
            />
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel id="gender-label" color="secondary">
                Composer Gender
              </InputLabel>
              <Select
                defaultValue=""
                labelId="gender-label"
                name="gender"
                id="gender"
                color="secondary"
                label="Composer Gender"
              >
                {genderOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={styles.checkboxContainer}>
            <label>
              <input
                name="publicPosting"
                id="publicPosting"
                type="checkbox"
                className={styles.checkboxInput}
              />
              <span className={styles.checkboxText}>
                If demographic data has been provided, I confirm that the
                composer has approved these details for public posting
              </span>
            </label>
          </div>
          <div className={styles.performanceRequirements}>
            <TextField
              name="performanceRequirements"
              color="secondary"
              id="performanceRequirements"
              label="Detailed Instrumentation and Performance Requirements"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>

          <div className={styles.postDescription}>
            <InputLabel htmlFor="postDescription">Post Description</InputLabel>
            <input type="hidden" name="postDescription" value={post} required />
            <div className="remirror-theme" name="card" id="card">
              <ThemeProvider>
                <Remirror
                  manager={manager}
                  initialContent={state}
                  onChange={(paramater) => {
                    setPost(prosemirrorNodeToHtml(paramater.state.doc));
                  }}
                  autoRender="end"
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
          <Stack direction={"row"} alignItems={"center"}>
            <label className={styles.upload} htmlFor="coverPhoto">
              Cover Photo
              <input
                type="file"
                name="coverPhoto"
                id="coverPhoto"
                accept="image/x-png,image/gif,image/jpeg"
                onChange={(e) => handleImageUpload(e)}
              />
            </label>
            <Tooltip
              title="Please use images in 16:9 aspect ratio"
              sx={{
                width: "20px",
                height: "20px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              <IconButton>i</IconButton>
            </Tooltip>
          </Stack>
          <img
            src={coverImage}
            alt=""
            style={{ width: "100%", gridColumn: "span 3" }}
          />
          <div className={styles.checkboxContainer}>
            <label>
              <input
                type="checkbox"
                className={styles.checkboxInput}
                checked={userConfirmation}
                onChange={(e) => setUserConfirmation(e.target.checked)}
              />
              <span className={styles.checkboxText}>
                I confirm that all details are correct and approved for public
                posting
              </span>
            </label>
          </div>
          <div className={styles.submit}>
            <Link to="/home">
              <button>Cancel</button>
            </Link>
            <button
              className={userConfirmation ? "" : styles.lightButton}
              disabled={!userConfirmation}
              type="submit"
            >
              Post
            </button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default CreatePage;
