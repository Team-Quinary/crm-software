import React, { useState, useRef } from 'react';
import { useStyles } from '../Styles';
import { Search, SearchIconWrapper, StyledInputBase } from '../components/StyledComponents';
import { AddCircleOutlined } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import store from '../store/_storeConfig';
import { useSelector } from 'react-redux';
import { setCustomerData, sortCustomers } from '../store/customerHandle';
import { setUserData, sortUsers } from '../store/userHandle';
import { setProjectData, sortProjects } from '../store/projectHandle';
import { setSalesData, sortSales } from '../store/saleHandle';

export default function SearchBar({ page, search, setSearch }) {
    var setData = null;
    var sort = null;

    switch (page) {
        case 'customers':
            setData = setCustomerData;
            sort = sortCustomers;
            break;
        case 'users':
            setData = setUserData;
            sort = sortUsers;
            break;
        case 'projects':
            setData = setProjectData;
            sort = sortProjects;
            break;
        case 'sales':
            setData = setSalesData;
            sort = sortSales;
            break;
        default:
            alert('Invalid page type...!');
    }

    const { classes } = useStyles();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [drop, setDrop] = useState(false);
    const searchBoxRef = useRef(null);

    const sortFieldList = useSelector((state) => state.entities[page].sortFields);
    const searchByList = useSelector((state) => state.entities[page].searchParams);
    const sortField = useSelector((state) => state.entities[page].variables.sortField);
    const category = useSelector((state) => state.entities[page].variables.category);
    const descending = useSelector((state) => state.entities[page].variables.descending);
    const open = useSelector((state) => state.entities[page].variables.open);

    const handleSort = (event, newSort) => {
        if (newSort !== null) {
            store.dispatch(setData('sortField', newSort));
            store.dispatch(sort());
        }
    };

    const handleDescending = () => {
        store.dispatch(setData('descending', descending * -1));
        store.dispatch(sort());
    }

    const showSearchMenu = () => {
        setAnchorElUser(searchBoxRef.current);
        setDrop(!drop);
    };

    const hideSearchMenu = () => {
        setAnchorElUser(null);
        setDrop(!drop);
    };

    return (
        <div className={classes.searchBar}>
            <Stack
                direction='row'
                spacing={1}
                alignItems='center'
                className={classes.searchStack}
            >
                <Typography>Sort By:</Typography>

                <ToggleButtonGroup
                    value={sortField}
                    exclusive
                    onChange={handleSort}
                >
                    {sortFieldList.map(field => (
                        <ToggleButton value={field.value} key={field.value}>
                            {field.text}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>

                <ToggleButtonGroup
                    exclusive
                    value={(descending === -1) ? 'descending' : null}
                    onChange={handleDescending}
                >
                    <ToggleButton value="descending">
                        descending
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>
            <Stack
                direction='row'
                justifySelf='flex-end'
                alignItems='center'
                className={classes.searchStack}
                spacing={1}
            >
                <Search
                    ref={searchBoxRef}
                >
                    <SearchIconWrapper>
                        <SearchRoundedIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        value={search}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Search>
                <IconButton
                    onClick={showSearchMenu}
                    className={classes.dropIcon}
                >
                    {!drop ? <KeyboardArrowDownOutlinedIcon /> : <KeyboardArrowUpOutlinedIcon />}
                </IconButton>
                <Menu
                    sx={{ mt: '8px' }}
                    anchorEl={anchorElUser}
                    keepMounted
                    open={Boolean(anchorElUser)}
                    onClose={hideSearchMenu}
                    className={classes.hiddenMenu}
                >
                    <FormControl sx={{ m: '10px' }}>
                        <RadioGroup
                            value={category}
                            onChange={(e) => {
                                store.dispatch(setData('category', e.target.value));
                                hideSearchMenu();
                            }}
                        >
                            {searchByList.map(searchBy => (
                                <FormControlLabel
                                    value={searchBy.value}
                                    control={<Radio />}
                                    label={searchBy.text}
                                    key={searchBy.value}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Menu>
                <IconButton
                    onClick={() => store.dispatch(setData('open', !open))}
                >
                    <AddCircleOutlined />
                </IconButton>
            </Stack>
        </div>
    )
}

