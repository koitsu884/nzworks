import client from '../utils/client';
import { ADMIN_SET_USER_LIST } from './types';

const DEFAULT_PAGE_SIZE = 12;

const setUserList = ( userList, itemCount) => {
    return {
        type: ADMIN_SET_USER_LIST,
        payload: { userList: userList, userCount: itemCount} 
    }
}

export const getUserList = (page = 1, size=DEFAULT_PAGE_SIZE, options={}) => dispatch => {
    let params={
        page: page,
        size: size
    }

    if(options.unverified){
        params.unverified = true;
    }

    client.get('admin/users', {params:params})
        .then(res => {
            const {count, users} = res.data;
            dispatch( setUserList(users, count));
        })
        .catch(error => {
            console.log(error);
        })
}

