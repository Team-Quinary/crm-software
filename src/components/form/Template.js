import React from "react";
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { IconButton } from "@material-ui/core";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore"
import "./Template.css"
import AddImage from "../images/plus_mark.png"
import UUID from "react-uuid"
import {useNavigate} from "react-router-dom"


function Template(){
    const navigate = useNavigate();
    const CreateForm =() =>{
        const id=UUID()
        console.log(id)
        
        navigate("/FormHeader/:id",{id})
    }
    return(
        <div className="template_section">
            <div className="template_top">
                <div className="template_left">
                    <span style={{fontsize:"16px",color:'#202124' }}>Start New Form</span>
                </div>
                <div className="template_right">
                    <div className="gallery_btn">
                      Template Gallery 
                      <UnfoldMoreIcon fontSize="small"/>

                    </div>
                    <IconButton>
                            <MoreVertIcon fontSize="small"/>
                        </IconButton>
                </div>
            </div>
            <div className="template_body">
            <div className="card" onClick={CreateForm}>
                <img src={AddImage} alt="add" className="card_image"/>
                <p className={'card_title'}>Blank</p>
            </div>
            <div className="card">
                <img src={AddImage} alt="add" className="card_image"/>
                <p className={'card_title'}>Blank</p>
            </div>
            <div className="card">
                <img src={AddImage} alt="add" className="card_image"/>
                <p className={'card_title'}>Blank</p>
            </div>
            </div>

        </div>
    );
}

export default Template;