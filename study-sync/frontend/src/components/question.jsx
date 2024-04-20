
import React from 'react';
import { Card, CardContent, Typography, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function question({ question, index, handleDeleteQuestion, handleEditQuestion }) {
    return (
        <Card raised>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Question {index + 1}
                </Typography>
                <TextField
                    fullWidth
                    label="Question Title"
                    variant="outlined"
                    value={question.title}
                    onChange={(e) => handleQuestionChange(e.target.value, index)}
                    margin="normal"
                />
                {/* Assuming renderQuestionInputType is passed and handles rendering different input types */}
                <div style={{ marginTop: 16 }}>
                    <IconButton onClick={() => handleDeleteQuestion(index)} color="error">
                        <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEditQuestion(index)} color="primary">
                        <EditIcon />
                    </IconButton>
                </div>
            </CardContent>
        </Card>
    );
}

export default question;
