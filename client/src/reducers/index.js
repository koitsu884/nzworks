import {combineReducers } from 'redux';
import userReducer from './userReducer';
import commonReducer from './commonReducer';
import jobReducer from './jobReducer';
import homeReducer from './homeReducer';

export default combineReducers({
    user: userReducer,
    home: homeReducer,
    job: jobReducer,
    common: commonReducer,
})