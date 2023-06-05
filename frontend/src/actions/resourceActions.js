import axios from 'axios'
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

export const listResources = (keyword = '') => async (dispatch) => {
    try{
        dispatch({type: RESOURCE_LIST_REQUEST })
        const { data } = await axios.get(`/api/resources${keyword}`)

        dispatch({
            type: RESOURCE_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: RESOURCE_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })        
    }
}

export const listResourceDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: RESOURCE_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/resources/${id}`)

        dispatch({
            type: RESOURCE_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: RESOURCE_DETAILS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })        
    }
}

export const deleteResource = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: RESOURCE_DELETE_REQUEST
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
            `/api/resources/delete/${id}/`,
            config
        )

        dispatch({
            type: RESOURCE_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: RESOURCE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createResource = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: RESOURCE_CREATE_REQUEST
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
            `/api/resources/create/`,
            {},
            config
        )

        dispatch({
            type: RESOURCE_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: RESOURCE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateResource = (resource) => async (dispatch, getState) => {
    try {
        dispatch({
            type: RESOURCE_UPDATE_REQUEST
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
            `/api/resources/update/${resource._id}/`,
            resource,
            config
        )

        dispatch({
            type: RESOURCE_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({ 
            type: RESOURCE_DETAILS_SUCCESS, 
            payload: data
        })


    } catch (error) {
        dispatch({
            type: RESOURCE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}