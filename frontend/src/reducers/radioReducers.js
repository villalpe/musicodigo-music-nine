import { 
    RADIO_LIST_REQUEST, 
    RADIO_LIST_SUCCESS, 
    RADIO_LIST_FAIL,
    RADIO_DETAILS_REQUEST,
    RADIO_DETAILS_SUCCESS,
    RADIO_DETAILS_FAIL,
    RADIO_DELETE_REQUEST, 
    RADIO_DELETE_SUCCESS, 
    RADIO_DELETE_FAIL,

    RADIO_CREATE_REQUEST, 
    RADIO_CREATE_SUCCESS, 
    RADIO_CREATE_FAIL,
    RADIO_CREATE_RESET,
    
    RADIO_UPDATE_REQUEST, 
    RADIO_UPDATE_SUCCESS, 
    RADIO_UPDATE_FAIL,
    RADIO_UPDATE_RESET,


} from '../constants/radioConstants'

export const radioListReducers = (state = {radios: []}, action) => {
    switch(action.type){
        case RADIO_LIST_REQUEST:
            return {loading: true, radios:[]}
        case RADIO_LIST_SUCCESS:
            return {loading: false, radios: action.payload}
        case RADIO_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state    
    }
}

export const radioDetailsReducers = (state = {radio: {reviews:[]}}, action) => {
    switch(action.type){
        case RADIO_DETAILS_REQUEST:
            return { loading: true, ...state }
        case RADIO_DETAILS_SUCCESS:
            return {loading: false, radio: action.payload}
        case RADIO_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state    
    }
}

export const radioCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case RADIO_CREATE_REQUEST:
            return { loading: true }
    
        case RADIO_CREATE_SUCCESS:
            return { loading: false, success: true, radio: action.payload }
    
        case RADIO_CREATE_FAIL:
            return { loading: false, error: action.payload }
    
        case RADIO_CREATE_RESET:
                return {}            
    
        default:
            return state
    }
    }
    
    
    export const radioDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case RADIO_DELETE_REQUEST:
            return { loading: true }
    
        case RADIO_DELETE_SUCCESS:
            return { loading: false, success: true }
    
        case RADIO_DELETE_FAIL:
            return { loading: false, error: action.payload }
    
        default:
            return state
    }
    }
    
    
    export const radioUpdateReducer = (state = {radio: {}}, action) => {
    switch (action.type) {
        case RADIO_UPDATE_REQUEST:
            return { loading: true }
    
        case RADIO_UPDATE_SUCCESS:
            return { loading: false, success: true, radio: action.payload }
    
        case RADIO_UPDATE_FAIL:
            return { loading: false, error: action.payload }
    
        case RADIO_UPDATE_RESET:
                return { radio: {} }            
    
        default:
            return state
        }
    }

