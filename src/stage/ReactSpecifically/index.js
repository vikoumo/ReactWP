// JS
const jsButton = require('./js/button.js');

// ES6
import ES6Button from './ES6/button';

// React
import ReactComponent from './React/ReactComponent';
import React from 'react';
import {render} from 'react-dom';

// render(<ReactComponent />, document.getElementById('React').childNodes[3]);

export default class ReactSpecifically extends ReactComponent {
  componentDidMount() {
    // JS
    jsButton('red', 'jsButton');

    // ES6
    ES6Button('blue', 'ES6Button');
  }
  render() {
    return (<div>
      <header>ReactSpecifically: react different js and es6</header>
      <main>
        <div id="JS">
          <h1>JS:</h1>
          <div />
        </div>
        <div id="ES6">
          <h1>ES6:</h1>
          <div />
        </div>
        <div id="React">
          <h1>React:</h1>
          <ReactComponent />
        </div>
      </main>
    </div>);
  }
}
