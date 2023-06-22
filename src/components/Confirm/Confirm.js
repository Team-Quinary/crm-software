import React, { forwardRef } from 'react';
import { createUseStyles } from 'react-jss';

// material-ui imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import WarningIcon from '@mui/icons-material/Warning';
import { Divider } from '@mui/material';

// styles
const useStyles = createUseStyles((theme) => ({
    root: {
        '& .MuiDialogTitle-root': {
            backgroundColor: theme.palette.background.warn,
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.text.warn,
        }
    }
}));

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Confirm = (props) => {
    const {
        state: { isConfirmOpened, setIsConfirmOpened },
        title,
        message,
        onYesClick,
        onNoClick,
        onClose
    } = props;

    const styles = useStyles();

    const handleClose = (response) => {
        setIsConfirmOpened(false);

        if (response === "yes") {
            if (onYesClick) onYesClick();
        }
        else if (response === "no") {
            if (onNoClick) onNoClick();
        }

        if (onClose) onClose();
    };

    return (
        <Dialog
            open={isConfirmOpened}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => handleClose("close")}
            className={styles.root}
        >
            <DialogTitle>
                <WarningIcon sx={{ mr: '10px' }}/>
                {title || "Warning..!"}
            </DialogTitle>
            <Divider />
            <DialogContent>
                <DialogContentText className={styles.description}>
                    {message || <span>You are going to <b>Delete</b> some data. Are you sure?</span>}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose("no")}>No</Button>
                <Button onClick={() => handleClose("yes")} variant="outlined" color="error">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Confirm;
