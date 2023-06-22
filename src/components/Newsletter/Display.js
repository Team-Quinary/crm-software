import React, { useState } from 'react'
import './Display.css'

export default function Display({ Head, Sub, Des, Img }) {

    const [formsState, setFormState] = useState({});

    const changeHandler = (event) => {
        setFormState({ ...formsState, [event.target.name]: event.target.value });
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.target.style.height = 'auto';
            event.target.style.height = `${event.target.scrollHeight}px`;
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const config = {
            SecureToken: '8d52e579-7cf8-40fe-8086-c66c43d3cda3 ',
            To: 'waruni@yopmail.com',
            From: formsState.email,
            Subject: "This is the subject",
            Body: `${formsState.name} connected to you over email`,
        };
        if (window.Email) {
            window.Email.send(config).then(() => alert("email sent successfully"));
        }
    };

    return (
        <div className='display'>
            <div className='heading'>
                <p style={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '28px', textAlign: 'center' }}>{Head}</p>
            </div>
            <div className='sub_heading'>
                <p style={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '24px', textAlign: 'center' }}>{Sub}</p>
            </div>
            <div className='image'>
                {Img && <img src={URL.createObjectURL(Img)} alt='Uploaded' className='uploaded_image' />}
            </div>
            {Des && (
                <div className='description'>
                    <textarea
                        style={{ fontFamily: 'sans-serif', fontWeight: 'normal', fontSize: '16px', textAlign: 'left' }}
                        value={Des}
                        onChange={() => { }}
                        onKeyPress={handleKeyPress}
                        placeholder='Description'
                        className='description'
                    />
                </div>
            )}

            <div className='email'>
                <form className='email_form' onSubmit={submitHandler}>
                    <input type='text' name="name" placeholder="Your Name" value={formsState.name} onChange={changeHandler} className='border' />
                    <input type='email' name="email" placeholder='Your Email' value={formsState.email} onChange={changeHandler} className='border' />
                    <input type='submit' value="send email" />
                </form>
            </div>
        </div>
    )
}
