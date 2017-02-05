import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEditing, toggleTodo, deleteTodo } from '../actions';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import styles from '../styles/main.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.startX = 0;
    this.startY = 0;
    this.isEditing = false;
    this.lockX = false;
    this.lockY = false;
  }

  touchStart = (e) => {
    this.startX = e.touches[0].pageX;
    this.startY = e.touches[0].pageY;
  }

  touchMove = (e) => {
    this.currentX = e.touches[0].pageX;
    this.currentY = e.touches[0].pageY;

    if (!this.lockX && this.currentX - this.startX) {
      this.lockY = true;
    }

    if (!this.lockY && this.currentY - this.startY) {
      this.lockX = true;
    }

    if (this.lockX) {
      if (this.currentY > this.startY) {
        let translateY = this.currentY - this.startY - 55;
        if (translateY > 0) {
          translateY = 0;
        }
        this.refs.wrapper.style.transform = `translateY(${translateY}px)`
      }
    }

    if (this.lockY) {
      let translateX = this.currentX - this.startX;
      const id = e.target.dataset.id;
      if (Math.abs(translateX) > 60) {
        return ;
      }
      if (id) {
        e.target.style.transform = `translateX(${translateX}px)`
      }
    }
  }

  touchEnd = (e) => {
    const { dispatch } = this.props;
    if (this.lockX) {
      if (this.currentY > this.startY) {
        if (this.currentY - this.startY >= 55) {
          dispatch(isEditing(true));
        } else {
          this.refs.wrapper.style.transform = `translateY(-55px)`;
        }
      }
    }

    if (this.lockY) {
      const translateX = this.currentX - this.startX;
      const id = e.target.dataset.id;
      if (id) {
        if (translateX > 0 && translateX > 60) {
          dispatch(toggleTodo(id))
        } else if (translateX < -60) {
          dispatch(deleteTodo(id))
        }
      }
      e.target.style.transform = '';
    }

    this.lockX = false;
    this.lockY = false;
  }

  cancelEdit = () => {
    this.refs.wrapper.style.transform = `translateY(-55px)`;
    this.props.dispatch(isEditing(false));
  }

  render() {
    const layerClass = this.props.isEditing ? styles.layer : styles.layerHide;
    return (
        <div
          onTouchStart={this.touchStart}
          onTouchMove={this.touchMove}
          onTouchEnd={this.touchEnd}
          className={styles.wrapper}
          ref="wrapper"
        >
          <AddTodo cancelEdit={this.cancelEdit}/>
          <TodoList />
          <div onClick={this.cancelEdit} onTouchStart={this.cancelEdit} className={layerClass}/>
        </div>
    )
  }
}

const mapStateToProps = ({ isEditing }) => ({ isEditing });

export default connect(mapStateToProps)(App);
