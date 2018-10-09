import initialState from '../initialState';
import {UPDATE_ACTIONS, SET_ACTIONS} from './actions';

import {Actions, stylesMapToAction} from '../../config/constants'

export default (state = initialState.actions, {type, action}) => {
    switch (type) {
        case UPDATE_ACTIONS:
            if(state.includes(action)) {
                return state.filter(item => item !== action)
            }
            return [...state, action];
        case SET_ACTIONS:
            return Actions.filter(actionItem => action.style[stylesMapToAction[actionItem]])
        default:
            return state
    }
}