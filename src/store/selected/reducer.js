import initialState from '../initialState';
import {SET_SELECTED} from './actions';

export default (state = initialState.article, action) => {
    switch (action.type) {
        case SET_SELECTED:
            return action.wordNode
        default:
            return state
    }
}