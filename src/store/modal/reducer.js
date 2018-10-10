import initialState from '../initialState';
import {CLOSE_MODAL, SHOW_MODAL} from './actions';

export default (state = initialState.modalOpen, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return true
        case CLOSE_MODAL:
            return false
        default:
            return state
    }
}