import {combineReducers } from 'redux';
import userReducer from './userReducer';
import commonReducer from './commonReducer';
import jobReducer from './jobReducer';
import homeReducer from './homeReducer';
import profileReducer from './profileReducer';
import adminReducer from './adminReducer';

export default combineReducers({
    user: userReducer,
    profile: profileReducer,
    home: homeReducer,
    job: jobReducer,
    common: commonReducer,
    admin: adminReducer,
})