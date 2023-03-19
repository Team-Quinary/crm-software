import React, { useState } from 'react';
import { useStyles } from '../Styles';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Masonry from 'react-masonry-css';
import SearchBar from '../components/SearchBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import store from '../store/_storeConfig';
import { useSelector } from 'react-redux';
import { addEnduser, addSale, clearData, getEndUser, getSale, removeEnduser, removeSale, setSalesData, updateEnduser, updateSale } from '../store/saleHandle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Autocomplete from '@mui/material/Autocomplete';

function EndUsers() {
    const { classes } = useStyles();

    const {
        newCompany,
        enduserId,
        enduser,
        projectId,
        project,
        soldDate,
        category,
        open,
    } = useSelector((state) => state.entities.sales.variables);

    const endusers = useSelector((state) => state.entities.sales.endUsersList);
    const sales = useSelector((state) => state.entities.sales.salesList);
    const projects = useSelector((state) => state.entities.projects.list);
    const isSalesLoading = useSelector((state) => state.entities.sales.loading);

    const [companyError, setCompanyError] = useState(false);
    var cError = false;

    const [newCompanyError, setNewCompanyError] = useState(false);
    var ncError = false;

    const [projectError, setProjectError] = useState(false);
    var pError = false;

    const [soldDateError, setSoldDateError] = useState(false);
    var sdError = false;

    const [search, setSearch] = useState('');

    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setUpdateId] = useState(null);

    const [isEnduserUpdate, setIsEnduserUpdate] = useState(false);
    const [enduserUpdateId, setEnduserUpdateId] = useState(null);

    const fullWidth = true;

    const breakpoints = {
        default: 3,
        1100: 2,
        830: 1
    }

    const handleClear = () => {
        store.dispatch(clearData());

        setSearch('');
        setUpdateId('');
        clearErrors();

        if (!isUpdate)
            setIsUpdate(false);

        setIsEnduserUpdate(false);
    };

    const clearErrors = () => {
        setCompanyError(false);
        setNewCompanyError(false);
        setProjectError(false);
        setSoldDateError(false);

        ncError = false;
        cError = false;
        pError = false;
        sdError = false;
    };

    const validateSale = () => {
        clearErrors();

        if (enduserId === '' || enduserId === null) {
            setCompanyError(true);
            cError = true;
        }

        if (projectId === '' || projectId === null) {
            setProjectError(true)
            pError = true;
        }

        if (soldDate === '' || soldDate === null) {
            setSoldDateError(true);
            sdError = true;
        }

        if (!(cError || pError || sdError) && enduser)
            return true;
        else
            return false;
    }

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

    const handleSaleSave = (e) => {
        e.preventDefault();

        if (validateSale()) {
            var data = {
                soldDate, projectId, enduserId
            };

            store.dispatch(addSale(data));
            handleClear();
            store.dispatch(setSalesData('open', !open));
        }
    };

    const handleEnduserSave = (e) => {
        e.preventDefault();

        if (validateEnduser()) {
            var data = {
                company: newCompany
            };

            store.dispatch(addEnduser(data));
            handleClear();
        }
    };

    const handleSaleDelete = (saleId) => {
        store.dispatch(removeSale(saleId));
    };

    const handleEnduserDelete = (enduserId) => {
        store.dispatch(removeEnduser(enduserId));
    };

    const setToSaleUpdate = (id) => {
        const sale = getSale(id)(store.getState());

        if (sale !== null) {
            store.dispatch(setSalesData('enduserId', sale.enduserId));
            store.dispatch(setSalesData('enduser', sale.enduser));
            store.dispatch(setSalesData('projectId', sale.projectId));
            store.dispatch(setSalesData('project', sale.project));
            store.dispatch(setSalesData('soldDate', sale.soldDate));
            store.dispatch(setSalesData('open', true));
        }

        setIsUpdate(true);
        setUpdateId(id);
    };

    const setToEnduserUpdate = (id) => {
        const enduser = getEndUser(id)(store.getState());

        if (enduser !== null) {
            store.dispatch(setSalesData('newCompany', enduser.company));
        }

        setIsEnduserUpdate(true);
        setEnduserUpdateId(id);
    };

    const handleSaleUpdate = () => {
        if (validateSale()) {
            var sale = getSale(updateId)(store.getState());

            if (
                sale.enduser === enduser &&
                sale.project === project &&
                sale.soldDate === soldDate
            ) {
                alert("Not changed...!");
            }
            else {
                var data = {
                    soldDate, projectId, enduserId
                };

                store.dispatch(updateSale(updateId, data));
            }

            store.dispatch(setSalesData('open', !open));
            setIsUpdate(!isUpdate);
            handleClear();
        }
    }

    const handleEnduserUpdate = () => {
        if (validateEnduser()) {
            var enduser = getEndUser(enduserUpdateId)(store.getState());

            if (enduser.company === newCompany) {
                alert("Not changed...!");
            }
            else {
                var data = {
                    company: newCompany
                };

                store.dispatch(updateEnduser(enduserUpdateId, data));
            }

            setIsEnduserUpdate(!setIsEnduserUpdate);
            handleClear();
        }
    }

    const salesGrid = () => {
        return (
            <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {(!isSalesLoading)
                    ? sales.map(sale => (
                        <Card elevation={1} key={sale.saleId} className={classes.customerCard}>
                            <CardHeader
                                action={
                                    <Stack direction='row' spacing={1}>
                                        <IconButton onClick={() => setToSaleUpdate(sale.saleId)}>
                                            <EditOutlined />
                                        </IconButton>
                                        <IconButton onClick={() => handleSaleDelete(sale.saleId)}>
                                            <DeleteOutlined />
                                        </IconButton>
                                    </Stack>
                                }
                                title={(sale.enduser !== undefined && sale.enduser !== null) ? sale.enduser.company : '-'}
                                subheader={(sale.enduser !== undefined && sale.project !== null) ? sale.project.name : '-'}
                                className={classes.customerCardHeader}
                            />
                            <Divider />
                            <div className={classes.customerContent}>
                                <Typography color='textSecondary' sx={{ textAlign: 'left' }}>
                                    <b>Sold Date:</b> {formatDate(sale.soldDate)}
                                </Typography>
                            </div>
                        </Card>
                    ))
                    : <Typography className={classes.error}>Loading...</Typography>}
            </Masonry>
        )
    };

    const handleDialogClose = () => {
        store.dispatch(setSalesData('open', !open));
        handleClear();
        setIsUpdate(false);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("sv-SE");
    }

    const filteredList = () => {
        if (category === 'enduser') {
            return (
                endusers.filter(enduser =>
                    (enduser.company !== null && enduser.company !== undefined) ? enduser.company.toLowerCase().includes(search.toLowerCase()) : false
                ).map(enduser =>
                    <div key={enduser.enduserId} className={classes.newEndUser}>
                        <Stack direction='row' spacing={1} alignItems='center'>
                            <Typography sx={{ flexGrow: 1 }} variant='h6'>
                                {enduser.company}
                            </Typography>
                            <IconButton onClick={() => setToEnduserUpdate(enduser.enduserId)}>
                                <EditOutlined />
                            </IconButton>
                            <IconButton onClick={() => handleEnduserDelete(enduser.enduserId)}>
                                <DeleteOutlined />
                            </IconButton>
                        </Stack>
                        <Divider />
                        {sales.filter(sale => sale.enduserId === enduser.enduserId)
                            .map(sale =>
                                <Stack direction='row' spacing={1} alignItems='center' sx={{ pt: 1 }} key={sale.saleId}>
                                    <Typography color='textSecondary' sx={{ textAlign: 'left', flexGrow: 1 }}>
                                        {sale.project.name}
                                    </Typography>
                                    <Typography color='textSecondary' sx={{ textAlign: 'left' }}>
                                        {formatDate(sale.soldDate)}
                                    </Typography>
                                </Stack>
                            )
                        }
                    </div>
                )
            )
        }
        else if (category === 'project') {
            const uniqueProjects = Array.from(new Set(sales
                .filter(sale =>
                    sale.project.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((sale) => sale.project.name)
            ));

            console.log(uniqueProjects);

            const filteredSales = sales.filter((sales) => {

                if (uniqueProjects.includes(sales.project.name)) {

                    var index = uniqueProjects.indexOf(sales.project.name)
                    if (index >= 0) uniqueProjects.splice(index, 1);

                    return true;
                }

                return false;
            });

            console.log(filteredSales);

            return (
                filteredSales.map(filteredSale =>
                    <div key={filteredSale.saleId} className={classes.newEndUser}>
                        <Stack direction='row' spacing={1} alignItems='center'>
                            <Typography sx={{ flexGrow: 1 }} variant='h6'>
                                {filteredSale.project.name}
                            </Typography>
                        </Stack>
                        <Divider />
                        {sales.filter(sale => sale.projectId === filteredSale.projectId)
                            .map(sale =>
                                <Stack direction='row' spacing={1} alignItems='center' sx={{ pt: 1 }} key={sale.saleId}>
                                    <Typography color='textSecondary' sx={{ textAlign: 'left', flexGrow: 1 }}>
                                        {sale.enduser.company}
                                    </Typography>
                                    <Typography color='textSecondary' sx={{ textAlign: 'left' }}>
                                        {formatDate(sale.soldDate)}
                                    </Typography>
                                </Stack>
                            )
                        }
                    </div>
                )
            )
        }
    }

    return (
        <div className='endusers'>
            <div className={classes.searchBarContainer}>
                <SearchBar
                    page='sales' search={search} setSearch={setSearch}
                />
            </div>
            <Dialog
                open={open}
                onClose={handleDialogClose}
                fullWidth={fullWidth}
                maxWidth='xs'
            >
                <DialogTitle>
                    {isUpdate ? 'Update existing Sale' : 'Add a new Sale'}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <div>
                        <Autocomplete
                            options={endusers}
                            getOptionLabel={(option) => option.company}
                            value={enduser}
                            onChange={(event, value) => {
                                store.dispatch(setSalesData('enduser', value));
                                store.dispatch(setSalesData('enduserId', (value !== null ? value.enduserId : '')));
                            }}
                            renderInput={({ inputProps, ...rest }) =>
                                <TextField {...rest}
                                    required
                                    name='type'
                                    label='Enduser'
                                    variant='standard'
                                    color='secondary'
                                    inputProps={{ ...inputProps }}
                                />
                            }
                        />
                        {companyError && <span style={{ color: '#d32f2f', fontSize: '12px' }}>Select an Enduser</span>}
                    </div>

                    <div className={classes.field}>
                        <Autocomplete
                            options={projects}
                            getOptionLabel={(option) => option.name}
                            value={project}
                            onChange={(event, value) => {
                                store.dispatch(setSalesData('project', value));
                                store.dispatch(setSalesData('projectId', (value !== null ? value.projectId : '')));
                            }}
                            renderInput={({ inputProps, ...rest }) =>
                                <TextField {...rest}
                                    required
                                    name='type'
                                    label='Project'
                                    variant='standard'
                                    color='secondary'
                                    inputProps={{ ...inputProps }}
                                />
                            }
                        />
                        {projectError && <span style={{ color: '#d32f2f', fontSize: '12px' }}>Select a Project</span>}
                    </div>

                    <LocalizationProvider dateAdapter={AdapterDayjs} className={classes.field}>
                        <DesktopDatePicker
                            label="Start Date"
                            inputFormat="DD/MM/YYYY"
                            value={soldDate}
                            onChange={(value) => store.dispatch(setSalesData('soldDate', formatDate(value)))}
                            renderInput={(params) =>
                                <TextField {...params}
                                    fullWidth
                                    variant='standard'
                                    color='secondary'
                                    // className={classes.field}
                                    error={soldDateError}
                                    helperText={soldDateError ? "Can not be Empty" : null}
                                />}
                        />
                    </LocalizationProvider>

                    <Stack direction='row' spacing={2} sx={{ mt: 3 }} justifyContent='right'>
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
                            onClick={(isUpdate) ? handleSaleUpdate : handleSaleSave}
                        >
                            {(isUpdate) ? 'Update' : 'Save'}
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
            <div className={classes.endUserContainer}>
                <div className={classes.enduserGrid}>
                    {salesGrid()}
                </div>
                <div className={classes.newEUContainer}>
                    <div className={classes.newEndUser} style={{ marginBottom: '12px' }}>
                        <TextField
                            autoFocus
                            required
                            fullWidth
                            type='text'
                            name='company'
                            value={newCompany}
                            label={isEnduserUpdate ? 'Update End user' : 'Add a new End user'}
                            variant='standard'
                            color='secondary'
                            error={newCompanyError}
                            helperText={newCompanyError ? 'Can not be Empty' : ''}
                            onChange={(e) => store.dispatch(setSalesData('newCompany', e.target.value))}
                        />
                        <Stack direction='row' spacing={2} sx={{ mt: 2 }} justifyContent='center'>
                            <Button
                                variant='outlined'
                                onClick={handleClear}
                                sx={{ width: '70px' }}
                            >
                                Clear
                            </Button>

                            <Button
                                variant='contained'
                                onClick={isEnduserUpdate ? handleEnduserUpdate : handleEnduserSave}
                                sx={{ width: '70px' }}
                            >
                                {isEnduserUpdate ? 'Update' : 'Save'}
                            </Button>
                        </Stack>
                    </div>
                    <div>
                        {filteredList()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EndUsers;
