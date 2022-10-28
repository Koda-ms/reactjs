import React, { Component } from "react";
import './style.css';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      number: 0,
      btn: 'Start'
    };
    this.timer = null;
    this.start = this.start.bind(this);
    this.clear = this.clear.bind(this);
  }

  start(){

    if(this.timer !== null){
      clearInterval(this.timer);
      this.timer = null;
      this.setState({btn: "Start"});
    } else {
      this.timer = setInterval(() => {
        let state = this.state;
        state.number += 0.1;
        this.setState(state);
      },100);
      this.setState({btn: "Pause"});
    }
  }

  clear(){
    if(this.timer !== null){
      clearInterval(this.timer);
      this.timer = null;
    }
    this.setState({btn: "Start", number: 0});
  }

  render(){
    return(
      <div className="container">
        <img src={require('./assets/timer2.png')} alt=""/>
        <a className="timer">{this.state.number.toFixed(1)}</a> {/* 'toFixed() SETS THE AMOUNT OF DECIMAL AFTER THE COMMA */}

        <div className="btn-area">
          <button className="btn" onClick={this.start}>{this.state.btn}</button>
          <button className="btn" onClick={this.clear}>Clear</button>
        </div>
      </div>
    );
  }

}
export default App;