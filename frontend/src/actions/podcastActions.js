import axios from 'axios'
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

export const listPodcasts = (keyword = '') => async (dispatch) => {
    try{
        dispatch({type: PODCAST_LIST_REQUEST })
        const { data } = await axios.get(`/api/podcasts${keyword}`)

        dispatch({
            type: PODCAST_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PODCAST_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })        
    }
}

export const listPodcastDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: PODCAST_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/podcasts/${id}`)

        dispatch({
            type: PODCAST_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PODCAST_DETAILS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })        
    }
}

export const deletePodcast = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PODCAST_DELETE_REQUEST
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
            `/api/podcasts/delete/${id}/`,
            config
        )

        dispatch({
            type: PODCAST_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: PODCAST_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createPodcast = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PODCAST_CREATE_REQUEST
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
            `/api/podcasts/create/`,
            {},
            config
        )

        dispatch({
            type: PODCAST_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PODCAST_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updatePodcast = (podcast) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PODCAST_UPDATE_REQUEST
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
            `/api/podcasts/update/${podcast._id}/`,
            podcast,
            config
        )

        dispatch({
            type: PODCAST_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({ 
            type: PODCAST_DETAILS_SUCCESS, 
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PODCAST_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

