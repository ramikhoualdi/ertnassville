import {combineReducers} from 'redux';

import userReducer from './User/user.reducer';
import propertyReducer from './Property/property.reducer';

export default combineReducers({
  user: userReducer,
  property: propertyReducer,
});
