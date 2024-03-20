import React, { useState, useEffect } from 'react';
import './Card.css';

const Card = ({ flashcard }) => {
  //initialize a state variable called showAnswer and set it to false
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => { //googled how to change the flachcard state back to question when the flashcard switches
    setShowAnswer(false); 
  }, [flashcard]);

//if the showAnswer variable is true, then set it to false, and vice versa
  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    //renders the card
    //if the showAnswer variable is true, then the class 'flipped' is also applied
    //also, when the card is clicked on, the toggleAnswer function is called
    <div className={`card ${showAnswer ? 'flipped' : ''}`} onClick={toggleAnswer}>
      <div className="card-inner">
        <div className="card-front">
          {/* displays the state */}
        <h2>State</h2>
          <p>{flashcard.state}</p>
        </div>
        <div className="card-back">
          {/* displays the capital */}
          <h2>Capital</h2>
          <p> {flashcard.capital}</p>
        </div>
      </div>
      
    </div>
  );
};

export default Card;
