import React from 'react';
import styles from './todoItem.css'

const TodoItem = ({ id, text, completed }) => (
  <li data-id={id} className={completed ? styles.itemComplied : styles.item} style={{
    textDecoration:  completed ? 'line-through' : 'none'
  }}>
    {text}
  </li>
)

export default TodoItem;
