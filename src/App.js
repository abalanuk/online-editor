import React, { Component } from 'react';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import reducers from './store';
import EditorView from './components/editor-view/EditorView';
import TopPanel from './components/top-panel/TopPanel';
import './App.css';

const store = createStore(reducers, applyMiddleware(thunk));

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    Web Text Editor
                </header>
                <Provider store={store}>
                    <div className="Content">
                        <TopPanel/>
                        <EditorView/>
                    </div>
                </Provider>
            </div>
        );
    }
}

export default App;
