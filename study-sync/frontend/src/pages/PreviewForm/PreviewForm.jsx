import React from 'react';
import styles from './PreviewForm.module.css';

const PreviewForm = ({ formDraft, onClose }) => {
  const renderPreviewQuestion = (question) => {
    switch (question.type) {
      case 'text':
        return <input type="text" placeholder={question.title} disabled />;
      case 'checkbox':
        return question.options.map((option, index) => (
          <label key={index}>
            <input type="checkbox" disabled /> {option}
          </label>
        ));
        case 'radio':
            return question.options.map((option, index) => (
                <label key={index}>
                <input type="radio" disabled /> {option}
                </label>
            ));
        case 'dropdown':
            return (
                <select disabled>
                {question.options.map((option, index) => (
                    <option key={index}>{option}</option>
                ))}
                </select>
            );
        case 'time':
            return <input type="time" disabled />;

        case 'date':
            return <input type="date" disabled />;
        
        
      default:
        return null;
    }
  };

  return (
    <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <h2>{formDraft.title}</h2>
      <p>{formDraft.description}</p>
      {formDraft.questions.map((question, index) => (
        <div key={index}>
          <h3>{question.title}</h3>
          {renderPreviewQuestion(question)}
        </div>
      ))}
      <button onClick={onClose} style={{ marginTop: '20px' }}>Close Preview</button>
    </div>
  </div>
);
};

export default PreviewForm;
