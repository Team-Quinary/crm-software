import React from "react";
import './Header.css'
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search"
import AppIcon from "@material-ui/icons/Apps"
import Avatar from "@material-ui/core/Avatar";
import TempDrawer from "./TempDrawer";
function Header(){
    return(
        <div className="header">
            <div className="header_info">
               <TempDrawer/>
                <img src="https://icon-library.com/images/forms-icon/forms-icon-1.jpg" alt="form" className="image"/>
           <div className="info">
            Forms

           </div>
            </div>
            <div className="header_search">
               <IconButton> <SearchIcon/></IconButton>
                <input type="text" placeholder="Search"/>
            </div>
            <div className="header_right">
                <IconButton>
                <AppIcon/>
                </IconButton> 
                <IconButton>
                    <Avatar/>
                </IconButton>
                
            </div>
        </div>

        
    );
}

export default Header;