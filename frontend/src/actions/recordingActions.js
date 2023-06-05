import axios from 'axios'
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

export const listRecordings = (keyword = '') => async (dispatch) => {
    try{
        dispatch({type: RECORDING_LIST_REQUEST })
        const { data } = await axios.get(`/api/recordings${keyword}`)

        dispatch({
            type: RECORDING_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: RECORDING_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })        
    }
}

export const listRecordingDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: RECORDING_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/recordings/${id}`)

        dispatch({
            type: RECORDING_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: RECORDING_DETAILS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })        
    }
}

export const deleteRecording = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: RECORDING_DELETE_REQUEST
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
            `/api/recordings/delete/${id}/`,
            config
        )

        dispatch({
            type: RECORDING_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: RECORDING_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createRecording = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: RECORDING_CREATE_REQUEST
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
            `/api/recordings/create/`,
            {},
            config
        )

        dispatch({
            type: RECORDING_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: RECORDING_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateRecording = (recording) => async (dispatch, getState) => {
    try {
        dispatch({
            type: RECORDING_UPDATE_REQUEST
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
            `/api/recordings/update/${recording._id}/`,
            recording,
            config
        )

        dispatch({
            type: RECORDING_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({ 
            type: RECORDING_DETAILS_SUCCESS, 
            payload: data
        })


    } catch (error) {
        dispatch({
            type: RECORDING_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listByCategoryma = () => async (dispatch) => {
    try {
        dispatch({ type: RECORDING_CATEGORY_REQUEST })

        const { data } = await axios.get(`/api/recordings/bycategoryma/`)

        dispatch({
            type: RECORDING_CATEGORY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: RECORDING_CATEGORY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listByCategoryge = () => async (dispatch) => {
    try {
        dispatch({ type: RECORDING_CATEGORY_REQUEST })

        const { data } = await axios.get(`/api/recordings/bycategoryge/`)

        dispatch({
            type: RECORDING_CATEGORY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: RECORDING_CATEGORY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listByCategorygm = () => async (dispatch) => {
    try {
        dispatch({ type: RECORDING_CATEGORY_REQUEST })

        const { data } = await axios.get(`/api/recordings/bycategorygm/`)

        dispatch({
            type: RECORDING_CATEGORY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: RECORDING_CATEGORY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listByCategoryrm = () => async (dispatch) => {
    try {
        dispatch({ type: RECORDING_CATEGORY_REQUEST })

        const { data } = await axios.get(`/api/recordings/bycategoryrm/`)

        dispatch({
            type: RECORDING_CATEGORY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: RECORDING_CATEGORY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
