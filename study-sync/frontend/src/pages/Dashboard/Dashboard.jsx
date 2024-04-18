import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Card, Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


import FormCard from "../../components/formCard";
import StudyGroup from "../../components/studyGroup";
import StudySessionCard from "../../components/studySessionCard";

import Navbar from "../../components/navbar";


function Dashboard() {
    const navigate = useNavigate();
    const [formIndex, setFormIndex] = React.useState(0);
    const [studyGroupIndex, setStudyGroupIndex] = React.useState(0);
    const [forms, setForms] = useState([]);
    const studyGroups = [];
   


    useEffect   (() => {
        const fetchForms = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('/api/forms/get', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },

                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setForms(data);
            } catch (error) {
                console.error('Error fetching forms:', error);
            }
        }
        fetchForms();

    }, []);

    const goToNextForm = () => {
        setFormIndex ((prevIndex) => (prevIndex + 1) % forms.length);
    };

    const goToPrevForm = () => {
        setFormIndex((prevIndex) => {
            if (prevIndex === 0) 
            {
                return forms.length - 1;
            }
            return prevIndex - 1;
          });
    };

    const goToNextStudyGroup = () => {

        setStudyGroupIndex ((prevIndex) => (prevIndex + 1) % studyGroups.length);

    };

    const goToPrevStudyGroup = () => {
        setStudyGroupIndex((prevIndex) => {
            if (prevIndex === 0) 
            {
                return studyGroups.length - 1;
            }
            return prevIndex - 1;
          });
    };



        // console.log('Forms:', forms);


    return (
        <>
      
        <Navbar create ={true} />
        <Box sx={{flexGrow: 1, padding: 3}}>
           
            <Typography variant="h1" gutterBottom sx={{ textAlign: 'center'}} >Dashboard </Typography>
            <Typography variant = "body1" sx={{ textAlign: 'center', width: '100%', mb: '20px' }}>Welcome to your dashboard. Here you can create and share forms, view study groups, and more.</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2, paddingTop: '20px' }}>
                <Button
                    sx={{
                        
                        minWidth: 'auto', 
                        width: theme => theme.spacing(4), 
                        height: theme => theme.spacing(4),
                        '& .MuiTouchRipple-root': {
                        width: '100%', 
                        height: '100%', 
                     },
                    }}
                onClick={goToPrevForm}>
                <ArrowBackIosIcon fontSize="small" />
                </Button>
                    <h2>My Forms</h2>
                    <Button
                    sx={{
                        padding: 0, 
                         minWidth: 'auto', 
                        width: theme => theme.spacing(4), 
                        height: theme => theme.spacing(4), 
                        '& .MuiTouchRipple-root': { 
                        width: '100%', 
                        height: '100%', 
                     },
                    }}
                onClick={goToNextForm}>
                <ArrowForwardIosIcon fontSize="small" />
                </Button>
                </Box>
                    
                    
                    {forms.length > 0 ? (
                       
                            <FormCard form={forms[formIndex]} />
                          
                            
                        ) : (
                            <p>No forms available. Please create one.</p>
                        
                        )}
                   </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}> 
                <Button
                    sx={{
                        
                        minWidth: 'auto', 
                        width: theme => theme.spacing(4), 
                        height: theme => theme.spacing(4),
                        '& .MuiTouchRipple-root': {
                        width: '100%', 
                        height: '100%', 
                     },
                    }}
                onClick={goToPrevStudyGroup}>
                <ArrowBackIosIcon fontSize="small" />
                </Button>
                    <h2>My Study Groups</h2>
                    <Button
                    sx={{
                        
                        minWidth: 'auto', 
                        width: theme => theme.spacing(4), 
                        height: theme => theme.spacing(4),
                        '& .MuiTouchRipple-root': {
                        width: '100%', 
                        height: '100%', 
                     },
                    }}
                onClick={goToNextStudyGroup}>
                <ArrowForwardIosIcon fontSize="small" />
                </Button>
                    </Box>
                    <Box sx={{ padding: 2, width: '90%' }}>
                    <StudyGroup studyGroup = {studyGroups[studyGroupIndex]} />
                    </Box>
                </Card>
                   
                 
                   
                </Grid>
                <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
                    <h2>Upcoming Study Sessions</h2>
                    <StudySessionCard />
                    </Box>
                </Card>
                    
                    
                </Grid>
            </Grid>
        </Box>
        
        
        </>
    );
}

export default Dashboard;
