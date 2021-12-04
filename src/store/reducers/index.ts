import { combineReducers } from 'redux';

import authReducer from './auth';
import loaderReducer from './loader';
import postReducer from './post';

export const reducer = combineReducers({
  loader: loaderReducer,
  auth: authReducer,
  posts: postReducer,
});
