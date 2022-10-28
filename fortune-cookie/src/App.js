import React, { Component } from "react";
import './style.css';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      phrase: ''
    };

    this.breakCookie = this.breakCookie.bind(this);

    this.phrases = ['Your day is going to be full of fortune.',
      'You will get a new job soon.',
      'Keeping care of your friends', 'You are wonderful!',
      'We always gotta enjoy life while we still have it. '
    ];
  }

  breakCookie(){
    let state = this.state;
    let randomNum = Math.floor(Math.random() * this.phrases.length);
    state.phrase = '"'+this.phrases[randomNum]+'"';
    this.setState(state);
    console.log(randomNum);
  }

  render(){
    return (
      <div className="container">
        <img src={require("./assets/f-cookie.jpg")} alt=""/>
        <Button name="Open the cookie" action={this.breakCookie}/>
        <h3 className="phrase">{this.state.phrase}</h3>
      </div>
    );
  }
}

class Button extends Component{
  render(){
    return(
      <div>
        <button className="btn-open" onClick={this.props.action}>{this.props.name}</button>
      </div>
    );
  }
}

export default App;