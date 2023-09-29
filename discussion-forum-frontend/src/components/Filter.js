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

const Filter = ({ setFilteredPost, post }) => {
    const [tagArr, setTagArr] = useState([]);
    const [showMore, setShowMore] = useState(false);
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
    const [formData, setFormData] = useState({
        composerName: '',
        composerWebsite: '',
        representativeWorkSample: '',
        leadCommissioner: '',
        premiereDate: '',
        totalCommissionFee: '',
        fundingStatus: '',
        numberOfPartnersSought: '',
        fundsCommittedToDate: '',
        deadlineToJoinConsortium: '',
        partnersCommittedToDate: '',
        rangeOfConsortiumPartnerCommissionFees: '',
        duration: '',
        instrumentation: '',
        gender: '',
        performanceRequirements: '',
    });
    for (const key in formData) {
        if (formData[key] !== '') {
            formData[key] = formData[key].toLowerCase();
        } else {
            delete formData[key];
        }
    }

    const filteredPost = post.filter((obj) => {
        return Object.keys(formData).some((key) => {
            return String(obj[key]).toLowerCase().includes(formData[key]);
        });
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleFilter = (e) => {
        e.preventDefault();
        if (Object.entries(formData).length > 0) setFilteredPost(filteredPost);
        else setFilteredPost(post);
    };

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
                    sx={{justifyContent: 'end', minWidth: 0}}
                    onClick={() => setShowMore(!showMore)}
                >
                    <BsFilter />
                </Button>
            </div>
            {showMore && (
                <form className={styles.form} onSubmit={handleFilter}>
                    <TextField
                        onChange={handleChange}
                        name="composerName"
                        color="secondary"
                        required
                        id="composerName"
                        label="Composer Name"
                        variant="outlined"
                        style={{ width: '100%' }}
                        size="small"
                        inputProps={{ style: { fontSize: '12px' } }}
                        InputLabelProps={{ style: { fontSize: '12px' } }}
                    />
                    <TextField
                        onChange={handleChange}
                        name="composerWebsite"
                        color="secondary"
                        id="composerWebsite"
                        label="Composer Website"
                        variant="outlined"
                        style={{ width: '100%' }}
                        size="small"
                        inputProps={{ style: { fontSize: '12px' } }}
                        InputLabelProps={{ style: { fontSize: '12px' } }}
                    />
                    <TextField
                        onChange={handleChange}
                        name="representativeWorkSample"
                        color="secondary"
                        id="representativeWorkSample"
                        label="Representative Work Sample"
                        variant="outlined"
                        style={{ width: '100%' }}
                        size="small"
                        inputProps={{ style: { fontSize: '12px' } }}
                        InputLabelProps={{ style: { fontSize: '12px' } }}
                    />
                    <TextField
                        onChange={handleChange}
                        name="leadCommissioner"
                        color="secondary"
                        id="leadCommissioner"
                        label="Lead Commissioner"
                        variant="outlined"
                        style={{ width: '100%' }}
                        size="small"
                        inputProps={{ style: { fontSize: '12px' } }}
                        InputLabelProps={{ style: { fontSize: '12px' } }}
                    />
                    <TextField
                        onChange={handleChange}
                        type="date"
                        color="secondary"
                        name="premiereDate"
                        id="premiereDate"
                        label="Premiere Date"
                        InputLabelProps={{
                            shrink: true,
                            required: true,
                            style: { fontSize: '12px' },
                        }}
                        variant="outlined"
                        style={{ width: '100%' }}
                        size="small"
                        inputProps={{style: {fontSize: '12px'}}}
                    />
                    <TextField
                        onChange={handleChange}
                        type="number"
                        name="totalCommissionFee"
                        color="secondary"
                        id="totalCommissionFee"
                        label="Total Commission Fee"
                        variant="outlined"
                        style={{ width: '100%' }}
                        size="small"
                        inputProps={{ style: { fontSize: '12px' } }}
                        InputLabelProps={{ style: { fontSize: '12px' } }}
                    />
                    <FormControl
                        fullWidth
                        size="small"
                        inputProps={{ style: { fontSize: '12px' } }}
                        InputLabelProps={{ style: { fontSize: '12px' } }}
                    >
                        <InputLabel id="fundingStatus-label" color="secondary" sx={{fontSize: '12px'}}>
                            Funding Status
                        </InputLabel>
                        <Select
                            onChange={handleChange}
                            labelId="fundingStatus-label"
                            color="secondary"
                            required
                            name="fundingStatus"
                            id="fundingStatus"
                            label="Funding Status"
                            defaultValue="seekingFunding"
                            size='small'
                            sx={{fontSize: '12px'}}
                        >
                            <MenuItem value="Seeking Funding" sx={{fontSize: '12px'}}>
                                Seeking Funding
                            </MenuItem>
                            <MenuItem value="Partially Funded" sx={{fontSize: '12px'}}>
                                Partially Funded
                            </MenuItem>
                            <MenuItem value="Fully Funded" sx={{fontSize: '12px'}}>
                                Fully Funded
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        onChange={handleChange}
                        type="number"
                        name="numberOfPartnersSought"
                        color="secondary"
                        id="numberOfPartnersSought"
                        label="Number of Partners Sought"
                        variant="outlined"
                        style={{ width: '100%' }}
                        size="small"
                        inputProps={{ style: { fontSize: '12px' } }}
                        InputLabelProps={{ style: { fontSize: '12px' } }}
                    />
                    <TextField
                        onChange={handleChange}
                        type="number"
                        name="fundsCommittedToDate"
                        color="secondary"
                        id="fundsCommittedToDate"
                        label="Funds Committed to Date"
                        variant="outlined"
                        style={{ width: '100%' }}
                        size="small"
                        inputProps={{ style: { fontSize: '12px' } }}
                        InputLabelProps={{ style: { fontSize: '12px' } }}
                    />
                    <TextField
                        onChange={handleChange}
                        type="date"
                        name="deadlineToJoinConsortium"
                        color="secondary"
                        id="deadlineToJoinConsortium"
                        label="Deadline to Join Consortium"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                            required: true,
                            style: { fontSize: '12px' },
                        }}
                        style={{ width: '100%' }}
                        size="small"
                        inputProps={{ style: { fontSize: '12px' } }}
                    />
                    <TextField
                        onChange={handleChange}
                        type="number"
                        name="partnersCommittedToDate"
                        color="secondary"
                        id="partnersCommittedToDate"
                        label="Partners Committed to Date"
                        variant="outlined"
                        style={{ width: '100%' }}
                        size="small"
                        inputProps={{ style: { fontSize: '12px' } }}
                        InputLabelProps={{ style: { fontSize: '12px' } }}
                    />
                    <TextField
                        onChange={handleChange}
                        name="rangeOfConsortiumPartnerCommissionFees"
                        color="secondary"
                        id="rangeOfConsortiumPartnerCommissionFees"
                        label="Partner Fee Range"
                        variant="outlined"
                        style={{ width: '100%' }}
                        size="small"
                        inputProps={{ style: { fontSize: '12px' } }}
                        InputLabelProps={{ style: { fontSize: '12px' } }}
                    />
                    <TextField
                        onChange={handleChange}
                        name="duration"
                        color="secondary"
                        id="duration"
                        label="Duration"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                            required: true,
                            style: { fontSize: '12px' },
                        }}
                        style={{ width: '100%' }}
                        size="small"
                        inputProps={{ style: { fontSize: '12px' } }}
                    />
                    <FormControl
                        fullWidth
                        size="small"
                        inputProps={{ style: { fontSize: '12px' } }}
                        InputLabelProps={{ style: { fontSize: '12px' } }}
                    >
                        <InputLabel
                            id="instrumentation-label"
                            color="secondary"
                            sx={{fontSize: '12px'}}
                        >
                            Instrumentation
                        </InputLabel>
                        <Select
                            onChange={handleChange}
                            labelId="instrumentation-label"
                            name="instrumentation"
                            id="instrumentation"
                            color="secondary"
                            required
                            label="Instrumentation"
                            defaultValue="fixed"
                            size='small'
                            sx={{fontSize: '12px'}}
                        >
                            <MenuItem value="Fixed" sx={{fontSize: '12px'}}>Fixed</MenuItem>
                            <MenuItem value="Flexible" sx={{fontSize: '12px'}}>Flexible</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        onChange={handleChange}
                        name="conductor"
                        color="secondary"
                        id="conductor"
                        label="Conductor"
                        variant="outlined"
                        style={{ width: '100%' }}
                        size="small"
                        inputProps={{ style: { fontSize: '12px' } }}
                        InputLabelProps={{ style: { fontSize: '12px' } }}
                    />
                    <TextField
                        onChange={handleChange}
                        name="soloist"
                        color="secondary"
                        id="soloist"
                        label="Soloist"
                        variant="outlined"
                        style={{ width: '100%' }}
                        size="small"
                        inputProps={{ style: { fontSize: '12px' } }}
                        InputLabelProps={{ style: { fontSize: '12px' } }}
                    />

                    <FormControl
                        fullWidth
                        size="small"
                        inputProps={{ style: { fontSize: '12px' } }}
                        InputLabelProps={{ style: { fontSize: '12px' } }}
                    >
                        <InputLabel
                            color="secondary"
                            id="demo-multiple-name-label"
                            size='small'
                            sx={{fontSize: '12px'}}
                        >
                            Composer Race/Ethnicity
                        </InputLabel>
                        <Select
                            color="secondary"
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={ethnicity}
                            sx={{fontSize: '12px'}}
                            onChange={(e) => setEthnicity(e.target.value)}
                            renderValue={(selected) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 0.5,
                                        fontSize: '12px'
                                    }}
                                >
                                    {selected.map((value) => (
                                        <Chip
                                            color="secondary"
                                            key={value}
                                            label={value}
                                            size='small'
                                            sx={{fontSize: '12px'}}
                                        />
                                    ))}
                                </Box>
                            )}
                        >
                            {ethnicityOptions.map((option) => (
                                <MenuItem key={option} value={option} sx={{fontSize: '12px'}}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        fullWidth
                        inputProps={{ style: { fontSize: '12px' } }}
                        InputLabelProps={{ style: { fontSize: '12px' } }}
                    >
                        <InputLabel id="gender-label" color="secondary" sx={{fontSize: '12px'}}>
                            Composer Gender
                        </InputLabel>
                        <Select
                            onChange={handleChange}
                            defaultValue=""
                            labelId="gender-label"
                            name="gender"
                            id="gender"
                            color="secondary"
                            required
                            label="Gender"
                            sx={{fontSize: '12px'}}
                            size='small'
                        >
                            {genderOptions.map((option) => (
                                <MenuItem key={option} value={option} sx={{fontSize: '12px'}}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        onChange={handleChange}
                        name="performanceRequirements"
                        color="secondary"
                        id="performanceRequirements"
                        label="Detailed Instrumentation and Performance Requirements"
                        variant="outlined"
                        style={{ width: '100%' }}
                        size="small"
                        inputProps={{ style: { fontSize: '12px' } }}
                        InputLabelProps={{ style: { fontSize: '12px' } }}
                    />
                    <Button
                        color="secondary"
                        type="submit"
                        variant="contained"
                        sx={{color: 'white'}}
                        onClick={handleFilter}
                    >
                        Submit
                    </Button>
                </form>
            )}
        </div>
    );
};

export default Filter;
