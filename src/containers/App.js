import React, { Component } from 'react';
import Categories from '../components/Categories';
import RandomFact from '../components/RandomFact';
import CategorisedFact from '../components/CategorisedFact';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      fact: undefined,
      categorisedFact: undefined,
      hasError: false,
      isLoading: false,
      error: ''
    };
    this.onCategoryClick = this.onCategoryClick.bind(this);
    this.onRandomClick = this.onRandomClick.bind(this);
  }

  componentDidMount() {
    fetch('https://api.chucknorris.io/jokes/categories')
    .then(res => res.json())
    .then(data => this.setState({categories: data}))
    .catch(error => this.setState({ hasError: true, error: error }));
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error: info });
  }

  onCategoryClick(event) {
    fetch(`https://api.chucknorris.io/jokes/random?category=${event.target.textContent}`)
    .then(res => res.json())
    .then(data => this.setState({ categorisedFact: data, fact: undefined }));
  }

  onRandomClick() {
    fetch(`https://api.chucknorris.io/jokes/random`)
    .then(res => res.json())
    .then(data => this.setState({ fact: data, categorisedFact: undefined }));
  }

  render() {
    return this.state.hasError ? <h1 style={{ textAlign: 'center' }}>Something went wrong!</h1> : (
      <div>
        <h1>Chuck Norris Facts!</h1>
        <button id="random" onClick={this.onRandomClick}>Random Fact</button>
        <h3>Or select a category:</h3>
        <Categories categories={this.state.categories} categoryClick={this.onCategoryClick} />
        <RandomFact fact={this.state.fact} />
        <CategorisedFact categorisedFact={this.state.categorisedFact} />
      </div>
    );
  }
}

export default App;
