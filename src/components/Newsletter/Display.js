import React from 'react';
import { createUseStyles } from 'react-jss';

// material-ui imports
import Typography from '@mui/material/Typography';

// local imports
import SampleAvatar from '../../assets/avatar.png';
import './Display.css';

// styles
const useStyles = createUseStyles({
    container: {
        backgroundColor: '#E6E8EC',
        padding: '20px',
        margin: '20px',
        borderRadius: '4px',
        border: '1px solid #482890',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    },
    topicArea: {
        display: 'grid',
        gridTemplateColumns: '0.8fr 0.2fr',
        columnGap: '10px',
        alignItems: 'start',
    },
    heading: {
        gridColumn: '1 / span 1',
    },
    subHeading: {
        gridRow: '2 / span 1',
    },
    description: {
        padding: '10px 0',
    },
    image: {
        width: '100%',
        gridColumn: '2 / span 1',
        gridRow: '1 / span 2',
    }
});

const Display = (props) => {
    const {
        heading,
        subHeading,
        description,
        image
    } = props;

    const Description = () => {
        const sampleDesc = 'This is a sample Description. Provide your own description in the form.';
        const lines = (description || sampleDesc).split('\n');

        return (
            <div className="description">
                {lines.map((line, index) => (
                    <Typography key={index} variant="body1">
                        {line}
                    </Typography>
                ))}
            </div>
        );
    }

    return (
        <div className="container">
            <div className="topicArea">
                <h2 className="heading">
                    {heading || 'Heading'}
                </h2>
                <h3 className="subHeading">
                    {subHeading || 'Sub Heading'}
                </h3>
                <img src={image ? URL.createObjectURL(image) : SampleAvatar} alt='Uploaded'
                    className="image"
                />
            </div>
            <Description />
        </div>
    )
};

export default Display;
