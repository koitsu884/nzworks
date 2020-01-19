import {SET_CURRENT_USER, SIGN_OUT} from './types';
import history from '../history';
import Alert from '../utils/alert';
import client from '../utils/client';
import errorToStr from '../utils/errorToStr';

import {getSavedJobList} from './userActions';

export const getCurrentUser = () => dispatch => {
    client.get('user/me/')
    .then(res => {
        dispatch({
            type: SET_CURRENT_USER,
            payload: res.data
        })
        dispatch(getSavedJobList());
    })
    .catch(errors => {
        console.log('Failed to get current user');
        dispatch(signOut());
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
        dispatch(getSavedJobList());
        Alert.success("ログインしました")
    })
    .catch(errors => {
        Alert.error(errorToStr(errors));
    })
}

export const signUp = (formData) => dispatch => {
    client.post('user/', formData)
    .then(response => {
        sessionStorage.setItem('email', formData.email);
        history.push('/emailsent');
    })
    .catch(errors => {
        Alert.error(errorToStr(errors));
    })
}

export const signOut = () => dispatch => {
    // history.push("/");
    client.delete('auth/')
        .then(res => {
            dispatch({
                type: SIGN_OUT
            })
            Alert.success("ログアウトしました")
        })
        .catch(errors => {
            console.log(errors)
        })
}
