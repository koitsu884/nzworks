import {
    SET_PROFILE_LIST,
    SET_LATEST_PROFILE_LIST
} from '../actions/types';

const INITIAL_STATE = {
    profileList: [],
    latestProfileList: [],
    itemCount: 0
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_PROFILE_LIST:
            return {
                ...state,
                profileList: action.payload.users,
                itemCount: action.payload.count
            }
        case SET_LATEST_PROFILE_LIST:
            return {
                ...state,
                latestProfileList: action.payload
            }
        default:
            return state;
    }
}
