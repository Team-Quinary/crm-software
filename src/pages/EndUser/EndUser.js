import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

// material-ui imports
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import EditOutlined from '@mui/icons-material/EditOutlined';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';

// redux imports
import { useSelector } from 'react-redux';
import store from '../../store/_storeConfig';
import {
    addEnduser,
    clearData,
    getEndUser,
    removeEnduser,
    setSalesData,
    updateEnduser,
} from '../../store/saleHandle';

// local imports
import { Confirm, Alert, SearchBar } from '../../components';
import Grid from './Grid';

// styles
const useStyles = createUseStyles((theme) => ({
    field: {
        marginTop: '10px',
        marginBottom: '10px',
    },
    endUserContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        columnGap: '5px',
        maxHeight: '75vh',
    },
    newEndUser: {
        padding: '15px 20px',
        margin: '5px 15px 0 10px',
        borderRadius: '8px',
        backgroundColor: 'lightgray',
    },
    newEUContainer: {
        overflowY: 'scroll',
        height: '75vh',
        margin: '5px 5px 0 5px',
    },
    endUserButton: {
        margin: '25px 10px 10px 10px',
        width: '90%',
    },
    actionBtn: {
        color: theme.palette.text.default,

        '&:hover': {
            backgroundColor: theme.palette.text.red,
            color: theme.palette.text.primary,
        },
    },
    dialogTitle: {
        backgroundColor: theme.palette.background.primary,
        color: theme.palette.text.primary,
    }
}));

