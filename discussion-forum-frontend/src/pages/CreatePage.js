import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { MuiChipsInput } from "mui-chips-input";
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
} from '@remirror/react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Form, Link, redirect } from 'react-router-dom';
import { htmlToProsemirrorNode, prosemirrorNodeToHtml } from 'remirror';
import { Backend_URL } from '../Constants/backend'
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
} from 'remirror/extensions';
import 'remirror/styles/all.css';
import styles from '../styles/Create.module.css';

var CoverPhoto;
var ChipArr = [];

export async function createAction({ request }) {

    console.log(CoverPhoto, "skskdkskskd")
    console.log(ChipArr, "sssssssssssss")
    const data = await request.formData();
    const { ...values } = Object.fromEntries(data);
    // values["userInfo"] = user
    // const tags = values["tags"].split(" ");
    values["tags"] = ChipArr
    values["comments"] = []
    values["likedBy"] = []
    values["cover-photo"] = CoverPhoto
    values["userConfirmation"] = true;
    //Tatz
    if(values['composerWebsite'].substring(0, 4).toLowerCase() != "http"){
        values['composerWebsite'] = "http://" + values['composerWebsite']
    }
    
    console.log("test", JSON.stringify(values));
    debugger
    await fetch(Backend_URL + "post/create", {
        method: "POST",
        body: JSON.stringify(values)
    })
    return redirect('/home');
}

