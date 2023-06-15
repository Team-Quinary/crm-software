import React, { useState } from 'react'
import './Form.css'
import Display from './Display';

export default function Form() {
    const [imageFile,setImageFile] = useState(null);
    const [Heading, setHeading] = useState("");
    const [SubHeading,setSubHeading] = useState("");
    const [Description,setDescription] = useState("");

    function handleImageUpload(event){
        const file = event.target.files[0];
        setImageFile(file);
    }
    function changeHeading(text){
        setHeading(text);
    }
    function changeSubHeading(text){
        setSubHeading(text);
    }
    function changeDescription(text){
        setDescription(text);
    }

  return (
    <div className='parent'>
      <div className='left_cell'>
        <p>Heading:</p>
        <input type='text' className='Heading' placeholder='Heading' onChange={(e)=>{changeHeading(e.target.value)}}/>
        <p/>
        <p>Sub Heading:</p>
        <input type='text' className='Sub_Heading' placeholder='Sub_Heading' onChange={(e)=>{changeSubHeading(e.target.value)}}/>
        <p/>
         <p>Upload Image</p>
        <input type='file' className='image' onChange={handleImageUpload}/>
        <p/>
        <p>Description:</p>
        <textarea type='text' className='Description' placeholder='Description' onChange={(e)=>{changeDescription(e.target.value)}}></textarea>
        <p/>
      </div>
      <div className='right_cell'>
        <Display Head={Heading} Sub={SubHeading} Des={Description} Img={imageFile}/>
      </div>
    </div>
  )
}
