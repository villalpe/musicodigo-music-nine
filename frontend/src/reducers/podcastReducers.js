import { 
    PODCAST_LIST_REQUEST, 
    PODCAST_LIST_SUCCESS, 
    PODCAST_LIST_FAIL,
    PODCAST_DETAILS_REQUEST,
    PODCAST_DETAILS_SUCCESS,
    PODCAST_DETAILS_FAIL,
    PODCAST_DELETE_REQUEST, 
    PODCAST_DELETE_SUCCESS, 
    PODCAST_DELETE_FAIL,

    PODCAST_CREATE_REQUEST, 
    PODCAST_CREATE_SUCCESS, 
    PODCAST_CREATE_FAIL,
    PODCAST_CREATE_RESET,
    
    PODCAST_UPDATE_REQUEST, 
    PODCAST_UPDATE_SUCCESS, 
    PODCAST_UPDATE_FAIL,
    PODCAST_UPDATE_RESET,    
} from '../constants/podcastConstants'

export const podcastListReducers = (state = {podcasts: []}, action) => {
    switch(action.type){
        case PODCAST_LIST_REQUEST:
            return {loading: true, podcasts:[]}
        case PODCAST_LIST_SUCCESS:
            return {loading: false, podcasts: action.payload}
        case PODCAST_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state    
    }
}

export const podcastDetailsReducers = (state = {podcast: {reviews:[]}}, action) => {
    switch(action.type){
        case PODCAST_DETAILS_REQUEST:
            return { loading: true, ...state }
        case PODCAST_DETAILS_SUCCESS:
            return {loading: false, podcast: action.payload}
        case PODCAST_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state    
    }
}

export const podcastCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PODCAST_CREATE_REQUEST:
            return { loading: true }
    
        case PODCAST_CREATE_SUCCESS:
            return { loading: false, success: true, podcast: action.payload }
    
        case PODCAST_CREATE_FAIL:
            return { loading: false, error: action.payload }
    
        case PODCAST_CREATE_RESET:
                return {}            
    
        default:
            return state
    }
    }
    
    
    export const podcastDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PODCAST_DELETE_REQUEST:
            return { loading: true }
    
        case PODCAST_DELETE_SUCCESS:
            return { loading: false, success: true }
    
        case PODCAST_DELETE_FAIL:
            return { loading: false, error: action.payload }
    
        default:
            return state
    }
    }
    
    
    export const podcastUpdateReducer = (state = {podcast: {}}, action) => {
    switch (action.type) {
        case PODCAST_UPDATE_REQUEST:
            return { loading: true }
    
        case PODCAST_UPDATE_SUCCESS:
            return { loading: false, success: true, podcast: action.payload }
    
        case PODCAST_UPDATE_FAIL:
            return { loading: false, error: action.payload }
    
        case PODCAST_UPDATE_RESET:
                return { podcast: {} }            
    
        default:
            return state
    }
    }
    