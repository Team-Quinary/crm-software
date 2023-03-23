// import React from 'react';
// import user from "../../assets/images/user.png";

// import "./styles/DropdownMenu.styles.css";


// export default function DropdownMenu() {
//   return (
//     <div className="dropdown-menu">
//         <h3>Sithira<br/><span>Software Engineer</span></h3>
//       <ul>
//         <DropdownItem img={user} text={"My profile"}/>
//     </ul>
//     </div>
//   )
// }

// function DropdownItem(props) {
//     return(
//         <li className="dropdownItem">
//             <img src={props.img}></img>
//             <a>{props.text}</a>
//         </li>
//     )
// }


import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';



const CustomMenu = styled(Menu)(({theme}) => ({
    position: "absolute",
    top:"100px",
    right: "20px",
    backgroundColor: "blueviolet",
    borderRadius: "10px",
    padding: "10px 20px",
    width: "200px",
    height: "500px",

    '&::before':{
        content: '""',
        position: "absolute",
        top: "-5px",
        right: "20px",
        height: "20px",
        width: "20px",
        background: "blueviolet",
        transform: "rotate(45deg)",
    }
}))

const CustomMenuItem = styled(MenuItem)(({theme}) => ({
    backgroundColor:"transparent",
  //   '&:hover': {
  //     backgroundColor: alpha(theme.palette.common.white, 0.1),
  // },
  // '&:focus': {
  //     backgroundColor: alpha(theme.palette.common.white, 0.2),
  // },
  // '& .MuiListItemIcon-root': {
  //     minWidth: '40px',
  // },
  // '& .MuiListItemText-primary': {
  //     fontSize: theme.typography.pxToRem(16),
  //     fontWeight: theme.typography.fontWeightRegular,
  // },
  // '&:active': {
  //     backgroundColor: alpha(theme.palette.common.white, 0.3),
  // },
  // '& .MuiTouchRipple-root': {
  //     color: alpha(theme.palette.common.white, 0.4),
  // },
  // '& .Mui-selected': {
  //     backgroundColor: alpha(theme.palette.common.white, 0.1),
  // },
  // '& .Mui-selected .MuiListItemIcon-root': {
  //     color: theme.palette.primary.main,
  // },
}))

export default function DropdownMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

  return (
    <div>
      {/* <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button> */}
      <CustomMenu
        id="basic-menu"
        //anchorEl={anchorEl}
        open={true}
        //onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <CustomMenuItem >Profile</CustomMenuItem>
        <CustomMenuItem >My account</CustomMenuItem>
        <CustomMenuItem >Logout</CustomMenuItem>
      </CustomMenu>
    </div>
  );
}