import { alpha, InputBase, styled } from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    // pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.down('990')]: {
            width: '12ch',
            // '&:focus': {
            //     width: '20ch',
            // },
        },
    },
}));

export const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} {...props} />
))(({ theme }) => ({
    // border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

export const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
    />
    ))(({ theme }) => ({
    // borderRadius: theme.spacing(1),
    backgroundColor: '#e6e6e6',
    // theme.palette.mode === 'dark'
    // ? 'rgba(255, 255, 255, .01)'
    // : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    // borderRadius: theme.spacing(1),
}));

const getClass = (status) => {
    switch (status.toLowerCase()) {
        case 'ongoing':
            return '#0e8a16'
        case 'suspended':
            return '#b60205'
        case 'completed':
            return '#3e4b9e'
        default:
            return 'lightgray'
    }
}

export const ProjectStatus = styled('span', {
    shouldForwardProp: (prop) => prop !== 'status'
})(({ status }) => ({
    backgroundColor: `${getClass(status)}`,
    display: 'inline',
    padding: '3px',
    borderRadius: '4px',
    color: '#fff',
}));