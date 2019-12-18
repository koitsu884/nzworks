import {
    SET_AVATAR,
    SET_PROFILE,
    SET_UPLOADING_PHOTO_COUNT,
    SET_IMAGES,
    ADD_SAVED_JOB,
    REMOVE_SAVED_JOB,
    ADD_APPLIED_JOB,
    REMOVE_APPLIED_JOB
} from './types';
import { setLoading } from './commonActions';
import Alert from '../utils/alert';
import client from '../utils/client';
import errorToStr from '../utils/errorToStr';

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

export const setUploadingPhotoCount = count => {
    return {
        type: SET_UPLOADING_PHOTO_COUNT,
        payload: count
    }
}

export const addSavedJob = jobId => {
    return {
        type: ADD_SAVED_JOB,
        payload: jobId
    }
}

const removeSavedJob = jobId => {
    return {
        type: REMOVE_SAVED_JOB,
        payload: jobId
    }
}

const addAppliedJob = jobId => {
    return {
        type: ADD_APPLIED_JOB,
        payload: jobId
    }
}

const removeAppliedJob = jobId => {
    return {
        type: REMOVE_APPLIED_JOB,
        payload: jobId
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

export const saveJob = jobId => dispatch => {
    client.patch('user/jobs/' + jobId, null, { params: { type: 'save' } })
        .then(response => {
            Alert.success('保存リストに追加しました');
            dispatch(addSavedJob(jobId));

        }).catch(error => {
            Alert.error(errorToStr(error));
        })
}

export const unsaveJob = jobId => dispatch => {
    client.patch('user/jobs/' + jobId, null, { params: { type: 'save', remove: 'true' } })
        .then(response => {
            Alert.success('保存リストから削除しました');
            dispatch(removeSavedJob(jobId));

        }).catch(error => {
            Alert.error(errorToStr(error));
        })
}

export const saveAppliedJob = jobId => dispatch => {
    client.patch('user/jobs/' + jobId, null, { params: { type: 'apply' } })
        .then(response => {
            dispatch(addAppliedJob(jobId));

        }).catch(error => {
            Alert.error(errorToStr(error));
        })
}

export const unsaveAppliedJob = jobId => dispatch => {
    client.patch('user/jobs/' + jobId, null, { params: { type: 'apply', remove: 'true' } })
        .then(response => {
            dispatch(removeAppliedJob(jobId));

        }).catch(error => {
            Alert.error(errorToStr(error));
        })
}

