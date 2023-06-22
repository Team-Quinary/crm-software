import React, { useState, useEffect } from "react";
import { createUseStyles } from 'react-jss';

// material-ui imports
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Stack from "@mui/material/Stack";
import Divider from '@mui/material/Divider';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

// redux imports
import { useSelector } from "react-redux";
import store from "../../store/_storeConfig";
import { addForm, saveForm, deleteForm } from "../../store/feedbackFormHandle";

// local imports
import { Alert, Confirm, EditForm, Preview, MasonryGrid, SearchBox } from "../../components";

// styles
const useStyles = createUseStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.background.paper,
    },
    newForm: {
        backgroundColor: '#fff',
        border: '2px solid #ddd',
        boxShadow: 'none',
    },
    previewBtnContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '85%',
        marginTop: '20px',
    }
}));

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

const getProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

const FeedbackForm = () => {
    const styles = useStyles();

    const forms = useSelector((state) => state.entities.feedbackForms.list);
    const isFeedbackFormsLoading = useSelector((state) => state.entities.feedbackForms.loading);

    const [isConfirmOpened, setIsConfirmOpened] = useState(false);
    const [isAlertOpened, setIsAlertOpened] = useState(false);
    const [search, setSearch] = useState('');

    const [tabValue, setTabValue] = useState(0);

    const [selectedForm, setSelectedForm] = useState(null);
    const [formIdToDeleted, setFormIdToDeleted] = useState(null);
    const [formName, setFormName] = useState('');

    useEffect(() => {
        if(tabValue === 0) setFormName('');
    }, [tabValue]);

    const handleChange = (_event_, newValue) => {
        setTabValue(newValue);
    };

    const handleFormDelete = (id) => {
        setFormIdToDeleted(id)
        setIsConfirmOpened(true);
    };

    return (
        // form tab panel
        <Box sx={{ width: '90%', margin: '0 auto' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Stack direction="row" spacing={2} alignItems='center' justifyContent='space-between'>
                    <Tabs value={tabValue} onChange={handleChange}>
                        <Tab label="Forms" {...getProps(0)} sx={{ height: '60px' }} />
                        <Tab label="Editable" {...getProps(1)} sx={{ height: '60px' }} disabled={!selectedForm} />
                        <Tab label="Preview" {...getProps(2)} sx={{ height: '60px' }} disabled={!selectedForm} />
                    </Tabs>
                    {/* Search box */}
                    {tabValue === 0 &&  <SearchBox
                        placeholder='form by Name'
                        searchBoxText={search}
                        setSearchBoxText={setSearch}
                    />}
                </Stack>
            </Box>
            <TabPanel value={tabValue} index={0}>
                <div className="form-list">
                    {isFeedbackFormsLoading ? <div className="loading">Loading...</div> : <MasonryGrid>
                       {/* New Form Card */}
                        <Card className={styles.newForm}>
                            <CardContent>
                                <TextField
                                    variant='standard'
                                    placeholder="Untitled Form"
                                    value={formName}
                                    onChange={(e) => setFormName(e.target.value)}
                                    InputProps={{
                                        style: { fontSize: '20px' }
                                    }}
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{ m: '20px 0 0 0' }}
                                    onClick={() => {
                                        if (!formName) {
                                            setIsAlertOpened(true);
                                        }
                                        else {
                                            store.dispatch(addForm(formName));
                                            setSelectedForm(forms.find((form) => form.name === formName));
                                            setFormName(formName);
                                            setTabValue(1);
                                        }
                                    }}
                                >
                                    <AddCircleOutlineOutlinedIcon sx={{ marginRight: '10px' }} />
                                    Add new Form
                                </Button>
                            </CardContent>
                        </Card>
                        {/* map existing forms to the view */}
                        {forms
                            .filter((form) => form.name.toLowerCase().includes(search.toLowerCase()))
                            .map((form, index) => (
                                <Card key={index} className={styles.card}>
                                    <CardContent>
                                        <Typography variant="h5">
                                            {form.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mt: '10px' }}>
                                            {form.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
                                        <Button
                                            variant="contained"
                                            color="primary" size="small" sx={{ m: 1 }}
                                            onClick={() => {
                                                setSelectedForm(form);
                                                setFormName(form.name);
                                                setTabValue(1);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error" size="small" sx={{ m: 1 }}
                                            onClick={() => handleFormDelete(form.formId)}
                                        >
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            ))}
                    </MasonryGrid>}
                </div>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <EditForm
                    formId={(selectedForm && selectedForm.formId) || null}
                    formName={formName}
                />
                <Divider sx={{ mt: '20px' }} />
                <div className={styles.previewBtnContainer}>
                    <Button
                        variant='contained'
                        onClick={() => {
                            setSelectedForm(forms.find((form) => form.name === formName));
                            setTabValue(2);
                        }}
                    >
                        Preview Question
                    </Button>
                </div>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                <Preview formId={(selectedForm && selectedForm.formId) || null} />
                <Divider sx={{ mt: '20px' }} />
                <div className={styles.previewBtnContainer}>
                    <Button
                        variant='contained'
                        onClick={() => {
                            store.dispatch(saveForm(forms.find((form) => form.name === formName)));
                        }}
                    >
                        Save Form
                    </Button>
                </div>
            </TabPanel>

            <Alert
                state={{ isAlertOpened, setIsAlertOpened }}
                message="Textfield is Required!"
                severity="warning"
            />

            <Confirm
                state={{ isConfirmOpened, setIsConfirmOpened }}
                onYesClick={() => store.dispatch(deleteForm(formIdToDeleted))}
            />
        </Box>
    );
};

export default FeedbackForm;
