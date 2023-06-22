import React from 'react';

// material-ui imports
import { styled } from '@mui/material';

const getColor = (text) => {
    switch (text.toLowerCase()) {
        case 'ongoing':
            return '#f7a336'
        case 'suspended':
            return '#b60205'
        case 'completed':
            return '#0e8a16'
        default:
            return 'lightgray'
    }
}

const StyledSpan = styled('span', {
    shouldForwardProp: (prop) => prop !== 'text'
})(({ text }) => ({
    backgroundColor: `${getColor(text)}`,
    display: 'inline',
    padding: '3px',
    borderRadius: '4px',
    color: '#fff',
}));

const ColoredLabel = ({ text }) => {
    return (
        <StyledSpan text={text}>
            {text}
        </StyledSpan>
    )
}

export default ColoredLabel;