const Customer = () => {
    const styles = useStyles();

    const endusers = useSelector((state) => state.entities.sales.endUsersList);
    const sales = useSelector((state) => state.entities.sales.salesList);
    const projects = useSelector((state) => state.entities.projects.list);

    const {
        newCompany,
        project,
    } = useSelector((state) => state.entities.sales.variables);

    const [isAlertOpened, setIsAlertOpened] = useState(false);
    const [isConfirmOpened, setIsConfirmOpened] = useState(false);
    const [endUserToDelete, setEndUserToDelete] = useState(null);
    const [searchBoxText, setSearchBoxText] = useState('');

    const [isEndusersShow, setIsEndusersShow] = useState(false);
    const [enduserUpdateId, setEnduserUpdateId] = useState(-1);

    const [newCompanyError, setNewCompanyError] = useState(false);
    let ncError = false;

    const handleClear = () => {
        store.dispatch(clearData());
        setSearchBoxText('');
        setEnduserUpdateId(-1);

        setNewCompanyError(false);
        ncError = false;
    };

    const clearErrors = () => {
        setNewCompanyError(false);
        ncError = false;
    };

    const updateSaleStore = (name, value) => {
        store.dispatch(setSalesData(name, value));
    };

    const validateEnduser = () => {
        clearErrors();

        if (newCompany === '') {
            setNewCompanyError(true);
            ncError = true;
        }

        if (!(ncError) && newCompany)
            return true;
        else
            return false;
    }

    const handleEnduserSave = () => {
        if (validateEnduser()) {
            const data = {
                company: newCompany
            };

            store.dispatch(addEnduser(data));
            handleClear();
        }
    };

    const setToEnduserUpdate = (enduser) => {
        updateSaleStore('newCompany', enduser.company);
        setEnduserUpdateId(enduser.enduserId)
    };

    const handleEnduserUpdate = () => {
        if (validateEnduser()) {
            const enduser = getEndUser(enduserUpdateId)(store.getState());

            if (enduser.company !== newCompany) {
                const data = {
                    company: newCompany
                };

                store.dispatch(updateEnduser(enduserUpdateId, data));
            }

            handleClear();
        }
    }

    const handleEndUserDelete = () => {
        store.dispatch(removeEnduser(endUserToDelete.enduserId));
        setIsConfirmOpened(false);
    };

    const handleConfirmation = (enduser) => {
        setIsEndusersShow(false);
        setEndUserToDelete(enduser);
        setIsConfirmOpened(true);
    };

    const handleDialogClose = () => {
        setIsEndusersShow(false);
        handleClear();
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("sv-SE");
    }

    const projectIds = sales.map((sale) => sale.projectId);

    const projectsInSales = projects.filter((project) =>
        projectIds.includes(project.projectId)
    );

    const getEndUsers = () => {
        const filteredSales = project ? sales.filter((sale) =>
            sale.projectId === project.projectId
        ) : [];

        return (
            <div className={styles.newEndUser}>
                {filteredSales.length > 0
                    ? filteredSales.map((sale, index) =>
                        <div key={index}>
                            <Stack direction='row' spacing={1} alignItems='center' sx={{ pt: 1 }} key={sale.saleId}>
                                <Typography sx={{ textAlign: 'left', flexGrow: 1 }}>
                                    {sale.enduser.company}
                                </Typography>
                                <Typography color='textSecondary' sx={{ textAlign: 'left' }}>
                                    {formatDate(sale.soldDate)}
                                </Typography>
                            </Stack>
                        </div>
                    )
                    : <Typography sx={{ textAlign: 'center' }}>No any end-users</Typography>}
            </div>
        )
    };

    return (
        <div className='endusers'>
            <div className="searchbar-container">
                <SearchBar page="sales" searchBoxText={searchBoxText} setSearchBoxText={setSearchBoxText} />
            </div>

            <div className={styles.endUserContainer}>
                <Grid searchValue={searchBoxText} />

                <div>
                    <Button
                        variant='contained'
                        onClick={() => setIsEndusersShow(!isEndusersShow)}
                        className={styles.endUserButton}
                        sx={{ minHeight: '50px' }}
                    >
                        Manage End Users
                    </Button>

                    <Autocomplete
                        options={projectsInSales}
                        getOptionLabel={(option) => option.name}
                        value={project}
                        onChange={(_event_, value) => {
                            updateSaleStore('project', value);
                        }}
                        renderInput={({ inputProps, ...rest }) =>
                            <TextField {...rest}
                                required
                                label='Select a Project'
                                variant='outlined'
                                color='secondary'
                                inputProps={{ ...inputProps }}
                            />
                        }
                        sx={{ padding: '10px', width: '98%' }}
                    />
                    <div>
                        {project && getEndUsers()}
                    </div>
                </div>
            </div>

            <Dialog
                open={isEndusersShow}
                onClose={handleDialogClose}
                fullWidth={true}
                maxWidth={'xs'}
            >
                <DialogTitle className={styles.dialogTitle}>
                    List of End-Users
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Stack direction='row' spacing={2} sx={{ mb: 2 }} justifyContent='center' alignItems='center'>
                        <TextField
                            autoFocus
                            required
                            fullWidth
                            type='text'
                            name='company'
                            value={newCompany}
                            label={'Add a new End user'}
                            variant='outlined'
                            error={newCompanyError}
                            helperText={newCompanyError ? 'Can not be Empty' : ''}
                            onChange={(e) => updateSaleStore('newCompany', e.target.value)}
                        />
                        <Button
                            variant='contained'
                            onClick={handleEnduserSave}
                            sx={{ width: '70px' }}
                        >
                            Save
                        </Button>
                    </Stack>

                    {endusers
                        .filter((enduser) => enduser.company.toLowerCase().includes(newCompany.toLowerCase()))
                        .map((enduser, index) => (
                        <Stack direction='row' spacing={1} sx={{ mt: 1 }} justifyContent='center' alignItems='center' key={index}>
                            <TextField
                                fullWidth
                                type='text'
                                value={enduserUpdateId !== enduser.enduserId ? enduser.company : newCompany}
                                variant='standard'
                                color='secondary'
                                error={newCompanyError && enduserUpdateId === enduser.enduserId}
                                helperText={newCompanyError && enduserUpdateId === enduser.enduserId ? 'Can not be Empty' : ''}
                                onChange={(e) => updateSaleStore('newCompany', e.target.value)}
                                disabled={enduserUpdateId !== enduser.enduserId}
                            />

                            {enduserUpdateId === enduser.enduserId
                                ? <IconButton onClick={() => handleEnduserUpdate()} className={styles.actionBtn}>
                                    <DoneIcon />
                                </IconButton>
                                : <IconButton onClick={() => setToEnduserUpdate(enduser)} className={styles.actionBtn}>
                                    <EditOutlined />
                                </IconButton>
                            }
                            <IconButton onClick={() => handleConfirmation(enduser)} className={styles.actionBtn}>
                                <DeleteOutlined />
                            </IconButton>
                        </Stack>
                    ))}
                    <Stack direction='row' sx={{ mt: 2 }} justifyContent='center'>
                        <Button
                            variant='outlined'
                            onClick={handleDialogClose}
                            sx={{ width: '70px' }}
                        >
                            Close
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>

            <Confirm
                state={{ isConfirmOpened, setIsConfirmOpened }}
                onYesClick={handleEndUserDelete}
            />

            <Alert
                state={{ isAlertOpened, setIsAlertOpened }}
                message="This is a Snackbar message!"
                severity="success"
            />
        </div>
    )
};

export default Customer;
