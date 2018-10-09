import {combineReducers} from 'redux';

import articleReducer from './article/reducer';
import selectedReducer from './selected/reducer';
import actionsReducer from './actions/reducer';
import synonymsReducer from './actions/reducer';

export default combineReducers({
    article: articleReducer,
    selected: selectedReducer,
    actions: actionsReducer,
    synonyms: synonymsReducer
})