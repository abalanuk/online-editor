import initialState from '../initialState';
import {SET_SYNONYMS} from './actions';

export default (state = initialState.synonyms, action) => {
    switch (action.type) {
        case SET_SYNONYMS:
            return action.synonyms
        default:
            return state
    }
}