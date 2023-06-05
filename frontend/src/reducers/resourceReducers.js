import { 
    RESOURCE_LIST_REQUEST, 
    RESOURCE_LIST_SUCCESS, 
    RESOURCE_LIST_FAIL,
    RESOURCE_DETAILS_REQUEST,
    RESOURCE_DETAILS_SUCCESS,
    RESOURCE_DETAILS_FAIL,
    RESOURCE_DELETE_REQUEST, 
    RESOURCE_DELETE_SUCCESS, 
    RESOURCE_DELETE_FAIL,

    RESOURCE_CREATE_REQUEST, 
    RESOURCE_CREATE_SUCCESS, 
    RESOURCE_CREATE_FAIL,
    RESOURCE_CREATE_RESET,
    
    RESOURCE_UPDATE_REQUEST, 
    RESOURCE_UPDATE_SUCCESS, 
    RESOURCE_UPDATE_FAIL,
    RESOURCE_UPDATE_RESET, 
       
} from '../constants/resourceConstants'

export const resourceListReducers = (state = {resources: []}, action) => {
    switch(action.type){
        case RESOURCE_LIST_REQUEST:
            return {loading: true, resources:[]}
        case RESOURCE_LIST_SUCCESS:
            return {loading: false, resources: action.payload}
        case RESOURCE_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state    
    }
}

export const resourcetDetailsReducers = (state = {resource: {reviews:[]}}, action) => {
    switch(action.type){
        case RESOURCE_DETAILS_REQUEST:
            return { loading: true, ...state }
        case RESOURCE_DETAILS_SUCCESS:
            return {loading: false, resource: action.payload}
        case RESOURCE_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state    
    }
}

export const resourceCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case RESOURCE_CREATE_REQUEST:
            return { loading: true }
    
        case RESOURCE_CREATE_SUCCESS:
            return { loading: false, success: true, resource: action.payload }
    
        case RESOURCE_CREATE_FAIL:
            return { loading: false, error: action.payload }
    
        case RESOURCE_CREATE_RESET:
                return {}            
    
        default:
            return state
    }
    }
    
    
    export const resourceDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case RESOURCE_DELETE_REQUEST:
            return { loading: true }
    
        case RESOURCE_DELETE_SUCCESS:
            return { loading: false, success: true }
    
        case RESOURCE_DELETE_FAIL:
            return { loading: false, error: action.payload }
    
        default:
            return state
    }
    }
    
    
    export const resourceUpdateReducer = (state = {resource: {}}, action) => {
    switch (action.type) {
        case RESOURCE_UPDATE_REQUEST:
            return { loading: true }
    
        case RESOURCE_UPDATE_SUCCESS:
            return { loading: false, success: true, resource: action.payload }
    
        case RESOURCE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
    
        case RESOURCE_UPDATE_RESET:
                return { resource: {} }            
    
        default:
            return state
    }
    }