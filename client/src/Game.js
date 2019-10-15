import React from 'react';
import CategoryButtons from './CategoryButtons';
import GameResults from './GameResults';
const apiUrl = 'http://localhost:3030/';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domains: null,
      isLoading: true,
      randomDomain: null,
      selectedCategory: null,
      costGuess: null,
      score: 0,
      scoreChange: 0,
      isGuessComplete: false
    };
  }

  onCategoryClick = category => {
    this.setState({ selectedCategory: category });
  };

  getCategoryScore = () => {
    if (
      this.state.selectedCategory.toLowerCase() ===
      this.state.randomDomain.category.toLowerCase()
    ) {
      return -100;
    } else {
      return 100;
    }
  };

  getCostScore = () => {
    return Math.abs(this.state.randomDomain.price - this.state.costGuess);
  };

  onFormSubmit = event => {
    event.preventDefault();
    let score = 0;
    score += this.getCategoryScore();
    score += this.getCostScore();
    this.setState({ scoreChange: score });
    score += this.state.score;
    this.setState({ score, isGuessComplete: true });
  };

  pickRandomDomain() {
    const randomIndex = Math.floor(
      Math.random() * this.state.domains.length - 1
    );
    return this.state.domains[randomIndex];
  }

  onKeepGoingClick = e => {
    this.setState({
      scoreChange: 0,
      randomDomain: this.pickRandomDomain(),
      costGuess: null,
      isGuessComplete: false,
      selectedCategory: null
    });
  };

  onCostInputChange = e => {
    this.setState({ costGuess: e.target.value });
  };

  async componentDidMount() {
    const response = await fetch(`${apiUrl}domains`);

    const domains = await response.json();
    const categories = [...new Set(domains.map(item => item.category))];

    this.setState({ domains, categories });

    const randomDomain = this.pickRandomDomain();
    this.setState({ randomDomain, isLoading: false });
  }

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          'Loading...'
        ) : (
          <div>
            <h2>Score: {this.state.score}</h2>
            {!this.state.isGuessComplete ? (
              <div className="game">
                <p>{this.state.randomDomain.url}</p>
                <CategoryButtons
                  categories={this.state.categories}
                  onCategoryClick={this.onCategoryClick}
                  selectedCategory={this.state.selectedCategory}
                />
                <form onSubmit={this.onFormSubmit}>
                  <div className="cost-input">
                    <label>Cost</label>
                    <input onChange={this.onCostInputChange} />
                  </div>
                  <button type="submit">Guess!</button>
                </form>
              </div>
            ) : (
              <div className="results">
                <GameResults
                  randomDomain={this.state.randomDomain}
                  selectedCategory={this.state.selectedCategory}
                  costGuess={this.state.costGuess}
                  costScore={this.getCostScore()}
                  categoryScore={this.getCategoryScore()}
                  scoreChange={this.state.scoreChange}
                />
                <button onClick={this.onKeepGoingClick}>Keep going!</button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Game;
