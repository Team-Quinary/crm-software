import React from 'react';

// material-ui imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

const DialogForm = (props) => {
    const {
        isOpen,
        handleDialogClose,
        handleSave,
        saveMsg,
        handleUpdate,
        updateMsg,
        handleClear,
        isUpdating,
        maxWidth,
        children,
    } = props;

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleDialogClose}
                fullWidth={true}
                maxWidth={maxWidth || 'xs'}
            >
                <DialogTitle>
                    {isUpdating ? updateMsg : saveMsg}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    {children}

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
                            onClick={(isUpdating) ? handleUpdate : handleSave}
                        >
                            {(isUpdating) ? 'Update' : 'Save'}
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </div>
    )
};

export default DialogForm;
