import {combineReducers } from 'redux';
import userReducer from './userReducer';
import commonReducer from './commonReducer';
import jobReducer from './jobReducer';
import homeReducer from './homeReducer';
import profileReducer from './profileReducer';
import adminReducer from './adminReducer';
import threadReducer from './threadReducer';

export default combineReducers({
    user: userReducer,
    profile: profileReducer,
    home: homeReducer,
    job: jobReducer,
    thread: threadReducer,
    common: commonReducer,
    admin: adminReducer,
})