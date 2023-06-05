import axios from 'axios'
import { 
    PROJECT_LIST_REQUEST, 
    PROJECT_LIST_SUCCESS, 
    PROJECT_LIST_FAIL,
    PROJECT_DETAILS_REQUEST,
    PROJECT_DETAILS_SUCCESS,
    PROJECT_DETAILS_FAIL,
    PROJECT_DELETE_REQUEST, 
    PROJECT_DELETE_SUCCESS, 
    PROJECT_DELETE_FAIL,

    PROJECT_CREATE_REQUEST, 
    PROJECT_CREATE_SUCCESS, 
    PROJECT_CREATE_FAIL,
    PROJECT_CREATE_RESET,
    
    PROJECT_UPDATE_REQUEST, 
    PROJECT_UPDATE_SUCCESS, 
    PROJECT_UPDATE_FAIL,
    PROJECT_UPDATE_RESET, 
       
} from '../constants/projectConstants'

export const listProjects = (keyword = '') => async (dispatch) => {
    try{
        dispatch({type: PROJECT_LIST_REQUEST })
        const { data } = await axios.get(`/api/projects${keyword}`)

        dispatch({
            type: PROJECT_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PROJECT_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })        
    }
}

export const listProjectDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: PROJECT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/projects/${id}`)

        dispatch({
            type: PROJECT_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PROJECT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })        
    }
}

export const deleteProject = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PROJECT_DELETE_REQUEST
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
            `/api/projects/delete/${id}/`,
            config
        )

        dispatch({
            type: PROJECT_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: PROJECT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createProject = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PROJECT_CREATE_REQUEST
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
            `/api/projects/create/`,
            {},
            config
        )

        dispatch({
            type: PROJECT_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PROJECT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateProject = (project) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PROJECT_UPDATE_REQUEST
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
            `/api/projects/update/${project._id}/`,
            project,
            config
        )

        dispatch({
            type: PROJECT_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({ 
            type: PROJECT_DETAILS_SUCCESS, 
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PROJECT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}