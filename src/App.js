import React, { Component } from 'react';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    Web Text Editor
                </header>
                Here should be Web Editor
            </div>
        );
    }
}

export default App;
