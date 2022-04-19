import { AJOUTE_FLEURIE,SUPRIMER_FLEURIE ,VIDE_FLEURIE} from '../type/typePanier';

export const AjouteFleurie = (fleurie) => {
    return {
        type: AJOUTE_FLEURIE,
        payload: fleurie
    }
}

export const SuprimerFleurie = (fleurie) => {
    return {
        type: SUPRIMER_FLEURIE,
        payload: fleurie
    }
}

export const VideFleurie = () => {
    return {
        type: VIDE_FLEURIE,
        payload: ""
    }
}