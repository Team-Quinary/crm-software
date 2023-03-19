// import React from 'react';
// import './test.css';
// // "react-phone-number-input": "^3.2.19",
// // import PhoneInput, { isPossiblePhoneNumber, formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';

// export default function Test() {
//     // const [value, setValue] = useState('');

//     return (
//         <div className='container'>
//             {/* <PhoneInput
//                 placeholder="Enter phone number"
//                 value={value}
//                 onChange={setValue}
//                 error={
//                     value 
//                     ? (isPossiblePhoneNumber(value) ? undefined : 'Invalid phone number') 
//                     : 'Phone number required'} 
//             />

//             Is possible: {value && isPossiblePhoneNumber(value) ? 'true' : 'false'}
//             National: {value && formatPhoneNumber(value)}
//             International: {value && formatPhoneNumberIntl(value)} */}
//         </div>
//     )
// }

import React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function Test() {
    const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <div className='test'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                    <DesktopDatePicker
                        label="Date desktop"
                        inputFormat="MM/DD/YYYY"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>
            </LocalizationProvider>
        </div>
    )
}
