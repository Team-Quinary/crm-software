import React from 'react';
import axios from 'axios';

export const getData = async (url) => {

    const response = await axios.get(url);
    return response.data;

}

//use the following path to call the api

//import the getData function
//import {getData} from "give_location"

//call the function and pass in the required parameters
// const url = 'https://localhost8080/data';
// const data = await getData(url);
// console.log(data);
