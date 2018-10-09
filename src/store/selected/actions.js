export const SET_SELECTED = 'SET_SELECTED';

export function setSelectedWord(wordNode) {
    return {type: SET_SELECTED, wordNode}
}