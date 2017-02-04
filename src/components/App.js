import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEditing, toggleTodo } from '../actions';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import styles from '../styles/main.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.startX = 0;
    this.startY = 0;
    this.isEditing = false;
  }

  touchStart = (e) => {
    this.startX = e.touches[0].pageX;
    this.startY = e.touches[0].pageY;
  }

  touchMove = (e) => {
    this.currentX = e.touches[0].pageX;
    this.currentY = e.touches[0].pageY;
    if (this.currentY > this.startY) {
      let translateY = this.currentY - this.startY - 55;
      if (translateY >= 0) {
        translateY = 0;
      }

      this.refs.wrapper.style.transform = `translateY(${translateY}px)`
    }

    if (this.currentX > this.startX) {
      const translateX = this.currentX - this.startX;
      //e.target.style.transform = `translateX(${translateX}px)`
      //dispatch(toggleTodo(e.target.dataset.id));
    }

  }

  touchEnd = (e) => {
    const { dispatch } = this.props;
    if (this.currentY > this.startY) {
      if (this.currentY - this.startY >= 55) {
        dispatch(isEditing(true));
      } else {
        this.refs.wrapper.style.transform = `translateY(-55px)`;
      }
    }

    if (this.currentX > this.startX) {
      dispatch(toggleTodo(e.target.dataset.id));
    }
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
