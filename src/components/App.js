import React, { Component, useState } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name1: "",
      name2: "",
      result: "",
    };
  }

  getResult(result) {
    console.log(result);
    switch (result % 6) {
      case 1: {
        return "Friends";
      }
      case 2: {
        return "Love";
      }
      case 3: {
        return "Affection";
      }
      case 4: {
        return "Marriage";
      }
      case 5: {
        return "Enemy";
      }
      case 0: {
        return "Siblings";
      }
      default: {
        return "Please Enter a valid input";
      }
    }
  }
  onResult() {
    const getCounts = (s) => {
      let ob = {};
      for (let i of s) {
        if (ob[i]) {
          ob[i] += 1;
        } else {
          ob[i] = 1;
        }
      }
      return ob;
    };

    let ao = getCounts(this.state.name1);
    let bo = getCounts(this.state.name2);

    for (let key in ao) {
      let count = ao[key];
      if (bo[key]) {
        let bkc = bo[key];
        if (bkc >= count) {
          bo[key] -= count;
          ao[key] -= count;
        } else if (bkc < count) {
          ao[key] -= bkc;
          bo[key] -= bkc;
        }
      }
    }

    let aov = Object.values(ao);

    let bov = Object.values(bo);
    let f = [...aov, ...bov];

    let result = 0;
    for (let i of f) {
      result += i;
    }
    console.log({result,ao,s:this.state,bo,f})
    let out = this.getResult(result);
    this.setState({ result: out });
  }

  onClear() {
    this.setState({ name1: "", name2: "", result: "" });
  }
  onInput(e){
    const {name,value} = e.target
    this.setState({[name]:value})
  }
  render() {
    return (
      <div id="main">
        <input name={"name1"} onChange={this.onInput.bind(this)} data-testid="input1" placeholder="Enter first name" />
        <input name={"name2"} onChange={this.onInput.bind(this)}  placeholder="Enter second name" data-testid="input2" />

        <button
          data-testid="calculate_relationship"
          onClick={this.onResult.bind(this)}
        >
          Calculate Relationship Future
        </button>
        <button data-testid="clear" onClick={this.onClear.bind(this)}>
          Clear
        </button>

        <h3 data-testid="answer">{this.state.result}</h3>
      </div>
    );
  }
}

export default App;