import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'


function ViewResponses () {
    const {formId} = useParams();
    const [responses, setResponses] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:3000/api/responses/get/${formId}`)
            .then(response => response.json())
            .then(data => setResponses(data))
            .catch(err => console.error(err));
    }, [formId]);

    if (responses.length === 0) {
        return <div>No responses found!</div>;
    }

    console.log(responses)

    
    return (
        <div>
      <h2>Responses for Form {formId}</h2>
      {responses.map((response) => (
                <div key={response._id}>
                    {response.response_array.map((item) => (
                        <p key={item._id}>Response to Question ID {item.question}: {item.response}</p>
                    ))}
                </div>
            ))}
    </div>
    );


};

export default ViewResponses;