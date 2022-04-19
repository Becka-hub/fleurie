import { AJOUTE_FLEURIE, SUPRIMER_FLEURIE,VIDE_FLEURIE } from '../type/typePanier';

const panier = [];

const FleurieReducer = (state = panier, action) => {
    if (localStorage.getItem('panier')) {
        state = JSON.parse(localStorage.getItem('panier'));
    }
    const fleurie = action.payload;
    switch (action.type) {
        case AJOUTE_FLEURIE:
            const existe1 = state.find((panier) => panier.id === fleurie.id);
            if (existe1) {
                const panierExiste = state.map((panier) => panier.id === fleurie.id ? { ...panier, qty: panier.qty + 1 } : panier);
                localStorage.setItem('panier', JSON.stringify(panierExiste));
                return panierExiste;
            } else {
                const newState = [...state, { ...fleurie, qty: 1 }]
                localStorage.setItem('panier', JSON.stringify(newState));
                return newState;
            }
            break;
        case SUPRIMER_FLEURIE:
            const existe2 = state.find((panier) => panier.id === fleurie.id);
            if (existe2.qty === 1) {
                const newState = state.filter((panier) => panier.id !== fleurie.id);
                localStorage.setItem('panier', JSON.stringify(newState));
                return newState;
            } else {
                const newState = state.map((panier) => panier.id === fleurie.id ? { ...panier, qty: panier.qty - 1 } : panier);
                localStorage.setItem('panier', JSON.stringify(newState));
                return newState;
            }
            break;
            
        case VIDE_FLEURIE:
            return state=[];
        default:
            return state;
            break;
    }
}

export default FleurieReducer;