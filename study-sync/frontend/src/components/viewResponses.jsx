import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { Container, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';



function ViewResponses () {
    const {formId} = useParams();
    const [data, setData] = useState({ responses: [], form: {}, questionTitles: [], userData: [] });
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/api/responses/get/${formId}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                console.log("data: ", data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err)
                setLoading(false);
            
            });
    }, [formId]);

    if (loading) {
        return (
        <Container>
            <CircularProgress />
        </Container>
        )
    }

    if (data.responses.length === 0) {
        return (
            <Container>
                <Typography variant="h4">No responses yet!</Typography>
            </Container>
        )
    }

    
    console.log("form", formId);
    console.log("responses", data.responses);
    
    return (
        <Container>
      <Typography variant="h4" gutterBottom sx = {{mt: 4}}>Responses for Form {data.form.title || formId} </Typography>
      <Box sx={{ overflowX: 'auto' }}>
      <TableContainer component={Paper} sx={{ maxHeight: '70vh', mt: 2 }}>
      <Table stickyHeader aria-label="sticky table" sx={{ width: 'max-content', minWidth: '100%' }}>
        <TableHead>
          <TableRow>
          
            <TableCell align="center" sx={{ minWidth: 120, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', bgcolor: 'grey.200', border: 1 }}>First Name</TableCell>
            <TableCell align="center" sx={{ minWidth: 120, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', bgcolor: 'grey.200', border: 1 }}>Last Name</TableCell>
            <TableCell align="center" sx={{ minWidth: 120, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', bgcolor: 'grey.200', border: 1 }}>Email</TableCell>
            {data.questionTitles.map((title, index) => (
                <TableCell key={index} align="center" sx={{ minWidth: 120, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', bgcolor: 'grey.200', border: 1 }} >{title}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.userData.map((userResponse, index) => (
            <TableRow key={index}>
               
              <TableCell align="center" sx={{ minWidth: 120, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', border: 1 }}>{userResponse.firstName}</TableCell>
                <TableCell align="center" sx={{ minWidth: 120, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', border: 1 }}>{userResponse.lastName}</TableCell>
                <TableCell align="center" sx={{ minWidth: 120, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', border: 1 }}>{userResponse.email}</TableCell>
              {data.questionTitles?.map((title, titleIndex) => {
                                    const answer = userResponse.responses[title] || 'No response';
                                    return <TableCell key={titleIndex} align="right" sx={{ minWidth: 120, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', border: 1 }}>{answer}</TableCell>;
                                })}
            </TableRow>
          ))}
        </TableBody>
        </Table>

        </TableContainer>
        </Box>
        </Container>
      
      
      

    );


};

export default ViewResponses;