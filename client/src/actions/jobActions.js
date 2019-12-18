import client from '../utils/client';
import Alert from '../utils/alert';
import errorToStr from '../utils/errorToStr';
import history from '../history';
import { 
    SET_JOB_DETAILS,
    SET_JOB_SEARCH_FILTER, 
    SET_JOB_SEARCH_RESULT,
    SET_CURRENT_PAGE
} from './types';
import {setLoading} from './commonActions';

const setJobDetails = jobDetails => {
    return {
        type: SET_JOB_DETAILS,
        payload: jobDetails 
    }
}

const setCurrentPage = page => {
    return {
        type: SET_CURRENT_PAGE,
        payload: page
    }
}

const setFilter = filter => {
    return {
        type: SET_JOB_SEARCH_FILTER,
        payload: filter
    }
}

const setSearchResult = result => {
    return {
        type: SET_JOB_SEARCH_RESULT,
        payload: result
    }
}

export const getJobDetails = id => dispatch => {
    dispatch(setJobDetails(null));
    dispatch(setLoading());
    client.get('job/' + id).then(response => {
        dispatch(setJobDetails(response.data));
    }).catch(error => {
        Alert.error(errorToStr(error));
    })
    .finally(() => {
        dispatch(setLoading(false));
    })
}

export const addNewJob = fd => dispatch => {
    dispatch(setLoading());
    client.post('job', fd).then(response => {
        Alert.success("新しい求人広告を追加しました")
        history.push('/mypage/postedjoblist');
    }).catch(error => {
        Alert.error(errorToStr(error));
    })
    .finally(() => {
        dispatch(setLoading(false));
    })
}

export const updateJob = (id, fd) => dispatch => {
    dispatch(setLoading());
    client.put('job/' + id, fd).then(response => {
        Alert.success("求人広告を更新しました")
        history.push('/mypage/postedjoblist');
    }).catch(error => {
        Alert.error(errorToStr(error));
    })
    .finally(() => {
        dispatch(setLoading(false));
    })
}

export const changePage = page => dispatch => {
    dispatch(setCurrentPage(page));
}

export const startSearch = (filter, page, size) => dispatch => {
    dispatch(setLoading());
    dispatch(setFilter(filter));

    let params = {
        page:page,
        size:size
    }

    client.post('job/search', filter, {params: params}).then(response => {
        dispatch(setSearchResult(response.data));
    }).catch(error => {
        Alert.error(errorToStr(error));
    })
    .finally(() => {
        dispatch(setLoading(false));
    })
}