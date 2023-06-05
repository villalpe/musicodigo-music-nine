import { 
    GRUPO_LIST_REQUEST, 
    GRUPO_LIST_SUCCESS, 
    GRUPO_LIST_FAIL,
    GRUPO_DETAILS_REQUEST,
    GRUPO_DETAILS_SUCCESS,
    GRUPO_DETAILS_FAIL,
} from '../constants/grupoConstants'

export const grupoListReducers = (state = {grupos: []}, action) => {
    switch(action.type){
        case GRUPO_LIST_REQUEST:
            return {loading: true, grupos:[]}
        case GRUPO_LIST_SUCCESS:
            return {loading: false, grupos: action.payload}
        case GRUPO_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state    
    }
}

export const grupoDetailsReducers = (state = {grupo: {reviews:[]}}, action) => {
    switch(action.type){
        case GRUPO_DETAILS_REQUEST:
            return { loading: true, ...state }
        case GRUPO_DETAILS_SUCCESS:
            return {loading: false, grupo: action.payload}
        case GRUPO_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state    
    }
}

