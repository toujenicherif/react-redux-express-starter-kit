import {INIT_PAGE} from '../actionTypes';
function initPage() {
    return async function (dispatch) {
        return dispatch({
            type: INIT_PAGE,
            payload: {
                message: 'hello to react and redux world'
            }
        });
    }
}

export default {
    initPage
}