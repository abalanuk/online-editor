import initialState from '../initialState';
import {UPDATE_ACTIONS} from './actions';

export default (state = initialState.actions, {type, action}) => {
    switch (type) {
        case UPDATE_ACTIONS:
            if(state.includes(action)) {
                return state.filter(item => item !== action)
            }
            return [...state, action];
        default:
            return state
    }
}