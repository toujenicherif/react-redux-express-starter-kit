import { INIT_PAGE } from '../../actions/actionTypes';

const initState = {
    message: ''
};

function PageReducer(state = initState, action) {
    switch (action.type) {
        case INIT_PAGE: {
            state.message = action.payload.message;
            return {...state};
        }
        default:
            return state;
    }
}

export default PageReducer;