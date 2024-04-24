
import React from 'react';
import { Card, CardHeader, CardContent, Typography, TextField, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import FileCopyIcon from '@mui/icons-material/FileCopy';

function Question({ question, index, handleDeleteQuestion, handleDuplicateQuestion, handleQuestionTitleChange, handleOptionChange, handleAddOption, handleRemoveOption, renderQuestionInputType}) {
    return (
        <Card raised sx = {{ margin: '20px' }}>
            <CardHeader
            action={
                <>
                        
                        <IconButton onClick={() => handleDuplicateQuestion(index)} size="small" color="primary">
                            <FileCopyIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteQuestion(index)} size = "small" color="error">
                            <DeleteIcon />
                        </IconButton>
                        

                </>
               
            }
                title={
                <>
                <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="subtitle1">{index + 1}.</Typography>
                <TextField
                fullWidth
                label="Question Title"
                variant="outlined"
                value={question.title}
                onChange={(e) => handleQuestionTitleChange(e.target.value, index)}
                />
                </Box>
                </>
                }
                
                
                style={{ paddingBottom: 0 }}
            />
                 <CardContent style={{ paddingTop: 0}}>
                

               
                <div style={{ marginTop: 16 }}>
                {renderQuestionInputType(question, index)}

                </div>
            </CardContent>
        </Card>
    );
}

export default Question;
