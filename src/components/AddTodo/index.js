import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './addTodo.css';
import { addTodo, isEditing } from '../../actions';

class AddTodo extends Component {
  componentDidUpdate() {
    if (this.props.isEditing) {
      this.refs.input.focus();
    } else {
      this.refs.input.blur();
    }
  }
  render() {
    const palceholder = this.props.isEditing ? '我要...' : '下拉添加';
    return (
      <form className={styles.wrap} onSubmit={e => {
        e.preventDefault();
        if (input.value.trim()) {
          this.props.dispatch(addTodo(input.value));
          this.props.cancelEdit();
          input.value = '';
        }
      }}>
        <input ref="input" className={styles.input} ref={node => {
          input = node;
        }} placeholder={palceholder}/>
      </form>
    )
  }
}

const mapStateToProps = ({ isEditing }) => ({ isEditing })

export default connect(mapStateToProps)(AddTodo);
