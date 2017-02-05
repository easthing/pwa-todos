import React from 'react';
import styles from './todoItem.css'

const TodoItem = ({ id, text, completed }) => (
  <li className={completed ? styles.itemComplied : styles.item} style={{
    textDecoration:  completed ? 'line-through' : 'none'
  }}>
    <div className={styles.text}  data-id={id}>
      {text}
    </div>
    <div className={styles.action}>
      <div className={styles.complete}>{completed ? '取消' : '完成'}</div>
      <div className={styles.delete}>删除</div>
    </div>
  </li>
)

export default TodoItem;
