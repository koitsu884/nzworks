import client from '../utils/client';
import { SET_THREAD_LIST, SET_THREAD, SET_THREAD_COMMENT, SELECT_THREAD_COMMENT } from './types';
import { setLoading } from './commonActions';
import Alert from '../utils/alert';
import errorToStr from '../utils/errorToStr';
import history from '../history';

const setThreadList = ( threadList ) => {
    return {
        type: SET_THREAD_LIST,
        payload: threadList
    }
}

const setThread = thread => {
    return {
        type: SET_THREAD,
        payload: thread
    }
}

const setThreadComment = comments => {
    return {
        type: SET_THREAD_COMMENT,
        payload: comments
    }
}

export const selectThreadComment = (commentId, comment) => {
    return {
        type: SELECT_THREAD_COMMENT,
        payload: {
            _id: commentId,
            comment: comment
        }
    }
}

export const addThread = fd => dispatch => {
    dispatch(setLoading(true));
    client.post('thread', fd, {
        headers: { 'content-type': 'multipart/form-data'}
    })
    .then(res => {
        dispatch(getThreadList());
        Alert.success("投稿しました");
        client.post(`thread/${res.data._id}/tweet`)
            .then(res => {
                console.log('Tweeted');
            })
            .catch(error => {
                console.log(error);
                console.log('Tweet failed');
            })
        history.push('/thread');
    })
    .catch(error => {
        Alert.error(errorToStr(error));
    })
    .finally(() => {
        dispatch(setLoading(false));
    })
}

export const editThread = (id, fd) => dispatch => {
    dispatch(setLoading(true));
    client.patch('thread/' + id, fd)
    .then(res => {
        dispatch(getThreadList());
        dispatch(setThread(null));
        Alert.success("更新しました");
        history.push('/thread');
    })
    .catch(error => {
        Alert.error(errorToStr(error));
    })
    .finally(() => {
        dispatch(setLoading(false));
    })
}

export const deleteThread = id => dispatch => {
    dispatch(setLoading(true));
    client.delete('thread/' + id)
    .then(res => {
        Alert.success("削除しました");
        dispatch(getThreadList());
    })
    .catch(error => {
        Alert.error(errorToStr(error));
    })
    .finally(() => {
        dispatch(setLoading(false));
    })
}

export const getThreadList = () => dispatch => {
    dispatch(setLoading(true));
    client.get('thread')
        .then(res => {
            dispatch( setThreadList(res.data));
        })
        .catch(error => {
            Alert.error(errorToStr(error));
        })
        .finally(() => {
            dispatch(setLoading(false));
        })
}

export const getThread = id => dispatch => {
    dispatch(setLoading(true));
    dispatch(setThread(null));

    client.get(`thread/${id}`)
        .then(res => {
            dispatch( setThread(res.data));
        })
        .catch(error => {
            Alert.error(errorToStr(error));
        })
        .finally(() => {
            dispatch(setLoading(false))
        })
}

export const getThreadComment = id => dispatch => {
    client.get(`thread/${id}/comment`)
        .then(res => {
            dispatch( setThreadComment(res.data));
        })
        .catch(error => {
            Alert.error(errorToStr(error));
        })
}

export const addComment = (id, comment) => dispatch => {
    client.post(`thread/${id}/comment`, {comment:comment})
    .then(res => {
        dispatch(getThreadComment(id));
        Alert.success("投稿しました");
    })
    .catch(error => {
        Alert.error(errorToStr(error));
    })
}

export const editComment = (id, commentId, comment) => dispatch => {
    client.put(`thread/${id}/comment/${commentId}`, {comment:comment})
    .then(res => {
        dispatch(getThreadComment(id));
        Alert.success("投稿しました");
    })
    .catch(error => {
        Alert.error(errorToStr(error));
    })
}

export const deleteComment = (id, commentId) => dispatch => {
    client.delete(`thread/${id}/comment/${commentId}`)
    .then(res => {
        dispatch(getThreadComment(id));
        Alert.success("削除しました");
    })
    .catch(error => {
        Alert.error(errorToStr(error));
    })
}