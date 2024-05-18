import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Typography, Button, Grid, Container, Snackbar } from '@mui/material';

function AccountSettings() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''

    });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
       

    };

    const handleSubmit = async (e) => {
        console.log("Form Data:", formData);
        e.preventDefault();
        try {
            const response = await fetch ('/api/users/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({

                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            setOpenSnackbar(true);
            setTimeout(() => {

                setOpenSnackbar(false);
                navigate('/dashboard');
            }, 2000);



        } catch(error) {
            console.error('There was an error!', error);
        }


    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);


    };


    return (   
        
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom> Account Settings </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First Name"
                            name="firstName"
                            onChange={handleChange}
                            value={formData.firstName}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Last Name"
                            name="lastName"
                            onChange={handleChange}
                            value={formData.lastName}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Confirm Password"
                            name="confirmPassword"
                            onChange={handleChange}
                            value={formData.confirmPassword}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth> Update </Button>
                    </Grid>
                </Grid>
            </form>
            <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackBar}
            message="Account updated successfully!"
            />
        
        </Container>
    )
    
    ;


  
    
  
}

export default AccountSettings;