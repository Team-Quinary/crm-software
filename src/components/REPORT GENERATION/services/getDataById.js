import React from "react";
import axios from "axios";

export const getDataById = async (url,id) => {
    const response = await axios.get(url+ id.toString());
    return response.data;

}