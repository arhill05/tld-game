import React from 'react';

const getFormattedNumber = number =>
  number < 0 ? number.toString() : `+${number}`;

const GameResults = props => (
  <div className="game-results">
    <div className="actual-values">
      <h2>Actual Values</h2>
      <p>Category: {props.randomDomain.category}</p>
      <p>Price: ${props.randomDomain.price} USD</p>
    </div>
    <div className="your-guesses">
      <h2>Your Guesses</h2>
      <p>
        Category: {props.selectedCategory} (
        <span
          className={props.categoryScore <= 0 ? 'good-change' : 'bad-change'}
        >
          {getFormattedNumber(props.categoryScore)}
        </span>
        )
      </p>
      <p>
        Price: ${props.costGuess} USD (
        <span className={props.costScore <= 0 ? 'good-change' : 'bad-change'}>
          {getFormattedNumber(props.costScore)}
        </span>
        )
      </p>
    </div>
    <div className="score-change">
      <h2>Score Change</h2>
      <p className={props.scoreChange <= 0 ? 'good-change' : 'bad-change'}>
        {props.scoreChange}
      </p>
    </div>
  </div>
);

export default GameResults;
