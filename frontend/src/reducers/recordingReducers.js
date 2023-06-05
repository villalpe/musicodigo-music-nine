import { 
    RECORDING_LIST_REQUEST, 
    RECORDING_LIST_SUCCESS, 
    RECORDING_LIST_FAIL,
    RECORDING_DETAILS_REQUEST,
    RECORDING_DETAILS_SUCCESS,
    RECORDING_DETAILS_FAIL,
    RECORDING_DELETE_REQUEST, 
    RECORDING_DELETE_SUCCESS, 
    RECORDING_DELETE_FAIL,

    RECORDING_CREATE_REQUEST, 
    RECORDING_CREATE_SUCCESS, 
    RECORDING_CREATE_FAIL,
    RECORDING_CREATE_RESET,
    
    RECORDING_UPDATE_REQUEST, 
    RECORDING_UPDATE_SUCCESS, 
    RECORDING_UPDATE_FAIL,
    RECORDING_UPDATE_RESET,
    
    RECORDING_CATEGORY_REQUEST,
    RECORDING_CATEGORY_SUCCESS,
    RECORDING_CATEGORY_FAIL,

} from '../constants/recordingConstants'

export const recordingListReducers = (state = {recordings: []}, action) => {
    switch(action.type){
        case RECORDING_LIST_REQUEST:
            return {loading: true, recordings:[]}
        case RECORDING_LIST_SUCCESS:
            return {loading: false, recordings: action.payload}
        case RECORDING_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state    
    }
}

export const recordingDetailsReducers = (state = {recording: {reviews:[]}}, action) => {
    switch(action.type){
        case RECORDING_DETAILS_REQUEST:
            return { loading: true, ...state }
        case RECORDING_DETAILS_SUCCESS:
            return {loading: false, recording: action.payload}
        case RECORDING_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state    
    }
}

export const recordingCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case RECORDING_CREATE_REQUEST:
            return { loading: true }
    
        case RECORDING_CREATE_SUCCESS:
            return { loading: false, success: true, recording: action.payload }
    
        case RECORDING_CREATE_FAIL:
            return { loading: false, error: action.payload }
    
        case RECORDING_CREATE_RESET:
                return {}            
    
        default:
            return state
    }
    }
    
    
    export const recordingDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case RECORDING_DELETE_REQUEST:
            return { loading: true }
    
        case RECORDING_DELETE_SUCCESS:
            return { loading: false, success: true }
    
        case RECORDING_DELETE_FAIL:
            return { loading: false, error: action.payload }
    
        default:
            return state
    }
    }
    
    
    export const recordingUpdateReducer = (state = {recording: {}}, action) => {
    switch (action.type) {
        case RECORDING_UPDATE_REQUEST:
            return { loading: true }
    
        case RECORDING_UPDATE_SUCCESS:
            return { loading: false, success: true, recording: action.payload }
    
        case RECORDING_UPDATE_FAIL:
            return { loading: false, error: action.payload }
    
        case RECORDING_UPDATE_RESET:
                return { recording: {} }            
    
        default:
            return state
        }
    }

    export const recordingCategoryReducer = (state = {recordings: []}, action) => {
        switch (action.type) {
            case RECORDING_CATEGORY_REQUEST:
                return { loading: true, recordings: [] }
        
            case RECORDING_CATEGORY_SUCCESS:
                return { loading: false, recordings: action.payload }
        
            case RECORDING_CATEGORY_FAIL:
                return { loading: false, error: action.payload }
        
            default:
                return state
        }
    }