import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function FormDisplay () {
    const { formId } = useParams();

    const [formData, setFormData] = useState(null);

    const [responses, setResponses] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/responses/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    form: formId,
                    respondent: '660b90fe4a1ea9ad879ed40c',
                    response_array: Object.entries(responses).map(([question, answer]) => ({
                        question: question,
                        response: answer
                      }))
                })

            });

        } catch (error) {
            console.error(error);
        }
        
        

    }

    useEffect(() => {
        fetch(`http://localhost:3000/api/forms/get/${formId}`)
            .then(response => response.json())
            .then(data => setFormData(data))
            .catch(err => console.error(err));
    }, [formId]);

    if (!formData) {
        return <div>Loading form...</div>;
    }

    return (
        <div>
            <h2>{formData.title}</h2>
            <p>{formData.description}</p>
            <form onSubmit={handleSubmit}>
                {formData.questions.map((question, index) => (
                    <div key = {index}>
                        <label>{question.questionText}</label>
                        {question.type === 'text' && <input type = "text" onChange = {(event) => setResponses((prevResponses => ({ ...prevResponses, [question._id]: event.target.value})))}/>}
                        {question.type === 'radio' && question.options.map((option, index) => (
                            <div key = {index}>
                                <input type = "radio" name = {question.questionText} value = {option} />
                                <label>{option}</label>
                            </div>
                        ))}
                        {question.type === 'checkbox' && question.options.map((option, index) => (
                            <div key = {index}>
                                <input type = "checkbox" name = {question.questionText} value = {option} />
                                <label>{option}</label>
                            </div>
                        ))}
                        {question.type === 'dropdown' && (
                            <select>
                                {question.options.map((option, index) => (
                                    <option key = {index} value = {option}>{option}</option>
                                ))}
                            </select>
                        )}
                        {question.type === 'date' && <input type = "date" />}
                        {question.type === 'time' && <input type = "time" />}
                        {question.type === 'file' && <input type = "file" />}
                        {question.type === 'range' && <input type = "range" />}
                        {question.type === 'email' && <input type = "email" />}
                        {question.type === 'number' && <input type = "number" />}
                        {question.type === 'tel' && <input type = "tel" />}
                        {question.type === 'url' && <input type = "url" />}
                    </div>
                    ))}
                    <button type = "submit">Submit</button>
            </form>
        </div>
    );
}

export default FormDisplay;