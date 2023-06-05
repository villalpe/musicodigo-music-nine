import axios from 'axios';
import { 
    FORUM_LIST_REQUEST, 
    FORUM_LIST_SUCCESS, 
    FORUM_LIST_FAIL,
    FORUM_DETAILS_REQUEST, 
    FORUM_DETAILS_SUCCESS, 
    FORUM_DETAILS_FAIL,
    FORUM_DELETE_REQUEST, 
    FORUM_DELETE_SUCCESS, 
    FORUM_DELETE_FAIL,
    FORUM_CREATE_REQUEST, 
    FORUM_CREATE_SUCCESS, 
    FORUM_CREATE_FAIL,
    FORUM_UPDATE_REQUEST, 
    FORUM_UPDATE_SUCCESS, 
    FORUM_UPDATE_FAIL,

} from '../constants/forumConstants';

export const listForums = () => async (dispatch) => {
    try{
        dispatch({type: FORUM_LIST_REQUEST })
        const { data } = await axios.get('/api/forums/')

        dispatch({
            type: FORUM_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: FORUM_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })        
    }
}

export const listForumDetails = (id) => async (dispatch) => {
    try{
        dispatch({
            type: FORUM_DETAILS_REQUEST
        })
        const {data} = await axios.get(`/api/forums/${id}`)

        dispatch({
            type: FORUM_DETAILS_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: FORUM_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteForum = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: FORUM_DELETE_REQUEST
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
            `/api/forums/delete/${id}/`,
            config
        )

        dispatch({
            type: FORUM_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: FORUM_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createForum = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: FORUM_CREATE_REQUEST
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
            `/api/forums/create/`,
            {},
            config
        )

        dispatch({
            type: FORUM_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: FORUM_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateForum = (forum) => async (dispatch, getState) => {
    try {
        dispatch({
            type: FORUM_UPDATE_REQUEST
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
            `/api/forums/update/${forum._id}/`,
            forum,
            config
        )

        dispatch({
            type: FORUM_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({ 
            type: FORUM_DETAILS_SUCCESS, 
            payload: data
        })


    } catch (error) {
        dispatch({
            type: FORUM_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

