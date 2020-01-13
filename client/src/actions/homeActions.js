import client from '../utils/client';
import Alert from '../utils/alert';
import errorToStr from '../utils/errorToStr';
import { SET_LATEST_JOBLIST, SET_LATEST_FEEDLIST } from './types';
import {setLoading} from './commonActions';


const setLatestJobList = jobList => {
    return {
        type: SET_LATEST_JOBLIST,
        payload: jobList 
    }
}

const setLatestFeedList = feedList => {
    return {
        type: SET_LATEST_FEEDLIST,
        payload: feedList 
    }
}

export const getLatestFeedList = () => dispatch => {
    const params = {
        limit: 1,
    };
    
    client.get('feed', {params:params}).then(response => {
        dispatch(setLatestFeedList(response.data[0].jobList));
    }).catch(error => {
        console.log(error);
    })
}

export const getLatestJobList = () => dispatch => {
    dispatch(setLoading());
    const params = {
        limit: 10,
    };
    
    client.get('job', {params:params}).then(response => {
        dispatch(setLatestJobList(response.data));
    }).catch(error => {
        Alert.error(errorToStr(error));
    })
    .finally(() => {
        dispatch(setLoading(false));
    })
}