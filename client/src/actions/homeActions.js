import client from '../utils/client';
import Alert from '../utils/alert';
import errorToStr from '../utils/errorToStr';
import { SET_LATEST_JOBLIST } from './types';
import {setLoading} from './commonActions';


const setLatestJobList = jobList => {
    return {
        type: SET_LATEST_JOBLIST,
        payload: jobList 
    }
}

export const getLatestJobList = () => dispatch => {
    dispatch(setLoading());
    const params = {
        limit: 12,
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