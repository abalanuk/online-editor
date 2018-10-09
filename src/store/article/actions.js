import getMockText from '../../mockAPI';

export const SET_ARTICLE = 'SET_ARTICLE';

export function fetchData() {
    return async (dispatch) => {
        const getText = async () => {
            return await getMockText();
        };

        const article = await getText();
        dispatch({type: SET_ARTICLE, article});
    }
}