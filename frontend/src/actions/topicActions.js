import axios from 'axios';
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
    TOPIC_UPDATE_REQUEST, 
    TOPIC_UPDATE_SUCCESS, 
    TOPIC_UPDATE_FAIL,
} from '../constants/topicConstants';

export const listTopics = () => async (dispatch) => {
    try {
        dispatch({ type: TOPIC_LIST_REQUEST })

        const { data } = await axios.get('/api/topics/')

        dispatch({
            type: TOPIC_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TOPIC_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listTopicDetails = (id) => async (dispatch) => {
    try{
        dispatch({
            type: TOPIC_DETAILS_REQUEST
        })
        const {data} = await axios.get(`/api/topics/${id}`)

        dispatch({
            type: TOPIC_DETAILS_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: TOPIC_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteTopic = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TOPIC_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/topics/delete/${id}/`,
            config
        )

        dispatch({
            type: TOPIC_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: TOPIC_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createTopic = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: TOPIC_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/topics/create/`,
            {},
            config
        )

        dispatch({
            type: TOPIC_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: TOPIC_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateTopic = (topic) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TOPIC_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/topics/update/${topic._id}/`,
            topic,
            config
        )

        dispatch({
            type: TOPIC_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({ 
            type: TOPIC_DETAILS_SUCCESS, 
            payload: data
        })


    } catch (error) {
        dispatch({
            type: TOPIC_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
