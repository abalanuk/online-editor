import {combineReducers} from 'redux';

import articleReducer from './article/reducer';

export default combineReducers({
    article: articleReducer
})