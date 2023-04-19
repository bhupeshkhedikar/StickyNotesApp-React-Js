import React from 'react';
import {
    Typography,
    Button,
    Grid,
    Box,
    TextField,
    Modal,
    Card,
    CardContent,
    Avatar,
    CardHeader,
  } from "@mui/material";

function Gridd() {
    return (
        <>
            <Grid container sx={{ backgroundColor: "grey" }}  my={4} rowSpacing={2} columnSpacing={1}>
                <Grid item lg={6}><Box sx={{ backgroundColor: "purple" }} p={2} >item 1</Box></Grid>
                <Grid item xs={6}><Box sx={{backgroundColor:"red"}} p={2} >item 1</Box></Grid>
                <Grid  item xs={6}><Box sx={{backgroundColor:"yellow"}} p={2}>item 1</Box></Grid>
                <Grid  item xs={6}><Box sx={{backgroundColor:"black"}} p={2}>item 1</Box></Grid>
        </Grid>
        </>
    );
}

export default Gridd;