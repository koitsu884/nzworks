import { SET_LATEST_JOBLIST, SET_LATEST_FEEDLIST } from '../actions/types';

const INITIAL_STATE = {
    latestJobList: [],
    latestFeedList: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_LATEST_JOBLIST:
            return {
                ...state,
                latestJobList: action.payload
            }
        case SET_LATEST_FEEDLIST:
            return {
                ...state,
                latestFeedList: action.payload
            }
        default:
            return state;
    }
}
