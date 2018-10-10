import {combineReducers} from 'redux';

import articleReducer from './article/reducer';
import selectedReducer from './selected/reducer';
import actionsReducer from './actions/reducer';
import synonymsReducer from './synonyms/reducer';
import modalReducer from './modal/reducer';

export default combineReducers({
    article: articleReducer,
    selected: selectedReducer,
    actions: actionsReducer,
    synonyms: synonymsReducer,
    modalOpen: modalReducer
})