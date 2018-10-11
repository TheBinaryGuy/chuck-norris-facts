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
    this.baseurl = 'https://api.chucknorris.io/';
    this.onCategoryClick = this.onCategoryClick.bind(this);
    this.onRandomClick = this.onRandomClick.bind(this);
  }

  componentDidMount() {
    let url = this.baseurl + 'jokes/categories';
    this.fetchData(url)
    .then(data => this.setState({categories: data}))
    .catch(error => this.setState({ hasError: true, error: error }));
    // fetch('https://api.chucknorris.io/jokes/categories')
    // .then(res => res.json())
    // .then(data => this.setState({categories: data}))
    // .catch(error => this.setState({ hasError: true, error: error }));
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error: info });
  }

  onCategoryClick(event) {
    let url = this.baseurl + `jokes/random?category=${event.target.textContent}`;
    this.fetchData(url)
    .then(data => this.setState({ categorisedFact: data, fact: undefined }))
    .catch(error => this.setState({ hasError: true, error: error }));
    // fetch(`https://api.chucknorris.io/jokes/random?category=${event.target.textContent}`)
    // .then(res => res.json())
    // .then(data => this.setState({ categorisedFact: data, fact: undefined }));
  }

  onRandomClick() {
    let url = this.baseurl + 'jokes/random';
    this.fetchData(url)
    .then(data => this.setState({ fact: data, categorisedFact: undefined }))
    .catch(error => this.setState({ hasError: true, error: error }));
    // fetch(`https://api.chucknorris.io/jokes/random`)
    // .then(res => res.json())
    // .then(data => this.setState({ fact: data, categorisedFact: undefined }));
  }

  async fetchData(url) {
    const res = await fetch(url);
    return res.json();
  }

  render() {
    return this.state.hasError ? 
    (
      <div>
        <h1 style={{ textAlign: 'center' }}>You are clicking faster than we can keep up, calm down!</h1>
        <div style={{ textAlign: 'center' }}>
          <a href="/" style={{ color: 'slateblue', textDecoration: 'none' }}>&lt;&lt; Go Back</a>
        </div>
      </div>
    )
    : 
    (
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
