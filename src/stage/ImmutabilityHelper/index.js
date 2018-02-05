import React, {Component} from 'react';
import {render} from 'react-dom';
import update from 'immutability-helper';

export default class ImmutabilityHelper extends Component {
  state = {
    // arr: [1, 2, 3],
    searchResult: [{
      name: 'aa',
      index: 0,
      array: [1, 2, 3],
    }, {
      name: 'bb',
      index: 1,
    }, {
      name: 'cc',
      index: 2,
    }],
  }

  handlePush = () => {
    const arr = this.state.searchResult;
    const newArr = update(arr, {$push: [{name: 'dd', index: 3}], 0: {array: {$push: [4]}}});
    console.log('原数据', arr);
    console.log('新数据', newArr);
    this.setState({
      searchResult: newArr,
    });
  }

  handleSplice = () => {
    const arr = this.state.searchResult;
    const newArr = update(arr, {0: {array: {$splice: [[1, 1, 2, 2]]}}});
    console.log('array从索引为2的地方开始删除1个，然后插入2, 2');
    console.log('原数据', arr);
    console.log('新数据', newArr);
    this.setState({
      searchResult: newArr,
    });
  }

  handleSet = () => {
    const arr = this.state.searchResult;
    const newArr = update(arr, {0: {name: {$set: 'aa1'}}});
    console.log('原数据', arr);
    console.log('新数据', newArr);
    this.setState({
      searchResult: newArr,
    });
  }

  handleApply = () => {
    const arr = this.state.searchResult;
    const newArr = update(arr, {0: {
      array: {$apply: (item) => item.reduce((sum, value) => sum + value)}}});
    console.log('原数据', arr);
    console.log('新数据', newArr);
    this.setState({
      searchResult: newArr,
    });
  }

  handleMerge = () => {
    const arr = this.state.searchResult;
    const index = 0;
    const newArr = update(arr, {[index]: {$merge: {merge: 6666}}});
    console.log('原数据', arr);
    console.log('新数据', newArr);
    this.setState({
      searchResult: newArr,
    });
  }

  render() {
    return (<div>
      <h4>查看console</h4>
      <input type="button" value="push" onClick={this.handlePush} />
      <input type="button" value="splice" onClick={this.handleSplice} />
      <input type="button" value="set" onClick={this.handleSet} />
      <input type="button" value="apply" onClick={this.handleApply} />
      <input type="button" value="merge" onClick={this.handleMerge} />
    </div>);
  }
}
