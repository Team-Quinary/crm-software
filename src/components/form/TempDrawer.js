import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu"
import { IconButton } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

function TempDrawer(){
    const [State,setState] = useState({
        left:false
    })
    const toogleDrawer = (anchor,open) =>(event) =>{
        setState({...State,[anchor]:open});
    };
    const list =(anchor)=>{
        <div>
            <List>
                <ListItem>
                    SideBar
                </ListItem> 
            </List>
        </div>
    };
    return(
        <div>
            <React.Fragment>
             <IconButton onClick={toogleDrawer("left",true)}>
                <MenuIcon/>
                </IconButton>
                <Drawer open={State["left"]} onClose={toogleDrawer("left",false)} anchor={'left'}>
                {list("left")}
                </Drawer>
        </React.Fragment>
        </div>
    );
}
export default TempDrawer;