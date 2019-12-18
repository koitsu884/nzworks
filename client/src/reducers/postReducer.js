import {  } from '../actions/types';

const INITIAL_STATE = {
    postList: [],
    postDetails: null,
    searchFilter: {},
    searchResult: []
}

export default ( state = INITIAL_STATE, action) => {
    switch(action.type){
        default:
            return state;
    }
}
