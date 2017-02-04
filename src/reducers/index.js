import { combineReducers } from 'redux';
import todos from './todos';
import isEditing from './isEditing';

const todoApp = combineReducers({
  todos,
  isEditing,
});

export default todoApp;
