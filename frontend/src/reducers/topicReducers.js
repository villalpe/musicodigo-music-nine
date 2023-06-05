import { 
    TOPIC_LIST_REQUEST, 
    TOPIC_LIST_SUCCESS, 
    TOPIC_LIST_FAIL,
    TOPIC_DETAILS_REQUEST, 
    TOPIC_DETAILS_SUCCESS, 
    TOPIC_DETAILS_FAIL,
    TOPIC_DELETE_REQUEST, 
    TOPIC_DELETE_SUCCESS, 
    TOPIC_DELETE_FAIL,
    TOPIC_CREATE_REQUEST, 
    TOPIC_CREATE_SUCCESS, 
    TOPIC_CREATE_FAIL,
    TOPIC_CREATE_RESET,
    TOPIC_UPDATE_REQUEST, 
    TOPIC_UPDATE_SUCCESS, 
    TOPIC_UPDATE_FAIL,
    TOPIC_UPDATE_RESET,
} from '../constants/topicConstants';

export const topicListReducer = (state = { topics: [] }, action) => {
    switch (action.type) {
        case TOPIC_LIST_REQUEST:
            return { loading: true, topics: [] }

        case TOPIC_LIST_SUCCESS:
            return {
                loading: false,
                topics: action.payload.topics,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case TOPIC_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const topicDetailsReducer = (state = { topic: {reviews:[]} }, action) => {
switch(action.type) {
    case TOPIC_DETAILS_REQUEST:
        return { loading: true, ...state }
    case TOPIC_DETAILS_SUCCESS:
        return { loading: false, topic: action.payload }
    case TOPIC_DETAILS_FAIL:
        return { loading: false, error: action.payload }
    default:
        return state              
}
}


export const topicCreateReducer = (state = {}, action) => {
switch (action.type) {
    case TOPIC_CREATE_REQUEST:
        return { loading: true }

    case TOPIC_CREATE_SUCCESS:
        return { loading: false, success: true, product: action.payload }

    case TOPIC_CREATE_FAIL:
        return { loading: false, error: action.payload }

    case TOPIC_CREATE_RESET:
            return {}            

    default:
        return state
}
}


export const topicDeleteReducer = (state = {}, action) => {
switch (action.type) {
    case TOPIC_DELETE_REQUEST:
        return { loading: true }

    case TOPIC_DELETE_SUCCESS:
        return { loading: false, success: true }

    case TOPIC_DELETE_FAIL:
        return { loading: false, error: action.payload }

    default:
        return state
}
}


export const topicUpdateReducer = (state = {topic: {}}, action) => {
switch (action.type) {
    case TOPIC_UPDATE_REQUEST:
        return { loading: true }

    case TOPIC_UPDATE_SUCCESS:
        return { loading: false, success: true, topic: action.payload }

    case TOPIC_UPDATE_FAIL:
        return { loading: false, error: action.payload }

    case TOPIC_UPDATE_RESET:
            return { topic: {} }            

    default:
        return state
}
}

