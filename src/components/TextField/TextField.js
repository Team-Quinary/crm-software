import React from 'react';

// material-ui imports
import MuiTextField from '@mui/material/TextField';

const TextField = (props) => { 
    const {
        type,
        variant,
        name,
        label,
        formikProps,
        width,
        updateStore,
    } = props;

    return (
        <MuiTextField
            type={type || 'text'}
            name={name}
            value={formikProps.values[name]}
            label={label}
            variant={variant || 'standard'}
            error={formikProps.errors[name] && formikProps.touched[name]}
            helperText={formikProps.touched[name] && formikProps.errors[name]}
            onChange={(updateStore && updateStore(name, formikProps.values[name])) || formikProps.handleChange}
            onBlur={formikProps.handleBlur}
            sx={{
                width: width || '100%',
                mb: 3
            }}
        />
    )
};

export default TextField;
