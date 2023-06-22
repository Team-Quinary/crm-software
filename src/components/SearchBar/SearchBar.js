import React, { useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';

// material-ui imports
import { alpha } from '@mui/material';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlined from '@mui/icons-material/AddCircleOutlineOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

// redux imports
import store from '../../store/_storeConfig';
import { useSelector } from 'react-redux';
import { setCustomerData, sortCustomers } from '../../store/customerHandle';
import { setUserData, sortUsers } from '../../store/userHandle';
import { setProjectData, sortProjects } from '../../store/projectHandle';
import { setSalesData, sortSales } from '../../store/saleHandle';

import SearchBox from '../SearchBox/SearchBox';

// styles
const serachBarStyles = createUseStyles((theme) => ({
    searchBar: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        backgroundColor: theme.palette.background.paper,
        padding: '5px',
        paddingLeft: '20px',
        borderRadius: '8px',
        columnGap: '8px',
        border: '1px solid #ccc',
    },
    searchStack: {
        '& .MuiToggleButtonGroup-root .MuiToggleButton-root': {
            border: `1px solid ${theme.palette.background.primary}`,
            padding: '2px 10px',
            whiteSpace: 'nowrap',
        },
        '& .MuiToggleButton-root': {
            color: theme.palette.text.default,
            backgroundColor: theme.palette.background.secondary,
        },
        '& .MuiToggleButton-root.Mui-selected': {
            color: theme.palette.text.primary,
            backgroundColor: alpha(theme.palette.background.primary, 0.85),
        }
    },
    sortBy: {
        color: theme.palette.text.red,
        whiteSpace: 'nowrap',
        fontWeight: 500,
    },
    addIcon: {
        color: theme.palette.text.default,
    },
    hiddenMenu: {
        '& .MuiMenu-list': {
            padding: '0 10px',
        },
    }
}));

const SearchBar = (props) => {
    const {
        page,
        searchBoxText,
        setSearchBoxText
    } = props;

    const styles = serachBarStyles();

    const [anchorElement, setAnchorElement] = useState(null);
    const [isDrop, setIsDrop] = useState(false);
    const searchBoxRef = useRef(null);

    const pageData = useSelector((state) => state.entities[page]);
    const sortFieldList = pageData.sortFields;
    const searchByList = pageData.searchParams;

    const sortField = pageData.variables.sortField;
    const category = pageData.variables.category;
    const descending = pageData.variables.descending;
    const open = pageData.variables.open;

    let setData = null;
    let sort = null;

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

    const handleSort = (_event_, newSort) => {
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
        setAnchorElement(searchBoxRef.current);
        setIsDrop(!isDrop);
    };

    const hideSearchMenu = () => {
        setAnchorElement(null);
        setIsDrop(!isDrop);
    };

    return (
        <div className={styles.searchBar}>
            <Stack
                direction='row'
                spacing={1}
                alignItems='center'
                className={styles.searchStack}
            >
                <Typography className={styles.sortBy}>Sort By:</Typography>

                <ToggleButtonGroup
                    exclusive
                    value={sortField}
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
                        {/* {descending ? 'descending' : 'ascending'} */}
                        descending
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>
            <Stack
                direction='row'
                justifySelf='flex-end'
                alignItems='center'
                className={styles.searchStack}
                spacing={1}
            >
                <SearchBox
                    searchBoxRef={searchBoxRef}
                    placeholder={searchByList.filter(searchBy => (searchBy.value === category))[0].text}
                    searchBoxText={searchBoxText}
                    setSearchBoxText={setSearchBoxText}
                />
                <IconButton
                    onClick={showSearchMenu}
                    className={styles.dropIcon}
                >
                    {!isDrop ? <KeyboardArrowDownOutlinedIcon /> : <KeyboardArrowUpOutlinedIcon />}
                </IconButton>
                <Menu
                    sx={{ mt: '8px' }}
                    anchorEl={anchorElement}
                    keepMounted
                    open={Boolean(anchorElement)}
                    onClose={hideSearchMenu}
                    className={styles.hiddenMenu}
                >
                    <FormControl sx={{ m: '10px' }}>
                        <RadioGroup
                            value={category}
                            onChange={(e) => {
                                store.dispatch(setData('category', e.target.value));
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

                <Tooltip title={"Add new " + page}>
                    <IconButton
                        onClick={() => store.dispatch(setData('open', !open))}
                        className={styles.addIcon}
                    >
                        <AddCircleOutlined />
                    </IconButton>
                </Tooltip>
            </Stack>
        </div>
    )
}

export default SearchBar;
