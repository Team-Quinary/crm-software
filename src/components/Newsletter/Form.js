import React, { useState } from 'react';
import './Form.css';
import Display from './Display';

export default function Form() {
    const [imageFile, setImageFile] = useState(null);
    const [Heading, setHeading] = useState('');
    const [SubHeading, setSubHeading] = useState('');
    const [Description, setDescription] = useState('');

    function handleImageUpload(event) {
        const file = event.target.files[0];
        setImageFile(file);
    }

    function changeHeading(text) {
        setHeading(text);
    }

    function changeSubHeading(text) {
        setSubHeading(text);
    }

    function changeDescription(text) {
        setDescription(text);
    }

    return (
        <div className="form-container">
            <div className="form-cell">
                <div className="form-field">
                    <label className="form-label">Heading:</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Heading"
                        value={Heading}
                        onChange={(e) => changeHeading(e.target.value)}
                    />
                </div>
                <div className="form-field">
                    <label className="form-label">Sub Heading:</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Sub Heading"
                        value={SubHeading}
                        onChange={(e) => changeSubHeading(e.target.value)}
                    />
                </div>
                <div className="form-field">
                    <label className="form-label">Upload Image:</label>
                    <input
                        type="file"
                        className="form-input"
                        onChange={handleImageUpload}
                    />
                </div>
                <div className="form-field">
                    <label className="form-label">Description:</label>
                    <textarea
                        className="form-textarea"
                        placeholder="Description"
                        value={Description}
                        onChange={(e) => changeDescription(e.target.value)}
                    ></textarea>
                </div>
            </div>
            <div className="form-cell">
                <Display Head={Heading} Sub={SubHeading} Des={Description} Img={imageFile} />
            </div>
        </div>
    );
}
