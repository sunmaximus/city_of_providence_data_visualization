import { combineReducers } from 'redux'

import { providenceReducer } from '../Providence/module/providence';

const rootReducer = combineReducers({
  providence: providenceReducer
});
  
export default rootReducer;