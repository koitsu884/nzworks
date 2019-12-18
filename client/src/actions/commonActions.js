
import {SET_LOADING, SET_AREA_LIST} from './types';
import client from '../utils/client';


export const setLoading = (flag = true) => {
    return {
        type: SET_LOADING,
        payload: flag
    }
}

const setAreaList = list => {
    return {
        type: SET_AREA_LIST,
        payload: list
    }
}

export const getAreaList = () => dispatch => {
    client.get('area')
        .then(response => {
            dispatch(setAreaList(response.data));
        })
        .catch(error => {
            console.log(error);
        })
}