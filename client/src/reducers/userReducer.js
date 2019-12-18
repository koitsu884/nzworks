import {
    SET_CURRENT_USER,
    SET_AVATAR,
    SIGN_OUT,
    SET_PROFILE,
    SET_IMAGES,
    SET_UPLOADING_PHOTO_COUNT,
    ADD_APPLIED_JOB,
    ADD_SAVED_JOB,
    REMOVE_APPLIED_JOB,
    REMOVE_SAVED_JOB,
} from '../actions/types';

const INITIAL_STATE = {
    currentUser: null,
    uploadingPhotoCount: 0
}

export default (state = INITIAL_STATE, action) => {
    let tempUser;
    switch (action.type) {
        case SIGN_OUT:
            return { currentUser: null };
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };
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
        case SET_UPLOADING_PHOTO_COUNT:
            return {
                ...state,
                uploadingPhotoCount: action.payload
            }
        case ADD_SAVED_JOB:
            tempUser = { ...state.currentUser };
            tempUser.profile.savedJobs.push(action.payload);

            return {
                ...state,
                currentUser: tempUser
            }
        case REMOVE_SAVED_JOB:
            tempUser = { ...state.currentUser };
            tempUser.profile.savedJobs = tempUser.profile.savedJobs.filter(jobs => jobs._id !== action.payload);

            return {
                ...state,
                currentUser: tempUser
            }
        case ADD_APPLIED_JOB:
            tempUser = { ...state.currentUser };
            tempUser.profile.appliedJobs.push(action.payload);

            return {
                ...state,
                currentUser: tempUser
            }
        case REMOVE_APPLIED_JOB:
            tempUser = { ...state.currentUser };
            tempUser.profile.appliedJobs = tempUser.profile.appliedJobs.filter(jobs => jobs._id !== action.payload);

            return {
                ...state,
                currentUser: tempUser
            }
        default:
            return state;
    }
}