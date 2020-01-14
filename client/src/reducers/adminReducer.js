import { ADMIN_SET_USER_LIST } from '../actions/types';

const INITIAL_STATE = {
    userList: [],
    userCount: 0
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADMIN_SET_USER_LIST:
            return {
                ...state,
                userList: action.payload.userList,
                userCount: action.payload.userCount
            }
        default:
            return state;
    }
}
