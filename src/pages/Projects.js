import React, { useState } from 'react';
import { useStyles } from '../Styles';
import { CardHeader, Divider } from '@mui/material';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { Accordion, AccordionSummary, AccordionDetails, ProjectStatus }
    from '../components/StyledComponents';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Masonry from 'react-masonry-css';
import SearchBar from '../components/SearchBar';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useSelector } from 'react-redux';
import store from '../store/_storeConfig';
import { 
    addProject, 
    clearData, 
    getProject, 
    removeProject, 
    setProjectData, 
    statusTypes, 
    updateProject 
} from '../store/projectHandle';
import { getUser } from '../store/userHandle';
import { getCustomer } from '../store/customerHandle';

function Projects() {
    const { classes } = useStyles();
    const [expanded, setExpanded] = useState();
    const [expandProject, setExpandProject] = useState();

    const { 
        name,
        fee,
        duration, 
        startDate, 
        installments,
        status, 
        description,
        techLeadId,
        techLead,
        customerId,
        customer,
        category,
        sortField,
        descending,
        open 
    } = useSelector((state) => state.entities.projects.variables);

    const projects = useSelector(state => state.entities.projects.list);
    const users = useSelector(state => state.entities.users.list);
    const customers = useSelector(state => state.entities.customers.list);
    const isProjectsLoading = useSelector(state => state.entities.projects.loading);

    const [nameError, setNameError] = useState(false);
    var nError = false;

    const [feeError, setFeeError] = useState(false);
    var fError = false;

    const [durationError, setDurationError] = useState(false);
    var duError = false;

    const [startDateError, setStartDateError] = useState(false);
    var sdError = false;

    const [installmentsError, setInstallmentsError] = useState(false);
    var iError = false;

    const [statusError, setStatusError] = useState(false);
    var sError = false;

    const [descriptionError, setDescriptionError] = useState(false);
    var dError = false;

    const [techLeadError, setTechLeadError] = useState(false);
    var tlError = false;

    const [customerError, setCustomerError] = useState(false);
    var cError = false;

    const [search, setSearch] = useState('');
    
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setUpdateId] = useState(null);

    const fullWidth = true;

    const breakpoints = {
        default: 4,
        1100: 3,
        830: 2
    }

    const handleClear = () => {
        store.dispatch(clearData());
        
        setSearch('');
        setUpdateId('');
        clearErrors();
        
        if (!isUpdate)
            setIsUpdate(false);
    };

    const clearErrors = () => {
        setNameError(false);
        setFeeError(false);
        setDurationError(false);
        setDescriptionError(false);
        setTechLeadError(false);
        setCustomerError(false);
        setStartDateError(false);
        setStatusError(false);
        setInstallmentsError(false);

        nError = false;
        fError = false;
        duError = false;
        dError = false;
        tlError = false;
        cError = false;
        sdError = false;
        sError = false;
        iError = false;
    };

    const checkOnlyNumbers = (e, setField) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            store.dispatch(setProjectData(setField, e.target.value));
        }
    };

    const validateForm = () => {
        clearErrors();

        if (name === '') {
            setNameError(true);
            nError = true;
        }

        if (fee === '') {
            setFeeError(true);
            fError = true;
        }

        if (duration === '') {
            setDurationError(true)
            duError = true;
        }

        if (startDate === '' || startDate === null) {
            setStartDateError(true);
            sdError = true;
        }

        if (installments === '') {
            setInstallmentsError(true);
            iError = true;
        }

        if (status === '' || status === null) {
            setStatusError(true);
            sError = true;
        }

        if (description === '') {
            setDescriptionError(true);
            dError = true;
        }

        if (techLeadId === '' || techLeadId === null) {
            setTechLeadError(true);
            tlError = true;
        }

        if (customerId === '' || customerId === null) {
            setCustomerError(true);
            cError = true;
        }

        if (!(nError || fError || duError || sdError || sError || iError || dError || tlError || cError))
            return true;
        else
            return false;
    }

    const handleSave = (e) => {
        e.preventDefault();

        if (validateForm()) {
            var data = {
                name, fee, duration, startDate, installments, status,
                description, techLeadId, customerId
            };

            store.dispatch(addProject(data));
            handleClear();
            store.dispatch(setProjectData('open', !open));
        }
    };

    const handleDelete = (id) => {
        store.dispatch(removeProject(id));
    };

    const setToUpdate = (id) => {
        const project = getProject(id)(store.getState());

        store.dispatch(setProjectData('name', project.name));
        store.dispatch(setProjectData('fee', project.fee));
        store.dispatch(setProjectData('duration', project.duration));
        store.dispatch(setProjectData('description', project.description));
        store.dispatch(setProjectData('techLeadId', project.techLeadId));
        store.dispatch(setProjectData('customerId', project.customerId));
        store.dispatch(setProjectData('startDate', project.startDate));
        store.dispatch(setProjectData('status', project.status));
        store.dispatch(setProjectData('installments', project.installments));
        store.dispatch(setProjectData('open', !open));
        store.dispatch(setProjectData('techLead', getUser(project.techLeadId)(store.getState())));
        store.dispatch(setProjectData('customer', getCustomer(project.customerId)(store.getState())));

        setIsUpdate(true);
        setUpdateId(id);
    };

    const handleUpdate = () => {
        if (validateForm()) {
            var project = getProject(updateId)(store.getState());

            if (
                project.name === name &&
                project.fee === fee &&
                project.startDate === startDate &&
                project.status === status &&
                project.techLeadId === techLeadId &&
                project.customerId === customerId &&
                project.duration === duration &&
                project.description === description &&
                project.installments === installments
            ) {
                alert("Not changed...!");
            }
            else {
                var data = {
                    name, fee, duration, startDate, installments, status,
                    description, techLeadId, customerId
                };

                store.dispatch(updateProject(updateId, data));
            }

            store.dispatch(setProjectData('open', !open));
            setIsUpdate(!isUpdate);
        }
    }

    const getUserData = (id, field) => {
        var customer = customers.find(cus => cus.userId === id);
        var user = users.find(u => u.userId === id);

        if (field === 'company' && customer !== undefined)
            return customer.company;

        if (user !== undefined)
            if (field === 'name')
                return user.firstName + ' ' + user.lastName;
            else
                return user[field];
        else
            return null;
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("sv-SE");
    }

    const filterProject = (project) => {
        let txt = '';

        switch (category) {
            case 'contactPerson': case 'techLead':
                var user = users.find(u =>
                    u.userId === (
                        (category === 'techLead') ? project.techLeadId : project.customerId
                    )
                );

                txt = user.firstName + ' ' + user.lastName;
                break;
            case 'company':
                var cus = customers.find(c => c.userId === project.customerId);
                txt = cus.company;
                break;
            default:
                txt = project[category];
        }

        return txt.toLowerCase().includes(search.toLowerCase());
    }

    const sortProject = (p1, p2) => {
        switch (sortField) {
            case 'contactPerson': case 'techLead':
                var user1 = users.find(u =>
                    u.userId === (
                        (sortField === 'techLead') ? p1.techLeadId : p1.customerId
                    )
                );
                var user2 = users.find(u =>
                    u.userId === (
                        (sortField === 'techLead') ? p2.techLeadId : p2.customerId
                    )
                );

                let name1 = user1.firstName + ' ' + user1.lastName;
                let name2 = user2.firstName + ' ' + user2.lastName;

                return (name1 < name2) ? -descending : ((name1 > name2) ? descending : 0)
            case 'company':
                var cus1 = customers.find(c => c.userId === p1.customerId).company;
                var cus2 = customers.find(c => c.userId === p2.customerId).company;

                return (cus1 < cus2) ? -descending : ((cus1 > cus2) ? descending : 0)
            default:
                return (p1[sortField] < p2[sortField])
                    ? -descending : ((p1[sortField] > p2[sortField]) ? descending : 0)
        }
    }

    const projectGrid = () => {
        const changeExpanded = (panel, projectId) => (event, newExpanded) => {
            setExpanded(newExpanded ? panel : false);
            setExpandProject(projectId);
        };

        return (
            <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {(!isProjectsLoading)
                    ? projects
                        .filter(project => filterProject(project))
                        .sort((p1, p2) => sortProject(p1, p2))
                        .map(project => (
                            <Card elevation={1} key={project.projectId} className={classes.customerCard}>
                                <CardHeader
                                    action={
                                        <Stack direction='row' spacing={1}>
                                            <IconButton onClick={() => setToUpdate(project.projectId)}>
                                                <EditOutlined />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(project.projectId)}>
                                                <DeleteOutlined />
                                            </IconButton>
                                        </Stack>
                                    }
                                    title={project.name}
                                    className={classes.customerCardHeader}
                                />
                                <Divider />
                                <Accordion 
                                    expanded={expanded === 1 && project.projectId === expandProject} 
                                    onChange={changeExpanded(1, project.projectId)}
                                >
                                    <AccordionSummary>
                                        <Typography>Company : {getUserData(project.customerId, 'company')}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography gutterBottom><b>{getUserData(project.customerId, 'name')}</b></Typography>
                                        <Typography>{getUserData(project.customerId, 'contactNo')}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Divider />
                                <Accordion 
                                    expanded={expanded === 2 && project.projectId === expandProject} 
                                    onChange={changeExpanded(2, project.projectId)}
                                >
                                    <AccordionSummary>
                                        <Typography>
                                            Status: <ProjectStatus status={project.status}>{project.status}</ProjectStatus>
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography gutterBottom><b>Duration : </b>{project.duration}</Typography>
                                        <Typography gutterBottom><b>Fee: </b>{project.fee}</Typography>
                                        <Typography gutterBottom><b>Installments: </b>{project.installments}</Typography>
                                        <Typography><b>Start Date: </b>{formatDate(project.startDate)}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Divider />
                                <Accordion 
                                    expanded={expanded === 3 && project.projectId === expandProject} 
                                    onChange={changeExpanded(3, project.projectId)}
                                >
                                    <AccordionSummary>
                                        <Typography>Description</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>{project.description}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <div className={classes.customerContent}>
                                    <Typography color='textSecondary' sx={{ textAlign: 'left' }}>
                                        Tech Lead : {getUserData(project.techLeadId, 'name')}
                                    </Typography>
                                </div>
                            </Card>
                        ))
                    : <Typography className={classes.error}>Loading...</Typography>}
            </Masonry>
        )
    };

    const handleDialogClose = () => {
        store.dispatch(setProjectData('open', !open));
        setIsUpdate(false);
        handleClear();
    };

    return (
        <div className="projects">
            <div className={classes.searchBarContainer}>
                <SearchBar
                    page='projects' search={search} setSearch={setSearch}
                />
            </div>
            <Dialog
                open={open}
                onClose={handleDialogClose}
                fullWidth={fullWidth}
                maxWidth='md'
            >
                <DialogTitle>
                    {isUpdate ? 'Update existing Project' : 'Add a new Project'}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <div className={classes.projectFormContainer}>
                        <div className={classes.projectFormDiv}>
                            <TextField
                                autoFocus
                                required
                                fullWidth
                                type='text'
                                name='name'
                                value={name}
                                label='Name'
                                variant='standard'
                                color='secondary'
                                error={nameError}
                                helperText={nameError ? "Can not be Empty" : null}
                                onChange={(e) => store.dispatch(setProjectData('name', e.target.value))}
                            />

                            <TextField
                                required
                                fullWidth
                                type='text'
                                name='fee'
                                value={fee}
                                label='Fee'
                                variant='standard'
                                color='secondary'
                                className={classes.field}
                                error={feeError}
                                helperText={feeError ? "Can not be Empty" : null}
                                onChange={(e) => checkOnlyNumbers(e, 'fee')}
                            />

                            <TextField
                                required
                                fullWidth
                                type='text'
                                name='duration'
                                value={duration}
                                label='Duration (months)'
                                variant='standard'
                                color='secondary'
                                className={classes.field}
                                error={durationError}
                                helperText={durationError ? "Can not be Empty" : null}
                                onChange={(e) => checkOnlyNumbers(e, 'duration')}

                            />

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Start Date"
                                    inputFormat="DD/MM/YYYY"
                                    value={startDate}
                                    onChange={(value) => store.dispatch(setProjectData('startDate', formatDate(value)))}
                                    renderInput={(params) =>
                                        <TextField {...params}
                                            fullWidth
                                            variant='standard'
                                            color='secondary'
                                            className={classes.field}
                                            error={startDateError}
                                            helperText={startDateError ? "Can not be Empty" : null}
                                        />}
                                />
                            </LocalizationProvider>

                            <TextField
                                required
                                fullWidth
                                type='text'
                                name='installments'
                                value={installments}
                                label='Installments'
                                variant='standard'
                                color='secondary'
                                className={classes.field}
                                error={installmentsError}
                                helperText={installmentsError ? "Can not be Empty" : null}
                                onChange={(e) => checkOnlyNumbers(e, 'installments')}
                            />
                        </div>
                        <div className={classes.projectFormDiv}>
                            <div>
                                <Autocomplete
                                    value={status}
                                    onChange={(event, newValue) => {
                                        store.dispatch(setProjectData('status', newValue));
                                    }}
                                    disablePortal
                                    options={statusTypes}
                                    renderInput={({ inputProps, ...rest }) =>
                                        <TextField {...rest}
                                            required
                                            fullWidth
                                            name='type'
                                            label='Project Status'
                                            variant='standard'
                                            color='secondary'
                                            inputProps={{ ...inputProps, readOnly: true }}
                                        />
                                    }
                                />
                                {statusError && <span style={{ color: '#d32f2f', fontSize: '12px' }}>Select a project Status</span>}
                            </div>
                            <div className={classes.field}>
                                <Autocomplete
                                    options={users.filter(user => user.type === 'Tech Lead')}
                                    getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                                    value={techLead}
                                    onChange={(event, value) => {
                                        store.dispatch(setProjectData('techLead', value));
                                        store.dispatch(setProjectData('techLeadId', (value !== null ? value.userId : '')));
                                    }}
                                    renderInput={({ inputProps, ...rest }) =>
                                        <TextField {...rest}
                                            required
                                            name='type'
                                            label='Tech Lead'
                                            variant='standard'
                                            color='secondary'
                                            inputProps={{ ...inputProps }}
                                        />
                                    }
                                />
                                {techLeadError && <span style={{ color: '#d32f2f', fontSize: '12px' }}>Select a Tech Lead</span>}
                            </div>

                            <div className={classes.field}>
                                <Autocomplete
                                    options={customers}
                                    getOptionLabel={(option) => option.company}
                                    value={customer}
                                    onChange={(event, value) => {
                                        store.dispatch(setProjectData('customer', value));
                                        store.dispatch(setProjectData('customerId', (value !== null ? value.userId : '')));
                                    }}
                                    renderInput={({ inputProps, ...rest }) =>
                                        <TextField {...rest}
                                            required
                                            name='type'
                                            label='Customer'
                                            variant='standard'
                                            color='secondary'
                                            inputProps={{ ...inputProps }}
                                        />
                                    }
                                />
                                {customerError && <span style={{ color: '#d32f2f', fontSize: '12px' }}>Select a Customer</span>}
                            </div>

                            <TextField
                                required
                                fullWidth
                                type='text'
                                name='description'
                                value={description}
                                label='Description'
                                variant='outlined'
                                color='secondary'
                                multiline
                                minRows={4}
                                className={classes.field}
                                error={descriptionError}
                                helperText={descriptionError ? "Can not be Empty" : null}
                                onChange={(e) => store.dispatch(setProjectData('description', e.target.value))}
                            />
                        </div>
                    </div>
                    <Stack direction='row' spacing={2} justifyContent='right'>
                        <Button
                            variant='outlined'
                            onClick={handleDialogClose}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant='outlined'
                            onClick={handleClear}
                        >
                            Clear
                        </Button>

                        <Button
                            variant='contained'
                            onClick={(isUpdate) ? handleUpdate : handleSave}
                        >
                            {(isUpdate) ? 'Update' : 'Save'}
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
            {projectGrid()}
        </div>
    )
}

export default Projects;