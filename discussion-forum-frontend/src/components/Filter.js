import {
    Box,
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { MuiChipsInput } from 'mui-chips-input';
import { useState } from 'react';
import { BsFilter } from 'react-icons/bs';
import styles from '../styles/Home.module.css';

const Filter = () => {
    const [tagArr, setTagArr] = useState([]);
    const [showMore, setShowMore] = useState(false);
    var ChipArr = [];
    const [ethnicity, setEthnicity] = useState([]);
    const ethnicityOptions = [
        'American Indian or Alaska Native',
        'Asian',
        'Black or African American',
        'Hispanic or Latine',
        'Native Hawaiian or Other Pacific Islander',
        'White',
    ];
    const genderOptions = [
        'Female',
        'Male',
        'Nonbinary',
        'Gender Nonconforming',
        'A Different Gender Identity',
    ];
    return (
        <div className={styles.filter}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                }}
            >
                <p>Filters</p>
                <Button
                    color="secondary"
                    onClick={() => setShowMore(!showMore)}
                >
                    <BsFilter />
                </Button>
            </div>
            {showMore && (
                <>
                    <TextField
                        name="composerName"
                        color="secondary"
                        required
                        id="composerName"
                        label="Composer Name"
                        variant="outlined"
                        style={{ width: '100%' }}
                    />
                    <TextField
                        name="composerWebsite"
                        color="secondary"
                        id="composerWebsite"
                        label="Composer Website"
                        variant="outlined"
                        style={{ width: '100%' }}
                    />
                    <TextField
                        name="representativeWorkSample"
                        color="secondary"
                        id="representativeWorkSample"
                        label="Representative Work Sample"
                        variant="outlined"
                        style={{ width: '100%' }}
                    />
                    <TextField
                        name="leadCommissioner"
                        color="secondary"
                        id="leadCommissioner"
                        label="Lead Commissioner"
                        variant="outlined"
                        style={{ width: '100%' }}
                    />
                    <TextField
                        type="date"
                        color="secondary"
                        name="premiereDate"
                        id="premiereDate"
                        label="Premiere Date"
                        InputLabelProps={{ shrink: true, required: true }}
                        variant="outlined"
                        style={{ width: '100%' }}
                    />
                    <TextField
                        type="number"
                        name="totalCommissionFee"
                        color="secondary"
                        id="totalCommissionFee"
                        label="Total Commission Fee"
                        variant="outlined"
                        style={{ width: '100%' }}
                    />
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
                            <MenuItem value="Seeking Funding">
                                Seeking Funding
                            </MenuItem>
                            <MenuItem value="Partially Funded">
                                Partially Funded
                            </MenuItem>
                            <MenuItem value="Fully Funded">
                                Fully Funded
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        type="number"
                        name="numberOfPartnersSought"
                        color="secondary"
                        id="numberOfPartnersSought"
                        label="Number of Partners Sought"
                        variant="outlined"
                        style={{ width: '100%' }}
                    />
                    <TextField
                        type="number"
                        name="fundsCommittedToDate"
                        color="secondary"
                        id="fundsCommittedToDate"
                        label="Funds Committed to Date"
                        variant="outlined"
                        style={{ width: '100%' }}
                    />
                    <TextField
                        type="date"
                        name="deadlineToJoinConsortium"
                        color="secondary"
                        id="deadlineToJoinConsortium"
                        label="Deadline to Join Consortium"
                        variant="outlined"
                        InputLabelProps={{ shrink: true, required: true }}
                        style={{ width: '100%' }}
                    />
                    <TextField
                        type="number"
                        name="partnersCommittedToDate"
                        color="secondary"
                        id="partnersCommittedToDate"
                        label="Partners Committed to Date"
                        variant="outlined"
                        style={{ width: '100%' }}
                    />
                    <TextField
                        name="rangeOfConsortiumPartnerCommissionFees"
                        color="secondary"
                        id="rangeOfConsortiumPartnerCommissionFees"
                        label="Partner Fee Range"
                        variant="outlined"
                        style={{ width: '100%' }}
                    />
                    <TextField
                        name="duration"
                        color="secondary"
                        id="duration"
                        label="Duration"
                        variant="outlined"
                        InputLabelProps={{ shrink: true, required: true }}
                        style={{ width: '100%' }}
                    />
                    <FormControl fullWidth>
                        <InputLabel
                            id="instrumentation-label"
                            color="secondary"
                        >
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
                    <TextField
                        name="conductor"
                        color="secondary"
                        id="conductor"
                        label="Conductor"
                        variant="outlined"
                        style={{ width: '100%' }}
                    />
                    <TextField
                        name="soloist"
                        color="secondary"
                        id="soloist"
                        label="Soloist"
                        variant="outlined"
                        style={{ width: '100%' }}
                    />
                    <MuiChipsInput
                        placeholder="Enter Your Tags"
                        value={tagArr}
                        onChange={(e) => {
                            setTagArr(e);
                            ChipArr = e;
                        }}
                    />
                    <FormControl fullWidth>
                        <InputLabel
                            color="secondary"
                            id="demo-multiple-name-label"
                        >
                            Composer Race/Ethnicity
                        </InputLabel>
                        <Select
                            color="secondary"
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={ethnicity}
                            onChange={(e) => setEthnicity(e.target.value)}
                            renderValue={(selected) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 0.5,
                                    }}
                                >
                                    {selected.map((value) => (
                                        <Chip
                                            color="secondary"
                                            key={value}
                                            label={value}
                                        />
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
                            required
                            label="Gender"
                        >
                            {genderOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        name="performanceRequirements"
                        color="secondary"
                        id="performanceRequirements"
                        label="Detailed Instrumentation and Performance Requirements"
                        variant="outlined"
                        style={{ width: '100%' }}
                    />
                    <Button color="secondary" variant="contained">
                        Submit
                    </Button>
                </>
            )}
        </div>
    );
};

export default Filter;
