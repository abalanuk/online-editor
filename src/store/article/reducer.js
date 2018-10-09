import initialState from '../initialState';
import {SET_ARTICLE, SAVE_ARTICLE} from './actions';

export default (state = initialState.article, action) => {
    switch (action.type) {
        case SET_ARTICLE:
            return action.article
        case SAVE_ARTICLE:
            localStorage.setItem("article", JSON.stringify(action.article));
            return state
        default:
            return state
    }
}