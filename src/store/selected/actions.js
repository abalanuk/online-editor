export const SET_SELECTED = 'SET_SELECTED';
export const REPLACE_SELECTED = 'REPLACE_SELECTED';

export function setSelectedWord(wordNode) {
    return {type: SET_SELECTED, wordNode}
}

export function replaceSelectedWord(word) {
    return {type: REPLACE_SELECTED, word}
}