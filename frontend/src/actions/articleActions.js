import axios from 'axios';
import { 
    ARTICLE_LIST_REQUEST, 
    ARTICLE_LIST_SUCCESS, 
    ARTICLE_LIST_FAIL,
    ARTICLE_DETAILS_REQUEST, 
    ARTICLE_DETAILS_SUCCESS, 
    ARTICLE_DETAILS_FAIL,
    ARTICLE_DELETE_REQUEST, 
    ARTICLE_DELETE_SUCCESS, 
    ARTICLE_DELETE_FAIL,
    ARTICLE_CREATE_REQUEST, 
    ARTICLE_CREATE_SUCCESS, 
    ARTICLE_CREATE_FAIL,
    ARTICLE_CREATE_RESET,
    ARTICLE_UPDATE_REQUEST, 
    ARTICLE_UPDATE_SUCCESS, 
    ARTICLE_UPDATE_FAIL,
    ARTICLE_UPDATE_RESET,
} from '../constants/articleConstants';

export const listArticles = () => async (dispatch) => {
    try {
        dispatch({ type: ARTICLE_LIST_REQUEST })

        const { data } = await axios.get('/api/articles/')

        dispatch({
            type: ARTICLE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ARTICLE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listArticleDetails = (id) => async (dispatch) => {
    try{
        dispatch({
            type: ARTICLE_DETAILS_REQUEST
        })
        const {data} = await axios.get(`/api/articles/${id}`)

        dispatch({
            type: ARTICLE_DETAILS_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: ARTICLE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteArticle = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ARTICLE_DELETE_REQUEST
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
            `/api/articles/delete/${id}/`,
            config
        )

        dispatch({
            type: ARTICLE_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: ARTICLE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createArticle = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ARTICLE_CREATE_REQUEST
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
            `/api/articles/create/`,
            {},
            config
        )

        dispatch({
            type: ARTICLE_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ARTICLE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateArticle = (article) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ARTICLE_UPDATE_REQUEST
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
            `/api/articles/update/${article._id}/`,
            article,
            config
        )

        dispatch({
            type: ARTICLE_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({ 
            type: ARTICLE_DETAILS_SUCCESS, 
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ARTICLE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}