import {
    SET_AVATAR,
    SET_PROFILE,
    SET_UPLOADING_PHOTO_COUNT,
    SET_IMAGES,
    ADD_SAVED_JOB,
    REMOVE_SAVED_JOB,
    SET_APPLY,
    SIGN_OUT,
    SET_SAVED_JOB_LIST,
    SET_SAVED_JOB
} from './types';
import { setLoading } from './commonActions';
import Alert from '../utils/alert';
import client from '../utils/client';
import errorToStr from '../utils/errorToStr';
import history from '../history';

const setAvatar = imageObj => {
    return {
        type: SET_AVATAR,
        payload: imageObj
    }
}

const setProfile = profile => {
    return {
        type: SET_PROFILE,
        payload: profile
    }
}

const setImages = images => {
    return {
        type: SET_IMAGES,
        payload: images
    }
}

export const addSavedJob = savedJob => {
    return {
        type: ADD_SAVED_JOB,
        payload: savedJob
    }
}

const removeSavedJob = jobId => {
    return {
        type: REMOVE_SAVED_JOB,
        payload: jobId
    }
}

const setApply = jobId => {
    return {
        type: SET_APPLY,
        payload: jobId
    }
}

const setSavedJobList = jobList => {
    return {
        type: SET_SAVED_JOB_LIST,
        payload: jobList
    }
}

const setSavedJob = savedJob => {
    return {
        type: SET_SAVED_JOB,
        payload: savedJob
    }
}
/*-----------------------------------------------------------
 Export actions
------------------------------------------------------------*/
export const getUserImages = () => dispatch => {
    client.get('user/images')
        .then(response => {
            dispatch(setImages(response.data))
        }).catch(error => {
            console.log(error);
        })
}

export const deleteUserImage = (image, isMain = false) => dispatch => {
    dispatch(setLoading());
    client.delete('user/images/' + encodeURIComponent(image.image_id))
        .then(response => {
            Alert.success('写真を削除しました');
            dispatch(setImages(response.data))
            if (isMain) {
                dispatch(setAvatar(null));
            }
        }).catch(error => {
            Alert.error(errorToStr(error));
        })
        .finally(() => {
            dispatch(setLoading(false));
        })
}

export const updateProfile = fd => dispatch => {
    dispatch(setLoading());
    client.patch('user/profile', fd)
        .then(response => {
            Alert.success('プロフィール情報を更新しました');
            dispatch(setProfile(response.data));
        }).catch(error => {
            Alert.error(errorToStr(error));
        })
        .finally(() => {
            dispatch(setLoading(false));
        })
}

export const getSavedJobList = () => dispatch => {
    client.get('savedjob/')
        .then(response => {
            dispatch(setSavedJobList(response.data));
        })
        .catch(error => {
            Alert.error(errorToStr(error));
        })
}

export const refleshSavedJob = jobId => dispatch => {
    client.get(`savedjob/${jobId}`)
        .then(response => {
            dispatch(setSavedJob(response.data))
        })
}

export const saveJob = (userId, jobId, applied=false) => dispatch => {
    client.post('savedjob/', {user: userId, job: jobId, applied:applied})
    .then(response => {
        dispatch(getSavedJobList());

    }).catch(error => {
        Alert.error(errorToStr(error));
    })
}

export const unsaveJob = id => dispatch => {
    client.delete('savedjob/' + id)
    .then(response => {
        dispatch(removeSavedJob(id));

    }).catch(error => {
        Alert.error(errorToStr(error));
    })
}

export const applyJob = (userId, jobId) => dispatch => {
    client.put('savedjob', {user: userId, job: jobId, applied:true})
        .then(response => {
            dispatch(setApply(jobId))
        })
        .catch(error => {
            console.log(error);
            Alert.error(errorToStr(error));
        })
}

export const deleteAccount = () => dispatch => {
    history.push("/");
    client.delete('user')
        .then(response => {
            Alert.success("アカウントを削除しました");
            dispatch({
                type: SIGN_OUT
            })
        })
        .catch(error => {
            Alert.error(errorToStr(error));
        })
}