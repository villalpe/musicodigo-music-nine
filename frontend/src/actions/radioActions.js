import axios from 'axios'
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

export const listRadios = (keyword = '') => async (dispatch) => {
    try{
        dispatch({type: RADIO_LIST_REQUEST })
        const { data } = await axios.get(`/api/radios${keyword}`)

        dispatch({
            type: RADIO_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: RADIO_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })        
    }
}

export const listRadioDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: RADIO_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/radios/${id}`)

        dispatch({
            type: RADIO_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: RADIO_DETAILS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })        
    }
}

export const deleteRadio = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: RADIO_DELETE_REQUEST
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
            `/api/radios/delete/${id}/`,
            config
        )

        dispatch({
            type: RADIO_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: RADIO_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createRadio = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: RADIO_CREATE_REQUEST
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
            `/api/radios/create/`,
            {},
            config
        )

        dispatch({
            type: RADIO_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: RADIO_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateRadio = (radio) => async (dispatch, getState) => {
    try {
        dispatch({
            type: RADIO_UPDATE_REQUEST
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
            `/api/radios/update/${radio._id}/`,
            radio,
            config
        )

        dispatch({
            type: RADIO_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({ 
            type: RADIO_DETAILS_SUCCESS, 
            payload: data
        })


    } catch (error) {
        dispatch({
            type: RADIO_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

