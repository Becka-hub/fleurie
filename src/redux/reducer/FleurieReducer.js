import { FLEURIE } from '../type/typeFleurie';
const fleurie = [];
const FleurieReducer = (state = fleurie, action) => {
    if (localStorage.getItem('fleurie')) {
        state = JSON.parse(localStorage.getItem('fleurie'));
    }
    switch (action.type) {
        case FLEURIE:
            state=action.payload;
            return  state;
        default:
            return state;
    }
}

export default FleurieReducer;