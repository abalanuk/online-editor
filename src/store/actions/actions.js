export const UPDATE_ACTIONS = 'UPDATE_ACTIONS';
export const SET_ACTIONS = 'SET_ACTIONS';

export function updateActions(action) {
    return {type: UPDATE_ACTIONS, action}
}

export function setActions(selectedNode) {
    return {type: SET_ACTIONS, action: selectedNode}
}