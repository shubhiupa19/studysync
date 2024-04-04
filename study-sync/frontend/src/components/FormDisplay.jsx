import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function FormDisplay () {
    const { formId } = useParams();

    const [formData, setFormData] = useState(null);

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
            <form>
                {formData.questions.map((question, index) => (
                    <div key = {index}>
                        <label>{question.questionText}</label>
                        {question.type === 'text' && <input type = "text" />}
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