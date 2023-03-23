import React from "react";

import Box from "@mui/material/Box";
import styled from "@emotion/styled";

export const PageContainer = styled(Box)(({theme}) => ({
    backgroundColor:"#fff",
    alignContent:"center",
    justifyContent:"center",
}))

export const DataGridContainer = styled(Box)(({theme}) => ({
    backgroundColor:"#fff",
    // display:"flex",
    justifyContent:"center",
    width:"80%",
    height:"100%",
    padding:"20px",
    
    marginLeft:"245px",
    marginRight:"auto",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    
}))

export const DataGridColumnContainer = styled(Box)(({theme}) => ({
    backgroundColor:"#e3f2fd",
    color:"#1976d2"
}))

export const PlanDetailContainer = styled(Box)(({theme})=>({
    backgroundColor:"#fff",
    justifyContent:"center",
    marginLeft:"500px",
    marginRight:"auto",
    marginTop:"100px"
}))