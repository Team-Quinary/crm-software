import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import ReactDOMServer from "react-dom/server";

// material-ui imports
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

// redux imports
import { useSelector } from 'react-redux';
import store from '../../store/_storeConfig';
import { sendNewsletter } from '../../store/emailHandle';

// local imports
import Display from './Display';
import FileUpload from '../FileUpload/FileUpload';

// styles
const useStyles = createUseStyles({
    inputField: {
        marginBottom: '15px',
    },
    title: {
        marginBottom: '15px',
        fontWeight: '500',
    },
    formLabel: {
        fontWeight: '500',
        whiteSpace: 'nowrap',
    },
    formField: {
        display: 'flex',
        marginBottom: '20px',
        alignItems: 'center',
        columnGap: '10px',
    },
    container: {
        display: 'grid',
        columnGap: '20px',
        gridTemplateColumns: '0.8fr 1fr 0.5fr',
        padding: '20px',
    },
    formInput: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px'
    }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Form = () => {
    const styles = useStyles();

    const customers = useSelector(state => state.entities.customers.list);

    const [imageFile, setImageFile] = useState(null);
    const [heading, setHeading] = useState('');
    const [subHeading, setSubHeading] = useState('');
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState('');
    const [persons, setPersons] = useState([]);

    const formData = new FormData();

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
    };

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        setPersons(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const sendEmail = () => {
        persons.forEach((person) => {
            const customer = customers.filter((customer) => customer.email === person)[0];
            formData.append('To', `{"Name": "${customer.firstName + ' ' + customer.lastName}", "Address": "${customer.email}"}`);
        });

        // formData.append('To', `{"Name": "Thushan", "Address": "thushandfdo@gmail.com"}`);

        const content = ReactDOMServer.renderToStaticMarkup(
            <Display
                heading={heading}
                subHeading={subHeading}
                description={description}
                image={imageFile}
            />
            // <div style={{ color: 'red' }}>
            //     <h1>Heading</h1>
            //     <h2>Sub Heading</h2>
            //     <p>Description</p>
            // </div>
        );

        formData.append('Subject', subject || 'Subject');
        formData.append('Content', content);

        store.dispatch(sendNewsletter(formData));
    };

    return (
        <div className={styles.container}>
            <div className={styles.cell}>
                <Typography variant="h5" className={styles.title} align='center'>
                    Enter data for the Newsletter
                </Typography>

                <TextField
                    autoFocus
                    fullWidth
                    className={styles.inputField}
                    variant="standard"
                    label="Subject"
                    size='small'
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />

                <TextField
                    fullWidth
                    className={styles.inputField}
                    label="Heading"
                    size='small'
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                />

                <TextField
                    fullWidth
                    className={styles.inputField}
                    label="Sub Heading"
                    size='small'
                    value={subHeading}
                    onChange={(e) => setSubHeading(e.target.value)}
                />

                <TextField
                    fullWidth
                    className={styles.inputField}
                    label="Description"
                    size='small'
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className={styles.formField}>
                    <Typography className={styles.formLabel}>Upload Image:</Typography>
                    <input
                        type="file"
                        className={styles.formInput}
                        onChange={handleImageUpload}
                    />
                </div>

                <Typography className={styles.formLabel} sx={{ mb: 1 }}>Attach Files:</Typography>
                <FileUpload formData={formData} />

            </div>
            <div className={styles.cell}>
                <Display
                    heading={heading}
                    subHeading={subHeading}
                    description={description}
                    image={imageFile}
                />
            </div>
            <div className={styles.cell}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel >Select Customers</InputLabel>
                    <Select
                        multiple
                        value={persons}
                        onChange={handleChange}
                        input={<OutlinedInput label="Select Customers" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {customers.map((customer) => (
                            <MenuItem
                                key={customer.userId}
                                value={customer.email}
                            >
                                {customer.firstName + ' ' + customer.lastName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" sx={{ mt: 1, ml: 1 }}
                    onClick={() => sendEmail()}
                >
                    Send
                </Button>
            </div>
        </div>
    );
};

export default Form;
