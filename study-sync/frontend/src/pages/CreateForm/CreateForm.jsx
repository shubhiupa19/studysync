import React from 'react';
import { useState } from 'react';
import Navbar from '../../components/navbar';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import styles from './CreateForm.module.css';


function CreateForm() {
    const[toolbox, setToolbox] = useState([
        { id: 'text-1', content: 'Text'},
        {id: 'date-1', content: 'Date Picker' },
        {id: 'checkbox-1', content: 'Checkbox'},
        {id: 'radio-1', content: 'Radio Button'},
        {id: 'dropdown-1', content: 'Dropdown'},
        {id: 'file-1', content: 'File Upload'},
    ]);
    const [formDraft, setFormDraft] = useState([]);

    const onDragEnd = (result) => { 
        const {source, destination} = result;
        if (!destination)   
        {
            return;
        }

        if (source.droppableId === "toolbox" && destination.droppableId === "formDraft")
        {
            const itemToAdd = toolbox[source.index];

            const newFormDraft = [...formDraft];
            newFormDraft.splice(destination.index, 0, itemToAdd);
            setFormDraft(newFormDraft);
        }


    };
    return (
        <>
          <Navbar create={false} />
          <div className={styles.createFormContainer}>
            <aside className={styles.toolbox}>
              <Droppable droppableId="toolbox">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {toolbox.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            className={styles.toolboxItem}
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
            </aside>
            <section className={styles.formDraftArea}>
                <Droppable droppableId="formDraft">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {formDraft.map((item, index) => (
                                <div key={item.id} className={styles.formDraftItem}>
                                    {item.content}
                                </div>
                            

                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </section>
          </div>
        </>
      );
}

export default CreateForm;