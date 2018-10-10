export const SET_SYNONYMS = 'SET_SYNONYMS';

export function getSynonyms(word) {
    return async (dispatch) => {
        const response = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`);
        const data = await response.json();

        dispatch({type: SET_SYNONYMS, synonyms: data});
    }
}