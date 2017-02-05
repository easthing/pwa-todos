import React from 'react';
import { connect } from 'react-redux';
import styles from './todoList.css';
import TodoItem from '../TodoItem';

const TodoList = ({ todos }) => (
  <ul className={styles.list}>
    {todos.map(todo => <TodoItem key={todo.id} {...todo} />)}
  </ul>
)

const mapStateToProps = ({ todos }) => ({
  todos: todos
});

export default connect(mapStateToProps)(TodoList);
