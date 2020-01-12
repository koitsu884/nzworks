import client from '../utils/client';
import Alert from '../utils/alert';
import errorToStr from '../utils/errorToStr';
import { 
    SET_PROFILE_LIST,
    SET_LATEST_PROFILE_LIST
} from './types';
import {setLoading} from './commonActions';

const DEFAULT_PAGE_SIZE = 12;

const setProfileList = (profileList, itemCount) => {
    return {
        type: SET_PROFILE_LIST,
        payload: {users: profileList, count: itemCount} 
    }
}

const setLatestProfileList = (profileList) => {
    return {
        type: SET_LATEST_PROFILE_LIST,
        payload: profileList
    }
}

export const getUserList = (page = 1, size=DEFAULT_PAGE_SIZE) => dispatch => {
    let params={
        page: page,
        size: size
    }
    setLoading(true);

    client.get('user', {params:params})
        .then(res => {
            const {count, users} = res.data;
            dispatch( setProfileList(users, count));
        })
        .catch(error => {
            console.log(error);
            Alert.error(errorToStr(error));
        })
        .finally(() => {
            setLoading(false);
        })
}

export const getLatestUserList = () => dispatch => {
    let params={
        page: 1,
        size: 5
    }

    client.get('user', {params:params})
        .then(res => {
            const {users} = res.data;
            dispatch( setLatestProfileList(users));
        })
        .catch(error => {
            console.log(error);
            Alert.error(errorToStr(error));
        })
}
