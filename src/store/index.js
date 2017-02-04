import { createStore } from 'redux';
import todoApp from '../reducers';
import throtle from 'lodash/throttle';
import { loadState, saveState } from '../storage';

const preState = loadState();
const store = createStore(todoApp, preState);

store.subscribe(throtle(_ => {
  const todos = store.getState().todos;
  saveState({
    todos: todos
  })
}, 1000));

export default store;
