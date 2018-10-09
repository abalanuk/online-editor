import initialState from '../initialState';
import {SET_ARTICLE} from './actions';

export default (state = initialState.article, action) => {
    switch (action.type) {
        case SET_ARTICLE:
            return action.article
        default:
            return state
    }
}