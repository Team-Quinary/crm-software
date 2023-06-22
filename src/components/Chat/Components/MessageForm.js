import React from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';

function Message_form( {handleSubmit , text, setText}) {
  return (
    <div className='message_form'>
        <label htmlFor='img'>
        <AttachFileIcon/>
        </label>
        <input
            type="file"
            id="img"
            accept='image/*'
            style={{display:'none'}}
        />
        <div>
            <input type="text" placeholder='Enter Message' value={text} onChange={e =>setText(e.target.value)}/>
        </div>
        <div>
            <button className='btn' onClick={handleSubmit}>Send</button>
        </div>
            
    </div>

  )
}

export default Message_form