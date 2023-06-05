import axios from 'axios'
import { 
    GRUPO_LIST_REQUEST, 
    GRUPO_LIST_SUCCESS, 
    GRUPO_LIST_FAIL,
    GRUPO_DETAILS_REQUEST,
    GRUPO_DETAILS_SUCCESS,
    GRUPO_DETAILS_FAIL,     
} from '../constants/grupoConstants'

export const listGrupos = () => async (dispatch) => {
    try{
        dispatch({type: GRUPO_LIST_REQUEST })
        const { data } = await axios.get('/api/grupos/')

        dispatch({
            type: GRUPO_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: GRUPO_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })        
    }
}

export const listGrupoDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: GRUPO_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/grupos/${id}`)

        dispatch({
            type: GRUPO_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: GRUPO_DETAILS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })        
    }
}