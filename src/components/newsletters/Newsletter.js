import React, { useState } from 'react';
import './Newsletter.css'
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
//material uis

const checkedIcon = <CheckBoxIcon fontSize="small" />;
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
//selection checkbox to select companies for sending newsletters


//dummy data for the companies
const companyData = [
    { Tittle: 'Virtusa'},
    { Tittle: 'Informatics International Limited'},
    { Tittle: 'IFS (Industrial and Financial Systems)'},
    { Tittle: 'John Keells IT'},
    { Tittle: 'Millennium IT'},
    { Tittle: "CodeGen International"},
    { Tittle: 'WSO2'},
    { Tittle: 'Calcey Technologies'},
    { Tittle: 'Zone 24×7'},
    { Tittle: 'Rootcode Labs'},
    { Tittle: 'LSEG (London Stock Exchange Group)'},
    { Tittle: 'Vetstoria'},
    { Tittle: 'Aeturnum'},
    { Tittle: 'Surge Global'},
    { Tittle: 'Sysco LABS Sri Lanka'},
    { Tittle: "Circles.Life"},
    { Tittle: 'Ascentic'},
    { Tittle: 'Mitra Innovation'},
    { Tittle: 'Axiata Digital Labs'},
    { Tittle: 'Creative Software'},
    { Tittle: 'Fortude'},
    { Tittle: 'Nagarro'},
    { Tittle: 'Arimac'},
    { Tittle: "Attune"},
    { Tittle: 'Wiley Sri Lanka'},
    { Tittle: 'Cambio Software Engineering'},
    { Tittle: 'Omobio (Pvt) Ltd'},
    { Tittle: 'Motion Miracles'},
    { Tittle: 'BOC Bank'},
    { Tittle: 'AIA Insurance'},
    { Tittle: 'Amana Bank'},
    { Tittle: 'Peoples Bank' },
];



function Newsletter() {
    const [Tittle, setTittle] = useState('');
    const [content, setContent] = useState('');
    //functional component,newsletter and set usestate variables Tittle and content ,initially empty string

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Tittle: ${Tittle}`);
        console.log(`Content: ${content}`);
    }
    //after submit the form , call this function can prevent usestate values as console by calling this funcion or refreshing the page


    //Autocomple ui component, allows user to select multiple options by clicking checkboxes
    //props pass data from parents component to this component
    return (
        <div className='Main_container'>
            <div className='form_container'>
                <div>
                    
                        <label htmlFor="Tittle">Select:</label> 
                        <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            options={companyData}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.Tittle}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox  className='checkbox_select'
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.Tittle}
                                </li>
                            )}
                            style={{ width: 500 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Checkboxes" placeholder="Favorites" />
                            )}
                        />
                </div>
                <form onSubmit={handleSubmit}>
                    <div >
                        <label htmlFor="Tittle">Tittle:</label>
                        <input type="text" className="Tittle" value={Tittle} onChange={(event) => setTittle(event.target.value)} />
                        <br />
                    </div>
                    <div>
                        <label htmlFor="content">Content:</label>
                        <textarea id="content" value={content} onChange={(event) => setContent(event.target.value)} />
                        <br />
                    </div>
                    <div>
                        <button className="button " type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Newsletter;

