import getMockText from '../../mockAPI';
import initialState from '../initialState'

export const SET_ARTICLE = 'SET_ARTICLE';
export const SAVE_ARTICLE = 'SAVE_ARTICLE';

const savedArticle = localStorage.getItem('article');
const articleState = savedArticle !== 'undefined' ? JSON.parse(savedArticle) : initialState.article;

export function fetchData() {
    return async (dispatch) => {
        if(articleState) {
            dispatch({type: SET_ARTICLE, article: articleState});
        } else {
            const getText = async () => {
                return await getMockText();
            };

            const article = await getText();
            dispatch({type: SET_ARTICLE, article});
        }
    }
}

export function saveArticle(articleNode) {
    return {type: SAVE_ARTICLE, article: articleNode}
}