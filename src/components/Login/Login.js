import { Box } from '@mui/system';
import clsx from 'clsx';
import { makeStyles } from "tss-react/mui";
import { useNavigate } from 'react-router-dom';
import { createAPIEndpoint, ENDPOINTS } from '../_api';
import {
    Button, Card, CardContent, Grid, TextField, Typography, OutlinedInput,
    FormControl, Input, InputAdornment, IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react'
import Center from '../Center';
import useForm from '../_hooks/useForm';

const useStyles = makeStyles()((theme) => {
    return {
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: '25ch',
        },
    }
});

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { classes } = useStyles();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();

    const getFreshModel = () => ({
        username: '',
        password: ''
    });

    const clear = () => {
        values.username = '';
        values.password = '';
        console.log('Done');
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    const validate = () => {
        let temp = {};
        temp.username = (values.username !== "") ? "" : "Username is required!";
        temp.password = (values.password !== "") ? "" : "Password is required!";
        setErrors(temp);

        return Object.values(temp).every(x => x === "");
    }

    const login = (e) => {
        e.preventDefault();

        if (validate())
            createAPIEndpoint(ENDPOINTS.user)
                .post(values)
                .then(res => {
                    console.log(res);
                    navigate('/dashboard');
                })
                .catch(err => console.log(err));
    }

    return (
        <div className='login'>
            <form noValidate onSubmit={login}>
                <Center>
                    <Card sx={{ width: '400px' }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant='h3' sx={{ my: 3 }}>
                                Login
                            </Typography>
                            <Box sx={{
                                '& .MuiTextField-root': {
                                    m: 1,
                                    width: '90%'
                                }
                            }}>
                                <TextField
                                    label='Username'
                                    variant='standard'
                                    name='username'
                                    value={values.username}
                                    onChange={handleInputChange}
                                    {...(errors.username && { error: true, helperText: errors.username })}
                                />
                                <TextField
                                    type='password'
                                    label='Password'
                                    name='password'
                                    value={values.password}
                                    onChange={handleInputChange}
                                    // variant='standard'
                                    inputProps={{
                                        type: "text",
                                        variant: 'outlined',
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton>
                                                    <VisibilityOff />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    {...(errors.password && { error: true, helperText: errors.password })}
                                />
                                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                    <OutlinedInput
                                        // value={values.weight}
                                        // onChange={handleChange('weight')}
                                        endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                                        inputProps={{
                                            'aria-label': 'weight',
                                        }}
                                        labelWidth={0}
                                    />
                                </FormControl>
                                <FormControl
                                    sx={{ m: 1, width: '331.19px', my: 3 }}
                                    variant="standard"
                                >
                                    <Input
                                        // variant='standard'
                                        id="standard-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        label="Password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleInputChange}
                                        {...(errors.password && { error: true, helperText: errors.password })}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <Grid
                                    container
                                    direction='row'
                                    sx={{ my: 3 }}
                                >
                                    <Grid item xs={6}>
                                        <Button sx={{ width: '90%' }}
                                            type='reset'
                                            size='large'
                                            variant='contained'
                                            onChange={clear}
                                        >
                                            Clear
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button sx={{ width: '90%' }}
                                            type='submit'
                                            size='large'
                                            variant='contained'
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </Center>
            </form>
        </div>
    )
}

export default Login;