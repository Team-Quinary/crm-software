import React from 'react';

// material-ui imports
import { alpha, styled } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.8),
    '&:hover': {
        border: '1px solid #00d',
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
    border: '1px solid gray',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.down('990')]: {
            width: '12ch',
        },
    },
}));

const SearchBox = (props) => {
    const {
        searchBoxRef,
        placeholder,
        searchBoxText,
        setSearchBoxText,
    } = props;

    return (
        <div className='search-box'>
            <Search
                ref={searchBoxRef}
            >
                <SearchIconWrapper>
                    <SearchRoundedIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder={"Search " + placeholder}
                    value={searchBoxText}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setSearchBoxText(e.target.value)}
                />
            </Search>
        </div>
    )
};

export default SearchBox;
