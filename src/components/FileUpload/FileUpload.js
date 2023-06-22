import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// material-ui imports
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme, useMediaQuery } from '@mui/material';
// icons
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

// acceptable screen sizes for the Component
const SIZES = {
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
};

// breakpoints for screen sizes
const BREAKPOINTS = {
    xs: 576,
    sm: 768,
    md: 960,
    lg: 1280,
};
// ----------------------------

const MAX_FILE_SIZE = 10;

/**
 * Component for file upload with drag and drop functionality and preview of 
 * selected files in a grid view.
 * Many files can be selected at once.
 * @returns 
 */
export default function FileUpload(props) {
    const {
        size = SIZES.lg,
        dashColor = '#000',
        dashColorOnDrag = '#00b300',
        maxFileSize = MAX_FILE_SIZE,
        formData
    } = props;

    const theme = useTheme();

    // get the screen size ----------------------------------------------------
    const isXs = useMediaQuery(theme.breakpoints.down(SIZES.xs));
    const isSm = useMediaQuery(theme.breakpoints.between(SIZES.sm, SIZES.md));
    const isMd = useMediaQuery(theme.breakpoints.between(SIZES.md, SIZES.lg));
    const isLg = useMediaQuery(theme.breakpoints.up(SIZES.lg));

    const [widthSize, setWidthSize] = useState('100%');

    // set the width of the component based on the screen size
    useEffect(() => {
        if (isXs) setWidthSize('100%');
        else if (isSm) {
            if (size === SIZES.xs) setWidthSize(BREAKPOINTS.xs);
            else setWidthSize('100%');
        }
        else if (isMd) {
            if (size === SIZES.xs) setWidthSize(BREAKPOINTS.xs);
            else if (size === SIZES.sm) setWidthSize(BREAKPOINTS.sm);
            else setWidthSize('100%');
        }
        else if (isLg) {
            if (size === SIZES.xs) setWidthSize(BREAKPOINTS.xs);
            else if (size === SIZES.sm) setWidthSize(BREAKPOINTS.sm);
            else if (size === SIZES.md) setWidthSize(BREAKPOINTS.md);
            else setWidthSize('100%');
        }
        else setWidthSize('100%');
    }, [isXs, isSm, isMd, isLg, size]);
    // -------------------------------------------------------------------------

    // properties / states for storing selected files
    // const [selectedFiles, setSelectedFiles] = useState([]);
    const [message, setMessage] = useState('');

    // const [fileUrl, setFileUrl] = useState(null);

    const [overLimitFileCount, setOverLimitFileCount] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const [disableUpload, setDisableUpload] = useState(false);
    const inputRef = useRef(null);

    // properties / states for drag and drop
    const [dragActive, setDragActive] = useState(false);

    useEffect(() => {
        if (overLimitFileCount > 0) {
            setDisableUpload(true);
        }
        else {
            setDisableUpload(false);
            setMessage('');
        }
    }, [overLimitFileCount]);

    // event handlers for drag and drop
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileInput(e.dataTransfer.files);
        }
    };

    const getFileSizeInMB = (size) => {
        return Math.round((size / 1024 / 1024 + Number.EPSILON) * 100) / 100;
    };

    const getFileSizeWithUnit = (size) => {
        let returnSize = Math.round((size / 1024 + Number.EPSILON) * 100) / 100;

        if (returnSize < 1000) return `${returnSize} KB`;

        returnSize = Math.round((returnSize / 1024 + Number.EPSILON) * 100) / 100;

        return `${returnSize} MB`;
    };

    // event handler for file input
    const removeFile = (index) => {
        const file = selectedFiles[index];

        if (getFileSizeInMB(file.size) > maxFileSize)
            setOverLimitFileCount(overLimitFileCount - 1);

        const newSelectedFiles = [...selectedFiles];
        newSelectedFiles.splice(index, 1);

        setSelectedFiles(newSelectedFiles);
    }

    const handleFileInput = (files) => {
        if (files) {
            setMessage('');

            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();

                if (files[i].type.startsWith('application/')) {
                    const size = getFileSizeInMB(files[i].size);

                    if (size > maxFileSize) {
                        setMessage(`Some files are exeeding size limit... [${maxFileSize} MB]`);
                        setOverLimitFileCount(overLimitFileCount + 1);
                    }

                    reader.onload = (event) => {
                        setSelectedFiles((prevFiles) => [...prevFiles, {
                            file: event.target.result,
                            size: files[i].size,
                            name: files[i].name,
                        }]);
                        // setFileUrl(URL.createObjectURL(files[i]));
                        formData.append('Attachments', files[i]);
                    };
                    reader.readAsDataURL(files[i]);
                }
                else {
                    setMessage('Some files did not upload due to invalid type..!');
                }
            }
        }
    };

    const loadFileInputWindow = () => {
        inputRef.current.click();
    };

    return (
        <Box maxWidth={widthSize} sx={{ pb: '10px', px: '0px' }}>
            <Box
                onDragEnter={!disableUpload ? handleDrag : undefined}
                onDragLeave={!disableUpload ? handleDrag : undefined}
                onDragOver={!disableUpload ? handleDrag : undefined}
                onDrop={!disableUpload ? handleDrop : undefined}
                sx={{
                    border: `2px dashed ${dragActive ? dashColorOnDrag : dashColor}`,
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '10px',
                }}
            >
                {message &&
                    <Typography sx={{ color: 'rgba(255, 0, 0, 0.8)', paddingBottom: '10px' }}>
                        {message}
                    </Typography>
                }

                {selectedFiles.length > 0 && (
                    <Box sx={{
                        borderBottom: '1px solid #000',
                        marginBottom: '5px',
                    }}>
                        {selectedFiles.map((item, index) => (
                            <Box key={index} style={{
                                display: 'inline-block',
                                marginRight: '10px',
                                marginBottom: '10px',
                            }}>
                                <Box className='uploaded-file' sx={{
                                    border: '1px solid #000',
                                    padding: '2px',
                                    position: 'relative',
                                    width: '100px',
                                    height: '100px',
                                    marginBottom: '5px',

                                    '&:hover': {
                                        '& .MuiBox-root': {
                                            display: 'block',
                                        },

                                        '& .MuiSvgIcon-root': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                            borderRadius: '50%',
                                        },

                                        '& .MuiSvgIcon-root:hover': {
                                            backgroundColor: 'rgb(102, 101, 101)',
                                            color: '#fff',
                                        },
                                    }
                                }}>
                                    <Box sx={{ display: 'none' }}>
                                        <CloseIcon
                                            fontSize='small'
                                            onClick={() => removeFile(index)}
                                            sx={{
                                                position: 'absolute',
                                                top: '5px',
                                                right: '5px',
                                            }}
                                        />
                                    </Box>

                                    {/* <img
                                        src={fileUrl}
                                        alt={`file${index + 1}`}
                                        width={'100%'}
                                        height={'100%'}
                                    />

                                    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                                        <object 
                                            data={fileUrl} 
                                            type="application/pdf" 
                                            width="100%" 
                                            height="100%"
                                            style={{ transform: 'scaleX(0.8)' }}
                                        >
                                            <p>
                                                Install a pdf plugin
                                            </p>
                                        </object>
                                    </div> */}

                                    {item.name}
                                </Box>
                                <Typography textAlign={'center'} variant='subtitle2' sx={{
                                    color: `${getFileSizeInMB(item.size) > maxFileSize ? '#f00' : '#808080'}`
                                }}>
                                    {getFileSizeWithUnit(item.size)}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )}

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Stack
                        direction={'row'}
                        spacing={5}
                        alignItems={'center'}
                    >
                        {/* <CloudUploadIcon fontSize='large' sx={{
                            color: `${dragActive ? dashColorOnDrag : dashColor}`,
                            [theme.breakpoints.down(540)]: {
                                display: 'none',
                            },
                        }} /> */}
                        <Stack spacing={1}>
                            <Typography variant='subtitle1' textAlign={'center'}>
                                Select or drag and drop here
                            </Typography>
                            <Typography variant='subtitle2' color={'gray'} textAlign={'center'} sx={{
                                [theme.breakpoints.down(516)]: {
                                    display: 'none',
                                },
                            }}>
                                Only pdf, no more than {maxFileSize} MB
                            </Typography>
                            <Typography variant='subtitle2' color={'gray'} textAlign={'center'} sx={{
                                [theme.breakpoints.up(516)]: {
                                    display: 'none',
                                },
                            }}>
                                Allowed: JPG/PNG | Max size: {maxFileSize} MB
                            </Typography>
                        </Stack>
                        <Button variant='outlined' onClick={loadFileInputWindow} disabled={disableUpload}>
                            Select File
                        </Button>
                    </Stack>

                    <input
                        type="file"
                        ref={inputRef}
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileInput(e.target.files)}
                        multiple
                        accept='application/pdf'
                    />
                </Box>
            </Box>
        </Box>
    )
}

FileUpload.propTypes = {
    size: PropTypes.oneOf(Object.values(SIZES)),
    dashColor: PropTypes.string,
    dashColorOnDrag: PropTypes.string,
    maxFileSize: PropTypes.number,
    formData: PropTypes.shape({
        append: PropTypes.func,
        delete: PropTypes.func,
        entries: PropTypes.func,
        forEach: PropTypes.func,
        get: PropTypes.func,
        getAll: PropTypes.func,
        has: PropTypes.func,
        keys: PropTypes.func,
        set: PropTypes.func,
        values: PropTypes.func,
    })
};
