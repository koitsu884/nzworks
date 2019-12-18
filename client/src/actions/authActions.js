import {SET_CURRENT_USER, SIGN_OUT} from './types';
import history from '../history';
import Alert from '../utils/alert';
import client from '../utils/client';
import errorToStr from '../utils/errorToStr';

export const getCurrentUser = () => dispatch => {
    client.get('user/me/')
    .then(res => {
        dispatch({
            type: SET_CURRENT_USER,
            payload: res.data
        })
    })
    .catch(errors => {
        console.log('Failed to get current user');
    })
}

export const signIn = (email, password) => dispatch => {
    client.post('auth/', {email: email, password:password})
    .then(res => {
        history.push('/');
        dispatch({
            type: SET_CURRENT_USER,
            payload: res.data
        })
    })
    .catch(errors => {
        Alert.error(errorToStr(errors));
    })
}

export const signUp = (formData) => dispatch => {
    client.post('user/', formData)
    .then(response => {
        history.push('static/emailsent');
    })
    .catch(errors => {
        Alert.error(errorToStr(errors));
    })
}

export const signOut = () => dispatch => {
    client.delete('auth/')
        .then(res => {
            dispatch({
                type: SIGN_OUT
            })
        })
        .catch(errors => {
            console.log(errors)
        })
}
