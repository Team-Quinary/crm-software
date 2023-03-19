import React from "react";
import {FiStar,FiSettings} from "react-icons/fi"
import {AiFillEye} from "react-icons/ai"
import { IconButton } from "@material-ui/core";
import AvatarImg from "../images/avatar.png"
import {IoMdFolderOpen} from "react-icons/io"

import ColorLensIcon from '@material-ui/icons/ColorLens'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import './FormHeader.css'

function FormHeader(){
    return(
        <div className="form_header">
            <div className="form_header_left">
                <img src="https://icon-library.com/images/forms-icon/forms-icon-1.jpg" style={{height:'45px',width:'40px'}} alt="form"/>
                <input type="text" placeholder="Untitled Form" className="form_name"/>
                <IoMdFolderOpen className="form_header_Icon" style={{marginRight:"10px"}}/>
                <FiStar className="form_header_Icon" style={{marginRight:"10px"}}/>
                <span style={{fontSize:'12px',fontWeight:'600'}}>All changes saved in Drive</span>
            </div>
            <div className="form_header_right">
                <IconButton>
                    <ColorLensIcon size="small" className="form_header_icon"/>
                </IconButton>
                <IconButton>
                    <AiFillEye className="form_header_icon"/>
                </IconButton>
                <IconButton>
                    <FiSettings className="form_header_icon"/>
                </IconButton>
                <Button variant="container" color="primary" href="#contained-buttons">send</Button>
                <IconButton>
                    <MoreVertIcon className="form_header_icon"/>
                </IconButton>
                <IconButton>
                    <Avatar style={{height:'30px',width:'30px'}} className="form_header_icon" src={AvatarImg}/>
                </IconButton>
            </div>
            
        </div>
    );
}
export default FormHeader;