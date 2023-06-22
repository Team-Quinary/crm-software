import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

// material-ui imports
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';

// redux imports
import { useSelector } from 'react-redux';
import store from '../../store/_storeConfig';
import { getUser } from '../../store/userHandle';
import { getCustomer } from '../../store/customerHandle';
import {
    addProject,
    clearData,
    getProject,
    removeProject,
    setProjectData,
    statusTypes,
    updateProject
} from '../../store/projectHandle';

// local imports
import {
    Card, Confirm, MasonryGrid, Alert, SearchBar, DialogForm, Accordion,
    AccordionSummary, AccordionDetails, ColoredLabel
} from '../../components';

// styles
const useStyles = createUseStyles((theme) => ({
    field: {
        marginTop: '10px',
        marginBottom: '10px',
    },
    techLead: {
        padding: 10,
        color: theme.palette.text.default,
    },
}));

const Project = () => {
    const styles = useStyles();

    const users = useSelector(state => state.entities.users.list);
    const customers = useSelector(state => state.entities.customers.list);
    const projects = useSelector(state => state.entities.projects.list);
    const isProjectsLoading = useSelector((state) => state.entities.projects.loading);

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

    const [isAlertOpened, setIsAlertOpened] = useState(false);
    const [isConfirmOpened, setIsConfirmOpened] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [searchBoxText, setSearchBoxText] = useState('');

    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setUpdateId] = useState(null);

    const [expanded, setExpanded] = useState();
    const [expandProject, setExpandProject] = useState();

    const [nameError, setNameError] = useState(false);
    let nError = false;

    const [feeError, setFeeError] = useState(false);
    let fError = false;

    const [durationError, setDurationError] = useState(false);
    let duError = false;

    const [startDateError, setStartDateError] = useState(false);
    let sdError = false;

    const [installmentsError, setInstallmentsError] = useState(false);
    let iError = false;

    const [statusError, setStatusError] = useState(false);
    let sError = false;

    const [descriptionError, setDescriptionError] = useState(false);
    let dError = false;

    const [techLeadError, setTechLeadError] = useState(false);
    let tlError = false;

    const [customerError, setCustomerError] = useState(false);
    let cError = false;

    const handleClear = () => {
        store.dispatch(clearData());

        setSearchBoxText('');
        setUpdateId('');
        clearErrors();

        if (!isUpdate) setIsUpdate(false);
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

    const updateProjectStore = (name, value) => {
        store.dispatch(setProjectData(name, value));
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
    };

    const handleCustomerSave = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const data = {
                name, fee, duration, startDate, installments, status,
                description, techLeadId, customerId
            };

            store.dispatch(addProject(data));
            handleClear();
            updateProjectStore('open', !open);
        }
    };

    const setProjectToUpdate = (id) => {
        const project = getProject(id)(store.getState());

        updateProjectStore('name', project.name);
        updateProjectStore('fee', project.fee);
        updateProjectStore('duration', project.duration);
        updateProjectStore('description', project.description);
        updateProjectStore('techLeadId', project.techLeadId);
        updateProjectStore('customerId', project.customerId);
        updateProjectStore('startDate', project.startDate);
        updateProjectStore('status', project.status);
        updateProjectStore('installments', project.installments);
        updateProjectStore('open', !open);
        updateProjectStore('techLead', getUser(project.techLeadId)(store.getState()));
        updateProjectStore('customer', getCustomer(project.customerId)(store.getState()));

        setIsUpdate(true);
        setUpdateId(id);
    };

    const handleProjectUpdate = () => {
        if (validateForm()) {
            const project = getProject(updateId)(store.getState());

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
                const data = {
                    name, fee, duration, startDate, installments, status,
                    description, techLeadId, customerId
                };

                store.dispatch(updateProject(updateId, data));
            }

            updateProjectStore('open', !open);
            setIsUpdate(!isUpdate);
        }
    };

    const handleProjectDelete = () => {
        store.dispatch(removeProject(projectToDelete.projectId));
        setIsConfirmOpened(false);
    };

    const handleConfirmation = (project) => {
        setProjectToDelete(project);
        setIsConfirmOpened(true);
    };

    const handleDialogClose = () => {
        updateProjectStore('open', false);
        handleClear();
        setIsUpdate(false);
        setIsConfirmOpened(false);
        setUpdateId('');
    };

    const getUserData = (id, field) => {
        const customer = customers.find(cus => cus.userId === id);
        const user = users.find(u => u.userId === id);

        if (field === 'company' && customer !== undefined)
            return customer.company;

        if (user !== undefined)
            if (field === 'name')
                return user.firstName + ' ' + user.lastName;
            else
                return user[field];
        else
            return null;
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("sv-SE");
    };

    const filterProject = (project) => {
        let txt = '';

        switch (category) {
            case 'contactPerson': case 'techLead': {
                const user = users.find(u =>
                    u.userId === (
                        (category === 'techLead') ? project.techLeadId : project.customerId
                    )
                );

                txt = user.firstName + ' ' + user.lastName;
                break;
            }
            case 'company': {
                const cus = customers.find(c => c.userId === project.customerId);
                txt = cus.company;
                break;
            }
            default:
                txt = project[category];
        }

        return txt.toLowerCase().includes(searchBoxText.toLowerCase());
    };

    const sortProject = (p1, p2) => {
        switch (sortField) {
            case 'contactPerson': case 'techLead': {
                const user1 = users.find(u =>
                    u.userId === (
                        (sortField === 'techLead') ? p1.techLeadId : p1.customerId
                    )
                );
                const user2 = users.find(u =>
                    u.userId === (
                        (sortField === 'techLead') ? p2.techLeadId : p2.customerId
                    )
                );

                const name1 = user1.firstName + ' ' + user1.lastName;
                const name2 = user2.firstName + ' ' + user2.lastName;

                return (name1 < name2) ? -descending : ((name1 > name2) ? descending : 0)
            }
            case 'company': {
                const cus1 = customers.find(c => c.userId === p1.customerId).company;
                const cus2 = customers.find(c => c.userId === p2.customerId).company;

                return (cus1 < cus2) ? -descending : ((cus1 > cus2) ? descending : 0)
            }
            default:
                return (p1[sortField] < p2[sortField])
                    ? -descending : ((p1[sortField] > p2[sortField]) ? descending : 0)
        }
    };

    const changeExpanded = (panel, projectId) => (_event_, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
        setExpandProject(projectId);
    };

    const checkOnlyNumbers = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            updateProjectStore(e.target.name, e.target.value);
        }
    };

    return (
        <div className='projects'>
            <div className="searchbar-container">
                <SearchBar page="projects" searchBoxText={searchBoxText} setSearchBoxText={setSearchBoxText} />
            </div>

            {
                isProjectsLoading ? <div className="loading">Loading...</div> : <MasonryGrid>
                    {projects
                        .filter(project => filterProject(project))
                        .sort((p1, p2) => sortProject(p1, p2))
                        .map((project, index) => (
                            <Card
                                key={index}
                                updateOnClick={() => setProjectToUpdate(project.projectId)}
                                deleteOnClick={() => handleConfirmation(project)}
                                title={project.name}
                                subheader={'Company : ' + getUserData(project.customerId, 'company')}
                                contentPadding={0}
                                cardContent={
                                    <div>
                                        <Accordion
                                            expanded={expanded === 2 && project.projectId === expandProject}
                                            onChange={changeExpanded(2, project.projectId)}
                                        >
                                            <AccordionSummary>
                                                <Typography>
                                                    Status : <ColoredLabel text={project.status} />
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
                                        <div className={styles.techLead}>
                                            <Typography sx={{ textAlign: 'left' }}>
                                                Tech Lead : {getUserData(project.techLeadId, 'name')}
                                            </Typography>
                                        </div>
                                    </div>
                                }
                            />
                        ))
                    }
                </MasonryGrid>
            }

            <DialogForm
                isOpen={open}
                handleDialogClose={handleDialogClose}
                handleSave={handleCustomerSave}
                saveMsg={'Add a new Project'}
                handleUpdate={handleProjectUpdate}
                updateMsg={'Update existing Project'}
                handleClear={handleClear}
                isUpdating={isUpdate}
            >
                <div className={styles.projectFormContainer}>
                    <div className={styles.projectFormDiv}>
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
                            onChange={(e) => updateProjectStore('name', e.target.value)}
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
                            className={styles.field}
                            error={feeError}
                            helperText={feeError ? "Can not be Empty" : null}
                            onChange={(e) => checkOnlyNumbers(e)}
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
                            className={styles.field}
                            error={durationError}
                            helperText={durationError ? "Can not be Empty" : null}
                            onChange={(e) => checkOnlyNumbers(e)}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Start Date"
                                inputFormat="DD/MM/YYYY"
                                value={dayjs(startDate)}
                                onChange={(value) => updateProjectStore('startDate', value)}
                                slotProps={{ textField: { 
                                    fullWidth: true,
                                    variant: 'standard',
                                    color: 'secondary',
                                    className: styles.field,
                                    error: startDateError,
                                    helperText: startDateError ? "Can not be Empty" : null
                                }}}
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
                            className={styles.field}
                            error={installmentsError}
                            helperText={installmentsError ? "Can not be Empty" : null}
                            onChange={(e) => checkOnlyNumbers(e)}
                        />
                    </div>
                    <div className={styles.projectFormDiv}>
                        <div>
                            <Autocomplete
                                value={status}
                                onChange={(_event_, newValue) => {
                                    updateProjectStore('status', newValue);
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
                        <div className={styles.field}>
                            <Autocomplete
                                options={users.filter(user => user.type === 'Tech Lead')}
                                getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                                value={techLead}
                                onChange={(_event_, value) => {
                                    updateProjectStore('techLead', value);
                                    updateProjectStore('techLeadId', (value !== null ? value.userId : ''));
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

                        <div className={styles.field}>
                            <Autocomplete
                                options={customers}
                                getOptionLabel={(option) => option.company}
                                value={customer}
                                onChange={(_event_, value) => {
                                    updateProjectStore('customer', value);
                                    updateProjectStore('customerId', (value !== null ? value.userId : ''));
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
                            className={styles.field}
                            error={descriptionError}
                            helperText={descriptionError ? "Can not be Empty" : null}
                            onChange={(e) => updateProjectStore('description', e.target.value)}
                        />
                    </div>
                </div>
            </DialogForm>

            <Confirm
                state={{ isConfirmOpened, setIsConfirmOpened }}
                onYesClick={handleProjectDelete}
            />

            <Alert
                state={{ isAlertOpened, setIsAlertOpened }}
                message="This is a Snackbar message!"
                severity="success"
            />
        </div>
    )
};

export default Project;
