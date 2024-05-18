import React from 'react';
import { Modal, Typography, TextField, Checkbox, Radio, FormControl, Select, MenuItem, Button, Box, Paper, Card, CardContent, CardHeader } from '@mui/material';

const PreviewForm = ({ formDraft, onClose }) => {
  const renderPreviewQuestion = (question) => {
    switch (question.type) {
      case 'text':
        return <TextField label={question.title || 'Untitled'} disabled />;
      case 'checkbox':
        return question.options.map((option, index) => (
          <div key={index}>
            <Checkbox disabled />
            <Typography variant="body1">{option}</Typography>
          </div>
        ));
      case 'radio':
        return question.options.map((option, index) => (
          <div key={index}>
            <Radio disabled />
            <Typography variant="body1">{option}</Typography>
          </div>
        ));
      case 'dropdown':
        return (
          <FormControl disabled>
            <Select>
              {question.options.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'time':
        return <TextField type="time" disabled />;
      case 'date':
        return <TextField type="date" disabled />;
      default:
        return null;
    }
  };

  const handleModalContentClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
        onClick={onClose}
      >
        <Paper
          onClick={handleModalContentClick}
          sx={{
            width: '80%',
            maxWidth: '800px',
            height: '80%',
            maxHeight: '800px',
            backgroundColor: 'background.paper',
            padding: (theme) => theme.spacing(2, 4, 3),
            outline: 0,
            boxShadow: 24,
            borderRadius: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" sx={{ marginBottom: 2}} >{formDraft.title || 'Untitled'}</Typography>
          <Typography variant="body1" sx={{ marginBottom: 3}}>{formDraft.description || 'No Description'}</Typography>
          {formDraft.questions.map((question, index) => (
            <Card key={index} raised sx={{ width: '65%', marginBottom: 2, display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center', }}>
            <CardHeader
              title={<Typography variant="h6">{question.title || 'Untitled'}</Typography>}
              sx={{ paddingBottom: 2 }}
            />
            <CardContent sx={{
                  paddingTop: 0,
                  
                }}>
              {renderPreviewQuestion(question)}
            </CardContent>
          </Card>
          ))}
          <Button onClick={onClose} sx={{ marginTop: '20px' }}>
            Close Preview
          </Button>
        </Paper>
      </Box>
    </Modal>
  );
};

export default PreviewForm;
