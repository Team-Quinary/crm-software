import React, { forwardRef } from 'react';

// material-ui imports
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

// local imports
import './Alert.scss';
import { useSelector } from 'react-redux';
import store from '../../store/_storeConfig';

const Alert = (props) => {
    let {
        state: { isAlertOpened, setIsAlertOpened },
        message,
        severity
    } = props;

    const status = useSelector(state => state.api.status);

    if (status !== 0) {
        if (status >= 200 && status < 300) {
            message = `Task successful! (${status})`;
            severity = 'success';
        }
        else if (status >= 400 && status < 500) {
            message = `Task failed! - Client Side error (${status})`;
            severity = 'error';
        }
        else if (status >= 500 && status < 600) {
            message = `Task failed! - Server Side error (${status})`;
            severity = 'error';
        }
        else {
            message = `Task failed! (${status})`;
            severity = 'warning';
        }
    }

    const handleClose = (_event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        if (status !== 0) store.dispatch({ type: 'api/statusSet', payload: 0 });
        else setIsAlertOpened(false);
    };

    const CustomAlert = forwardRef(function CustomAlert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <div className='alert'>
            <Snackbar open={(status !== 0) || isAlertOpened} autoHideDuration={6000} onClose={handleClose}>
                <CustomAlert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </CustomAlert>
            </Snackbar>
        </div>
    )
};

export default Alert;