const CreatePage = () => {
    const [tagArr, setTagArr] = useState([]);
    const [userConfirmation, setUserConfirmation] = useState(false);
    const user = useSelector((state) => state.auth.userInfo);
    const [coverImage, setCoverImage] = useState('');
    const [post, setPost] = useState('');
    const { manager, state } = useRemirror({
        extensions: () => [
            new BoldExtension(),
            new ItalicExtension(),
            new CalloutExtension({ defaultType: 'warn' }),
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
        content: '',
        stringHandler: htmlToProsemirrorNode,
    });

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        try {
            var compressedImage = await compressAndEncodeImage(file);
            // Send the compressed image to the backend
            sendToBackend(compressedImage);
        } catch (error) {
            console.error('Error compressing image:', error);
        }
    };
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

    const sendToBackend = (compressedImage) => {
        // Send the compressed image to the backend
        // Implement your API call or data submission logic here
        setCoverImage(compressedImage)
        CoverPhoto = compressedImage
    };

    return (
        <Container>
            <div className={styles.createWrapper}>
                <Form className={styles.create} method="post">
                    <input type="hidden" name="userId" defaultValue={user.uid} />
                    <input type="hidden" name="userDisplayName" defaultValue={user.displayName} />
                    <input type="hidden" name="userProfilePhoto" defaultValue={user.photoURL} />
                    <div>
                        <TextField name='composerName' color='secondary' required id="composerName" label="Composer Name" variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <TextField name='composerWebsite' color='secondary' id="composerWebsite" label="Composer Website" variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <TextField name='representativeWorkSample' color='secondary' id="representativeWorkSample" label="Representative Work Sample" variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <TextField name='leadCommissioner' color='secondary' id="leadCommissioner" label="Lead Commissioner" variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <TextField name='primaryContact' color='secondary' id="primaryContact" label="Primary Contact/Email" variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <TextField type="date" color='secondary' name='premiereDate' id="premiereDate" label="Premiere Date" InputLabelProps={{ shrink: true, required: true }} variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <TextField type='number' name='totalCommissionFee' color='secondary' id="totalCommissionFee" label="Total Commission Fee" variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <FormControl fullWidth>
                            <InputLabel id='fundingStatus-label' color='secondary'>Funding Status</InputLabel>
                            <Select labelId="fundingStatus-label" color='secondary' required id='fundingStatus' label='Funding Status' defaultValue="seekingFunding">
                                <MenuItem value="seekingFunding">
                                    Seeking Funding
                                </MenuItem>
                                <MenuItem value="partiallyFunded">
                                    Partially Funded
                                </MenuItem>
                                <MenuItem value="fullyFunded">Fully Funded</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <TextField type='number' name='numberOfPartnersSought' color='secondary' id="numberOfPartnersSought" label="Number of Partners Sought" variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <TextField type='number' name='fundsCommittedToDate' color='secondary' id="fundsCommittedToDate" label="Funds Committed to Date" variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <TextField type='date' name='deadlineToJoinConsortium' color='secondary' id="deadlineToJoinConsortium" label="Deadline to Join Consortium" variant="outlined" InputLabelProps={{ shrink: true, required: true }} style={{ width: '100%' }} />
                    </div>
                    <div>
                        <TextField type='number' name='partnersCommittedToDate' color='secondary' id="partnersCommittedToDate" label="Partners Committed to Date" variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <TextField name='rangeOfConsortiumPartnerCommissionFees' color='secondary' id="rangeOfConsortiumPartnerCommissionFees" label="Partner Fee Range" variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <TextField type='time' name='duration' color='secondary' id="duration" label="Duration" variant="outlined" InputLabelProps={{ shrink: true, required: true }} style={{ width: '100%' }} />
                    </div>
                    <div>
                        <FormControl fullWidth>
                            <InputLabel id='instrumentation-label' color='secondary'>Instrumentation</InputLabel>
                            <Select labelId="instrumentation-label" id='instrumentation' color='secondary' required label='Instrumentation' defaultValue="fixed">
                                <MenuItem value="fixed">
                                    Fixed
                                </MenuItem>
                                <MenuItem value="flexible">
                                    Flexible
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <TextField name='conductor' color='secondary' id="conductor" label="Conductor" variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <TextField name='soloist' color='secondary' id="soloist" label="Soloist" variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <MuiChipsInput placeholder='Enter Your Tags' value={tagArr} onChange={(e) => {
                            setTagArr(e)
                            ChipArr = e
                            console.log(ChipArr)
                        }} />
                        {/* <TextField name='tags' color='secondary' required id="tags" label="Post Tags" variant="outlined" style={{width: '100%'}} placeholder='new band guitarist' /> */}
                    </div>
                    <div className={styles.performanceRequirements}>
                        <TextField name='performanceRequirements' color='secondary' id="performanceRequirements" label="Performance Requirements" variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div className={styles.postDescription}>
                        <InputLabel htmlFor="postDescription">
                            Post Description
                        </InputLabel>
                        <input
                            type="hidden"
                            name="postDescription"
                            value={post} required
                        />
                        <div className="remirror-theme" name="card" id="card">
                            <ThemeProvider>
                                <Remirror
                                    manager={manager}
                                    initialContent={state}
                                    onChange={(paramater) => {
                                        setPost(
                                            prosemirrorNodeToHtml(
                                                paramater.state.doc
                                            )
                                        );
                                    }}
                                    autoRender="end"
                                >
                                    <Toolbar style={{ flexWrap: 'wrap' }}>
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
                    <div>
                        <label className={styles.upload} htmlFor="coverPhoto">Cover Photo<input type="file" name="coverPhoto" id="coverPhoto" accept="image/x-png,image/gif,image/jpeg" onChange={(e) => handleImageUpload(e)} /></label>
                    </div>
                    <img src={coverImage} alt="" style={{ width: '100%', gridColumn: 'span 3' }} />
                    <div className={styles.checkboxContainer}>
                    <label >
                        <input
                        type="checkbox"
                        className={styles.checkboxInput}
                        checked={userConfirmation}
                        onChange={(e) => setUserConfirmation(e.target.checked)}
                        /> 
                        <span className={styles.checkboxText}>
                            I confirm to have approved all these details for public posting

                        </span>
                    </label>
                    </div>
                    <div className={styles.submit}>
                        <Link to="/home">
                            <button>Cancel</button>
                        </Link>
                        <button className={userConfirmation ? '' : styles.lightButton} disabled={!userConfirmation} type="submit">Post</button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default CreatePage;
