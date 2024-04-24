import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox, Button, CircularProgress, Typography } from '@mui/material';

function FormDisplay () {
    const { formId } = useParams();
    const [formData, setFormData] = useState(null);
    const [responses, setResponses] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/responses/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    form: formId,
                    respondent: '660b90fe4a1ea9ad879ed40c',
                    response_array: Object.entries(responses).map(([question, answer]) => ({ question, response: answer }))
                })
            });

            if (response.ok) {
                navigate('/dashboard');

            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetch(`http://localhost:3000/api/forms/get/${formId}`)
            .then(response => response.json())
            .then(data => setFormData(data))
            .catch(err => console.error(err));
    }, [formId]);

    if (!formData) {
        return <CircularProgress />;
    }

    return (
        <div>
            <Typography variant="h4">{formData.title}</Typography>
            <Typography>{formData.description}</Typography>
            <form onSubmit={handleSubmit}>
                {formData.questions.map((question, index) => (
                    <FormControl key={index} component="fieldset" margin="normal">
                        <FormLabel component="legend">{question.questionText}</FormLabel>
                        {question.type === 'text' && <TextField onChange={(event) => setResponses((prevResponses) => ({ ...prevResponses, [question._id]: event.target.value }))} />}
                        {question.type === 'radio' && (
                            <RadioGroup>
                                {question.options.map((option, index) => (
                                    <FormControlLabel key={index} control={<Radio />} label={option} value={option} onChange={(event) => setResponses((prevResponses) => ({ ...prevResponses, [question._id]: event.target.value }))} />
                                ))}
                            </RadioGroup>
                        )}
                        {question.type === 'checkbox' && question.options.map((option, index) => (
                            <FormControlLabel key={index} control={<Checkbox />} label={option} onChange={(event) => setResponses((prevResponses) => ({ ...prevResponses, [question._id]: event.target.checked ? option : '' }))} />
                        ))}
                        {/* Add other field types similarly using Material UI components */}
                    </FormControl>
                ))}
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
        </div>
    );
}

export default FormDisplay;
