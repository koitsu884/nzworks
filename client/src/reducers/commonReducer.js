import { SET_LOADING, SET_ERRORS, SET_AREA_LIST } from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    areaList: [],
    errors: {}
}

export default ( state = INITIAL_STATE, action) => {
    switch(action.type){
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case SET_AREA_LIST:
            return {
                ...state,
                areaList: action.payload
            }
        case SET_ERRORS:
            return {
                ...state,
                errors: action.payload
            }
        default:
            return state;
    }
}