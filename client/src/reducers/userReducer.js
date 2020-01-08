import {
    SET_CURRENT_USER,
    SET_AVATAR,
    SIGN_OUT,
    SET_USERNAME,
    SET_PROFILE,
    SET_IMAGES,
    SET_APPLY,
    ADD_SAVED_JOB,
    REMOVE_SAVED_JOB,
    DELETE_USER,
    SET_SAVED_JOB_LIST,
    SET_SAVED_JOB
} from '../actions/types';

const INITIAL_STATE = {
    currentUser: null,
    savedJobList: []
}

export default (state = INITIAL_STATE, action) => {
    let tempUser;
    let index;
    
    switch (action.type) {
        case SIGN_OUT:
            return { currentUser: null };
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        case SET_USERNAME:
            tempUser = { ...state.currentUser };
            tempUser.name = action.payload;

            return {
                ...state,
                currentUser: tempUser
            }
        case SET_AVATAR:
            tempUser = { ...state.currentUser };
            tempUser.profile.avatar = action.payload;

            return {
                ...state,
                currentUser: tempUser
            }
        case SET_PROFILE:
            tempUser = { ...state.currentUser };
            tempUser.profile = action.payload;

            return {
                ...state,
                currentUser: tempUser
            }
        case SET_IMAGES:
            tempUser = { ...state.currentUser };
            tempUser.profile.images = action.payload;

            return {
                ...state,
                currentUser: tempUser
            }
        case SET_SAVED_JOB_LIST:
            return {
                ...state,
                savedJobList: action.payload
            }
        case SET_SAVED_JOB:
            let tempSavedJobList = [...state.savedJobList];
            index = state.savedJobList.findIndex(savedJob => savedJob._id === action.payload._id);
            if(index >= 0){
                tempSavedJobList[index] = action.payload
            }

            return {
                ...state,
                savedJobList: tempSavedJobList
            }
        case ADD_SAVED_JOB:
            return {
                ...state,
                savedJobList: [...state.savedJobList, action.payload]
            }
        case REMOVE_SAVED_JOB:
            return {
                ...state,
                savedJobList: state.savedJobList.filter(jobs => jobs._id !== action.payload)
            }
        case SET_APPLY:
            let tempJobList = [...state.savedJobList];
            index = tempJobList.findIndex(savedJob => savedJob.job === action.payload);
            tempJobList[index].applied = true;

            return {
                ...state,
                savedJobList: tempJobList
            }
        case DELETE_USER:
            return INITIAL_STATE
        default:
            return state;
    }
}