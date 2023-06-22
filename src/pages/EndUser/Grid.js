import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

// material-ui imports
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// redux imports
import { useSelector } from 'react-redux';
import store from '../../store/_storeConfig';
import {
    addSale,
    clearData,
    getSale,
    removeSale,
    setSalesData,
    updateSale
} from '../../store/saleHandle';

// local imports
import { Card, DialogForm, Confirm, MasonryGrid } from '../../components';

// styles
const useStyles = createUseStyles({
    field: {
        marginTop: '10px',
        marginBottom: '10px',
    },
    enduserGrid: {
        overflowY: 'scroll',
        margin: '5px 5px 0 5px',
    },
});

const Grid = (props) => {
    const {
        searchValue,
    } = props;

    const styles = useStyles();

    const endusers = useSelector((state) => state.entities.sales.endUsersList);
    const sales = useSelector((state) => state.entities.sales.salesList);
    const projects = useSelector((state) => state.entities.projects.list);
    const isSalesLoading = useSelector((state) => state.entities.sales.loading);

    const [isConfirmOpened, setIsConfirmOpened] = useState(false);
    const [saleToDelete, setSaleToDelete] = useState(null);

    const {
        enduserId,
        enduser,
        projectId,
        project,
        soldDate,
        open,
        category
    } = useSelector((state) => state.entities.sales.variables);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("sv-SE");
    }

    const [isSaleUpdate, setIsSaleUpdate] = useState(false);
    const [saleUpdateId, setSaleUpdateId] = useState(null);

    const [companyError, setCompanyError] = useState(false);
    let cError = false;

    const [projectError, setProjectError] = useState(false);
    let pError = false;

    const [soldDateError, setSoldDateError] = useState(false);
    let sdError = false;

    const handleClear = () => {
        store.dispatch(clearData());
        setSaleUpdateId('');
        clearErrors();
        if (!isSaleUpdate) setIsSaleUpdate(false);
    };

    const clearErrors = () => {
        setCompanyError(false);
        setProjectError(false);
        setSoldDateError(false);

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

    const handleSaleSave = (e) => {
        e.preventDefault();

        if (validateSale()) {
            const data = {
                soldDate, projectId, enduserId
            };

            store.dispatch(addSale(data));
            handleClear();
            updateSaleStore('open', !open);
        }
    };

    const setToSaleUpdate = (id) => {
        const sale = getSale(id)(store.getState());

        if (sale !== null) {
            updateSaleStore('enduserId', sale.enduserId);
            updateSaleStore('enduser', sale.enduser);
            updateSaleStore('projectId', sale.projectId);
            updateSaleStore('project', sale.project);
            updateSaleStore('soldDate', sale.soldDate);
            updateSaleStore('open', true);
        }

        setIsSaleUpdate(true);
        setSaleUpdateId(id);
    };

    const handleSaleUpdate = () => {
        if (validateSale()) {
            const sale = getSale(saleUpdateId)(store.getState());

            if (
                sale.enduser === enduser &&
                sale.project === project &&
                sale.soldDate === soldDate
            ) {
                alert("Not changed...!");
            }
            else {
                const data = {
                    soldDate, projectId, enduserId
                };

                store.dispatch(updateSale(saleUpdateId, data));
            }

            updateSaleStore('open', !open);
            setIsSaleUpdate(!isSaleUpdate);
            handleClear();
        }
    }

    const handleSaleDelete = () => {
        store.dispatch(removeSale(saleToDelete.saleId));
        setIsConfirmOpened(false);
    };

    const updateSaleStore = (name, value) => {
        store.dispatch(setSalesData(name, value));
    };

    const handleDialogClose = () => {
        updateSaleStore('open', false);
        handleClear();
        setIsSaleUpdate(false);
        setIsConfirmOpened(false);
        setSaleUpdateId('');
    };

    const handleConfirmation = (sale) => {
        setSaleToDelete(sale)
        setIsConfirmOpened(true);
    };

    return (
        <div className={styles.enduserGrid}>
            {isSalesLoading ? <div className="loading">Loading...</div> : <MasonryGrid
                breakpoints={{
                    830: 2,
                    1400: 3,
                    default: 3,
                }}
            >
                {sales
                    .filter(sale => (
                        (category === 'enduser')
                            ? sale.enduser.company.toLowerCase().includes(searchValue.toLowerCase())
                            : sale.project.name.toLowerCase().includes(searchValue.toLowerCase())
                    ))
                    .map((sale, index) => (
                        <Card
                            key={index}
                            updateOnClick={() => setToSaleUpdate(sale.saleId)}
                            deleteOnClick={() => handleConfirmation(sale)}
                            title={(sale.enduser !== undefined && sale.enduser !== null) ? sale.enduser.company : '-'}
                            subheader={(sale.enduser !== undefined && sale.project !== null) ? sale.project.name : '-'}
                            cardContent={
                                <Typography color='textSecondary' sx={{ textAlign: 'left' }}>
                                    <b>Sold Date:</b> {formatDate(sale.soldDate)}
                                </Typography>
                            }
                        />
                    ))
                }
            </MasonryGrid>}

            <DialogForm
                isOpen={open}
                handleDialogClose={handleDialogClose}
                handleSave={handleSaleSave}
                saveMsg={'Add a new Sale'}
                handleUpdate={handleSaleUpdate}
                updateMsg={'Update existing Sale'}
                handleClear={handleClear}
                isUpdating={isSaleUpdate}
            >
                <div>
                    <Autocomplete
                        options={endusers}
                        getOptionLabel={(option) => option.company}
                        value={enduser}
                        onChange={(_event_, value) => {
                            updateSaleStore('enduser', value);
                            updateSaleStore('enduserId', (value !== null ? value.enduserId : ''));
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

                <div className={styles.field}>
                    <Autocomplete
                        options={projects}
                        getOptionLabel={(option) => option.name}
                        value={project}
                        onChange={(_event_, value) => {
                            updateSaleStore('project', value);
                            updateSaleStore('projectId', (value !== null ? value.projectId : ''));
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

                <LocalizationProvider dateAdapter={AdapterDayjs} className={styles.field}>
                    <DesktopDatePicker
                        label="Start Date"
                        inputFormat="DD/MM/YYYY"
                        value={dayjs(soldDate)}
                        onChange={(value) => updateSaleStore('soldDate', formatDate(value))}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                variant: 'standard',
                                color: 'secondary',
                                className: styles.field,
                                error: soldDateError,
                                helperText: soldDateError ? "Can not be Empty" : null
                            }
                        }}
                    />
                </LocalizationProvider>
            </DialogForm>

            <Confirm
                state={{ isConfirmOpened, setIsConfirmOpened }}
                onYesClick={handleSaleDelete}
            />
        </div>

    )
};

export default Grid;
