import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styles from './CreateForm.module.css';

function CreateForm() {
    const [formDraft, setFormDraft] = useState({ questions: [] });
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

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
            return;
        }

        const questionType = source.draggableId;
        const newQuestion = { id: questionType, type: questionType, title: '', options: [] };
        setFormDraft((prevDraft) => ({
            ...prevDraft,
            questions: [...prevDraft.questions, newQuestion],
        }));

        if (source.droppableId === destination.droppableId) {
            const reorderedItems = reorderItemsWithinDroppable(items, source.index, destination.index);
            setItems(reorderedItems);
        } else {
            const updatedItems = moveItemToAnotherDroppable(items, source, destination);
            setItems(updatedItems);
        }
    };

    const reorderItemsWithinDroppable = (items, startIndex, endIndex) => {
        const result = Array.from(items);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const moveItemToAnotherDroppable = (items, source, destination) => {
        const sourceClone = Array.from(items);
        const destClone = Array.from(items);
        const [removed] = sourceClone.splice(source.index, 1);
        destClone.splice(destination.index, 0, removed);

        const result = {};
        result[source.droppableId] = sourceClone;
        result[destination.droppableId] = destClone;

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
            <div className="container">
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
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={styles.formDraft}
                                    >
                                        {formDraft.questions.map((question, index) => (
                                            <Draggable key={question.id} draggableId={question.id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        className={styles.question}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <h3>{question.title}</h3>
                                                        <input
                                                            type="text"
                                                            placeholder="Question Title"
                                                            value={question.title}
                                                            onChange={(e) => handleQuestionTitleChange(e.target.value, index)}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </div>
                </DragDropContext>
            </div>
        </>
    );
}

export default CreateForm;
