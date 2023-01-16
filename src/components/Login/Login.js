import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { createAPIEndpoint, ENDPOINTS } from '../_api';
import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import React from 'react'
import Center from '../Center';
import useForm from '../_hooks/useForm';

function Login() {
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
        // eslint-disable-next-line no-unused-vars
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
                                    name='username'
                                    value={values.username}
                                    onChange={handleInputChange}
                                    variant='standard'
                                    {...(errors.username && { error: true, helperText: errors.username })}
                                />
                                <TextField
                                    type='password'
                                    label='Password'
                                    name='password'
                                    value={values.password}
                                    onChange={handleInputChange}
                                    variant='standard'
                                    {...(errors.password && { error: true, helperText: errors.password })}
                                />
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