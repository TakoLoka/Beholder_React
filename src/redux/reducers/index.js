import { combineReducers } from 'redux';
import {userReducer, premiumDMReducer} from './userReducer';

export default combineReducers({
    data: userReducer,
    isDm: premiumDMReducer
});