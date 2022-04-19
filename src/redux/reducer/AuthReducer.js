import { AJOUTE_USER,SUPRIMER_USER } from '../type/typeAuth';
const user = [];
const AuthReducer = (state = user, action) => {
    if (localStorage.getItem('user')) {
        state = JSON.parse(localStorage.getItem('user'));
    }
    switch (action.type) {
        case AJOUTE_USER:
            state=action.payload;
            return  state;
        break;
        case SUPRIMER_USER:
            return state = [];
        default:
            return state;
            
    }
}

export default AuthReducer;