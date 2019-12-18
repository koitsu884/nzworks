import { SET_LATEST_JOBLIST } from '../actions/types';

const INITIAL_STATE = {
    latestJobList: []
}

export default ( state = INITIAL_STATE, action) => {
    switch(action.type){
        case SET_LATEST_JOBLIST:
            return {
                ...state,
                latestJobList: action.payload
            }
        default:
            return state;
    }
}
