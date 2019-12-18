import {
    SET_JOB_DETAILS,
    SET_CURRENT_PAGE,
    SET_JOB_SEARCH_FILTER,
    SET_JOB_SEARCH_RESULT
} from '../actions/types';

const INITIAL_STATE = {
    jobDetails: null,
    searchFilter: {},
    searchResult: [],
    currentPage: 1,
    itemCount: 0
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_JOB_DETAILS:
            return {
                ...state,
                jobDetails: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case SET_JOB_SEARCH_FILTER:
            return {
                ...state,
                searchFilter: action.payload
            }
        case SET_JOB_SEARCH_RESULT:
            return {
                ...state,
                searchResult: action.payload.jobs,
                itemCount: action.payload.count
            }
        default:
            return state;
    }
}
