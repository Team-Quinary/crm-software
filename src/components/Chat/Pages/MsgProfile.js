import React from 'react'
import Camera from '../Components/SVG/Camera'
// import { Avatar } from '@mui/material'
import image from "../Images/avatar.png"

export default function MsgProfile() {
  return (
    <section>
        <div className='profile_container'>
            <div className='img_container'>
            <img src={image} alt="img" />
            <div className='overlay'>
                <label htmlFor='photo '>
                    <Camera/>
                </label>
                <input type="file" style={{display: 'none'}} id='photo'/>    
            </div>
            </div>
        </div>
        <div className="text_container">
            <h3>User Name:</h3>
            <p>User Email</p>
            <hr/>
            <small>joined on:...</small>


        </div>
    </section>
  )
}
