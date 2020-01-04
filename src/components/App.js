import React, { Component } from 'react';
import './App.css';
import { Router } from "react-router-dom";
import { connect } from 'react-redux';
import {getDataTopic} from '../store/Action/vocabulary_action'
import {getDataGrammar} from '../store/Action/grammarAction'
import { history } from '../store/history';
import Main from '../Router/main';

class App extends Component {
  componentDidMount(){
		// this.props.getDataTopic();
		// this.props.getDataGrammar();
	}
  render() {
    return (
      <Router history={history}>
        <Main/>
      </Router>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
	return {
	
	}
}
const mapDispatchToProps = {
  getDataTopic,
  getDataGrammar,
}
export default connect(mapStateToProps, mapDispatchToProps)(App);