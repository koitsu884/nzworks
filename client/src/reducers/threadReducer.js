import {
    SET_THREAD_LIST,
    SET_THREAD,
    SET_THREAD_COMMENT,
    SELECT_THREAD_COMMENT
} from '../actions/types';

const INITIAL_STATE = {
    selectedThread: null,
    selectedComment: null,
    threadList: [],
}

export default (state = INITIAL_STATE, action) => {
    let temp = null;
    switch (action.type) {
        case SET_THREAD_LIST:
            return {
                ...state,
                threadList: action.payload
            }
        case SET_THREAD:
            return {
                ...state,
                selectedThread: action.payload
            }
        case SET_THREAD_COMMENT:
            temp = { ...state.selectedThread };
            temp.comments = action.payload;

            return {
                ...state,
                selectedThread: temp
            }
        case SELECT_THREAD_COMMENT:
            return {
                ...state,
                selectedComment: action.payload
            }
        default:
            return state;
    }
}
