import initialState from '../initialState';
import {REPLACE_SELECTED, SET_SELECTED} from './actions';

export default (state = initialState.selectedWord, action) => {
    switch (action.type) {
        case SET_SELECTED:
            return action.wordNode
        case REPLACE_SELECTED:
            const newState = {style: {...state.style}, 'innerText': action.word}
            return newState
        default:
            return state
    }
}