        import React, { useEffect, useState } from 'react';
        import { useParams, useNavigate } from 'react-router-dom';
        import Navbar from '../../components/navbar';
        import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
        import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
        import { faClone, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
        import { Box, TextField, Button, Paper, IconButton, Typography, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Checkbox, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel, Select, MenuItem} from '@mui/material';
        import CloseIcon from '@mui/icons-material/Close';
        import CopyIcon from '@mui/icons-material/ContentCopy';
        import DeleteIcon from '@mui/icons-material/Delete';
        import CloneIcon from '@mui/icons-material/FileCopy';
        import styles from './CreateForm.module.css';
        import PreviewForm from '../PreviewForm/PreviewForm';
        import Question from '../../components/question';
        import { v4 as uuidv4 } from 'uuid';
    

        function CreateForm() {
            const navigate = useNavigate();
            const { formId } = useParams();
            const [isPreviewing, setIsPreviewing] = useState(false);
            const [showModal, setShowModal] = useState(false);
            const [formLink, setFormLink] = useState('');    
            const [formDraft, setFormDraft] = useState({ title: '', description: '', questions: [] });

            useEffect(() => {
                if(formId) {
                    
                    //if the form id has been provided, fetch existing data
                    fetch(`/api/forms/get/${formId}`)
                        //fetch the form data
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.json();
                        })

                    
                        
                        //set the form data to the state
                        .then((data) => {
                            
                            setFormDraft(data);
                            
                        })
                        .catch((error) => {
                            console.error('Error fetching form:', error);
                        });

                    }
                    else 
                    {
                        //if no form id has been provided, create a new form
                        setFormDraft({ title: '', description: '', questions: [] });
                    }

            }, [formId]);
            const [items, setItems] = useState([
                { id: 'text', type: 'text', content: 'Text' },
                { id: 'checkbox', type: 'checkbox', content: 'Checkbox' },
                { id: 'radio', type: 'radio', content: 'Radio'},
                { id: 'dropdown', type: 'dropdown', content: 'Dropdown'},
                { id: 'date', type: 'date', content: 'Date'},
                { id: 'time', type: 'time', content: 'Time'},
                { id: 'file', type: 'file', content: 'File'},
                { id: 'rating', type: 'rating', content: 'Rating'},
                { id: 'range', type: 'range', content: 'Range'},
                { id: 'email', type: 'email', content: 'Email'},
                { id: 'number', type: 'number', content: 'Number'},
                { id: 'tel', type: 'tel', content: 'Tel'},
                { id: 'url', type: 'url', content: 'URL'},
            ]);

        
            const handleFormTitleChange = (e) => {
                setFormDraft(prevDraft => ({ ...prevDraft, title: e.target.value }));
            };

            const handleFormDescriptionChange = (e) => {
                setFormDraft(prevDraft => ({ ...prevDraft, description: e.target.value }));
            };

            const renderQuestionInputType = (question, questionIndex) => {
                switch (question.type) {
                    case 'text':
                        return (
                            <TextField
                              type="text"
                              placeholder="Answer"
                              fullWidth
                              margin="normal"
                              variant="outlined"
                            />
                          );
                        case 'checkbox':
                            return (
                              <div>
                                {question.options.map((option, optionIndex) => (
                                  <div key={optionIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                    
                                        <Checkbox
                                          id={`question-${questionIndex}-option-${optionIndex}`} 
                                          style={{ marginRight: '8px' }}
                                        />
                                      
                                        <TextField 
                                          fullWidth
                                          value={option} 
                                          onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)} 
                                          variant="outlined"
                                          size="small"
                                          placeholder = "New Option"
                                          style={{ marginLeft: '8px', marginRight: '8px', flexGrow: 1 }} 
                                        />

                                    <IconButton onClick={() => handleRemoveOption(questionIndex, optionIndex)} size="small" color="error" style = {{ width: '32px', height: '32px', '&:hover': { width: '32px', height: '32px'}, }}>
                                      <DeleteIcon />
                                    </IconButton>
                                  </div>
                                ))}
                                <Button onClick={() => handleAddOption(questionIndex)} variant="contained" color="primary" style={{ marginTop: '8px' }}>
                                  Add Option
                                </Button>
                              </div>
                            );
                          
                    case 'radio':
                        return (
                            <div>
                            {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                
                                    <Radio
                                      id={`question-${questionIndex}-option-${optionIndex}`} 
                                      style={{ marginRight: '8px' }}
                                    />
                                  
                                    <TextField 
                                      fullWidth
                                      value={option} 
                                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)} 
                                      variant="outlined"
                                      size="small"
                                      placeholder = "New Option"
                                      style={{ marginLeft: '8px', marginRight: '8px', flexGrow: 1 }} 
                                    />

                                <IconButton onClick={() => handleRemoveOption(questionIndex, optionIndex)} size="small" color="error" style = {{ width: '32px', height: '32px', '&:hover': { width: '32px', height: '32px'}, }}>
                                  <DeleteIcon />
                                </IconButton>
                              </div>
                            ))}
                            <Button onClick={() => handleAddOption(questionIndex)} variant="contained" color="primary" style={{ marginTop: '8px' }}>
                              Add Option
                            </Button>
                          </div>
                        );
                    
                    case 'dropdown':
                        return (
                            <Box key={questionIndex}>
                              <FormControl fullWidth>
                                <Select disabled value="">
                                  {question.options.map((option, optionIndex) => (
                                    <MenuItem key={optionIndex} value={option}>
                                      {option}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <Box>
                                {question.options.map((option, optionIndex) => (
                                  <Box key={optionIndex} sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                                    <TextField
                                      type="text"
                                      value={option}
                                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                                      sx={{ marginRight: 1 }}
                                    />
                                    <Button variant="contained" color="error" onClick={() => handleRemoveOption(questionIndex, optionIndex)}>
                                      Remove
                                    </Button>
                                  </Box>
                                ))}
                              </Box>
                              <Button variant="contained" color="primary" onClick={() => handleAddOption(questionIndex)} sx={{ marginTop: 1 }}>
                                Add Option
                              </Button>
                            </Box>
                          );
                    case 'date':
                        return <TextField type="date" id={`question-date-${questionIndex}`} />;
                    case 'time':
                        return <TextField type="time" id={`question-time-${questionIndex}`} />;
                    case 'file':
                        return (
                            <input 
                                type="file" 
                                id={`question-file-${questionIndex}`} 
                                onChange={(e) => handleFileChange(e, questionIndex)} 
                            />
                        );
                    
                    case 'rating':
                        return (
                            <input 
                                type="range" 
                                min="1" 
                                max="5" 
                                id={`question-rating-${questionIndex}`}
                                onChange={(e) => handleRatingChange(e, questionIndex)}
                            />
                        );
                    default:
                        return <p>Unsupported question type</p>

                }

            };

            const handlePreview = () => {
                setIsPreviewing(true);

            };

            const handlePublish = async () => {
                let currentFormId = formId;
                //if the form hasn't been created yet, call the create form endpoint
                if (!formId){
                    const token = localStorage.getItem('token');
                    const url = 'http://localhost:3000/api/forms/create';
                    const method = 'POST';
                    const formToSave = {
                        ...formDraft,
                        questions: formDraft.questions.map(q => ({
                            ...q,
                            questionText: q.title,
                        })),
                    };
                    const response = await fetch(url, {
                        method: method,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify(formToSave),
                    });
                    if (!response.ok) {
                        throw new Error('Failed to create form');
                    }
                    const data = await response.json();
                    currentFormId = data._id;
                    console.log('Form created:', data);
                     console.log('Form ID:', currentFormId);

                }
                //otherwise, go straight to the publish endpoint
                try {
                    const response = await fetch(`http://localhost:3000/api/forms/publish/${currentFormId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                });

                if (!response.ok) {
                    throw new Error('Failed to publish form');
                }
                const formLink = `${window.location.origin}/form/${currentFormId}`;
                setFormLink(formLink);
                setShowModal(true);

                } catch (error) {
                    console.error('Error publishing form:', error);
                }
                
            };

            const handleSaveDraft = () => {
                const token = localStorage.getItem('token');
                const url = formId ? `http://localhost:3000/api/forms/update/${formId}` : 'http://localhost:3000/api/forms/create';
                const method = formId ? 'PUT' : 'POST';
               
                const formToSave = {
                    ...formDraft,
                    questions: formDraft.questions.map(q =>({

                        ...q,
                        questionText: q.title,
                    })),
                };

                fetch(url, {    
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(formToSave),
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Form saved:', data);
                    
                    navigate('/dashboard');
                })
                .catch(error => {
                    console.error('Error saving form:', error);

                });

                }


    

            const handleRatingChange = (event, questionIndex) => {
                const rating = event.target.value;
                const updatedQuestions = [...formDraft.questions];
                updatedQuestions[questionIndex].rating = rating;
                setFormDraft({ ...formDraft, questions: updatedQuestions });
            };

            const handleFileChange = (e, questionIndex) => {
                const file = e.target.files[0];
                const updatedQuestions = [...formDraft.questions];
                updatedQuestions[questionIndex].file = file;
                setFormDraft({ ...formDraft, questions: updatedQuestions });

            };

            const handleTimeIntervalChange = (questionIndex, intervalIndex, field, value) => {
                const updatedQuestions = [...formDraft.questions];
                updatedQuestions[questionIndex].timeIntervals[intervalIndex][field] = value;
                setFormDraft({ ...formDraft, questions: updatedQuestions });
            };
            
            const handleAddTimeInterval = (questionIndex) => {
                const updatedQuestions = [...formDraft.questions];
                updatedQuestions[questionIndex].timeIntervals.push({ start: '', end: '' });
                setFormDraft({ ...formDraft, questions: updatedQuestions });
            };
            
            const handleRemoveTimeInterval = (questionIndex, intervalIndex) => {
                const updatedQuestions = [...formDraft.questions];
                updatedQuestions[questionIndex].timeIntervals.splice(intervalIndex, 1);
                setFormDraft({ ...formDraft, questions: updatedQuestions });
            };
            

            const handleDuplicateQuestion = (index) => {
                const questionToDuplicate = formDraft.questions[index];
                const duplicatedQuestion = { ...questionToDuplicate, id: `${questionToDuplicate.type}-${Date.now()}` };
                const updatedQuestions = [...formDraft.questions];
                updatedQuestions.splice(index, 0, duplicatedQuestion);
                setFormDraft({ ...formDraft, questions: updatedQuestions });


            };

            const handleDeleteQuestion = (index) => {
                
                const updatedQuestions = [...formDraft.questions];
                updatedQuestions.splice(index, 1);
                setFormDraft({ ...formDraft, questions: updatedQuestions });

            };

            const handleOptionChange = (questionIndex, optionIndex, value) => {
                const updatedQuestions = [...formDraft.questions];
                updatedQuestions[questionIndex].options[optionIndex] = value;
                setFormDraft({ ...formDraft, questions: updatedQuestions });
            };
            
            const handleAddOption = (questionIndex) => {
                const updatedQuestions = [...formDraft.questions];
                updatedQuestions[questionIndex].options.push('');
                setFormDraft({ ...formDraft, questions: updatedQuestions });
            };
            
            const handleRemoveOption = (questionIndex, optionIndex) => {
                const updatedQuestions = [...formDraft.questions];
                updatedQuestions[questionIndex].options.splice(optionIndex, 1);
                setFormDraft({ ...formDraft, questions: updatedQuestions });
            };

            const onDragEnd = (result) => {
                const { source, destination } = result;

            

                if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
                    return;
                }


                if (source.droppableId === destination.droppableId) {
                        if (source.droppableId === 'toolbox') 
                        {
                            const reorderedItems = reorderItemsWithinDroppable(items, source.index, destination.index);
                            setItems(reorderedItems);
                        } 
                        else if (source.droppableId === 'formDraft') 
                        {
                            const reorderedQuestions = reorderItemsWithinDroppable(formDraft.questions, source.index, destination.index);
                            setFormDraft({ ...formDraft, questions: reorderedQuestions });

                        }
                } 
                else if (source.droppableId === 'toolbox' && destination.droppableId === 'formDraft') {
                    const itemToAdd = items[source.index];

                    console.log('item to add, calling add question', itemToAdd);

                    handleAddQuestion(itemToAdd);

                    
                }
            };

            const handleAddQuestion = (itemToAdd) => {
                
                const uniqueId = uuidv4();
                setFormDraft(prevDraft => {
                    const newQuestions = [
                        ...prevDraft.questions,
                        { id: uniqueId, type: itemToAdd.type, title: '', options: [] }
                    ];
                    console.log('formDraft', newQuestions);
                    return {...prevDraft, questions: newQuestions};
                });
                
                
            };

            

            const reorderItemsWithinDroppable = (items, startIndex, endIndex) => {
                const result = Array.from(items);
                const [removed] = result.splice(startIndex, 1);
                result.splice(endIndex, 0, removed);
                return result;
            };

            const moveItemToAnotherDroppable = (items, source, destination) => {
                const itemsClone = Array.from(items);
                const [removedItem] = itemsClone.splice(source.index, 1);

                const result = itemsClone.splice(destination.index, 0, removedItem);


                return result;
            };

            const handleQuestionTitleChange = (value, index) => {
                const updatedQuestions = [...formDraft.questions];
                updatedQuestions[index].title = value;
                setFormDraft({ ...formDraft, questions: updatedQuestions });
            };

            return (
                <>
                    <Navbar create={false} />
                    <Box sx={{padding: 3}}>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <div className={styles.dragDropContainer}>
                                <Droppable droppableId="toolbox">
                                    {(provided) => (
                                        <div className={styles.itemContainer} {...provided.droppableProps} ref={provided.innerRef}>
                                            <h2>Toolbox 🔧</h2>
                                            {items.map((item, index) => (
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            className={styles.item}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            {item.content}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                                <div className={styles.formDraftContainer}>
                                    <Droppable droppableId="formDraft">
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className={snapshot.isDraggingOver ? styles.formDraftHover : styles.formDraft}
                                            >
                                                <div className={styles.formDraftHeader}>
                                                <input
                                                    type="text"
                                                    id = "formTitle"
                                                    placeholder="Form Title"
                                                    value={formDraft.title}
                                                    onChange={handleFormTitleChange}
                                                />
                                                <textarea
                                                    placeholder="Form Description"
                                                    id = "formDescription"
                                                    value={formDraft.description}
                                                    onChange={handleFormDescriptionChange}
                                                />
                                                </div>
                                                <div className={styles.formDraftQuestions}>
                                                {formDraft.questions.map((question, index) => (
                                                    <Draggable key={question.id} draggableId={String(question.id)} index={index}>
                                                        
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                
                                                            >
                                                            
                                                            <Question
                                                        key={question.id}
                                                        question={question}
                                                        index={index}
                                                        handleDeleteQuestion={handleDeleteQuestion}
                                                        handleDuplicateQuestion={handleDuplicateQuestion}
                                                        handleQuestionTitleChange={handleQuestionTitleChange}
                                                        renderQuestionInputType={renderQuestionInputType}
                                                       
                                                        />
                                                        
                                                            </div>
                                                        )}
                                                        
                                                    </Draggable>
                                                ))}
                                               
                                                {provided.placeholder}
                                                </div>
                                            </div>
                                        )}
                                    </Droppable>
                                    <div className={styles.buttonContainer}>
                                    <button className = {styles.smallButton} onClick={handlePreview}>Preview</button>
                                                
                                                {isPreviewing && (
                                                    
                                                    <PreviewForm 
                                                    formDraft={formDraft}
                                                    onClose={() => setIsPreviewing(false)} 
                                                    />
                                                )}
                                                <button className={styles.smallButton} onClick={handlePublish}>Publish</button>
                                                {showModal && (
                                                    <div className={styles.modal}>
                                                        <div className={styles.modalContent}>
                                                            <span className={styles.close} onClick={() => setShowModal(false)}>&times;</span>
                                                                <p>Your form has been published! Share this link: </p>
                                                                    <input type="text" value={formLink} readOnly />
                                                                        <button onClick={() => navigator.clipboard.writeText(formLink)}>Copy Link</button>
                                                        </div>
                                                    </div>
                                                )}
                                                <button className={styles.smallButton} onClick={handleSaveDraft}>Save as Draft</button>
                                    </div>
                                </div>
                            </div>
                        </DragDropContext>
                    </Box>
                </>
            );
        }

        export default CreateForm;
