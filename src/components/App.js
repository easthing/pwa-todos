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
    this.action = null;
  }

  touchStart = (e) => {
    this.startX = e.touches[0].pageX;
    this.startY = e.touches[0].pageY;
    this.refs.move.classList.remove('transition');
    e.target.classList.remove('transition');
  }

  touchMove = (e) => {
    this.currentX = e.touches[0].pageX;
    this.currentY = e.touches[0].pageY;
    if (e.target.parentNode.tagName === 'LI' && this.currentX !== this.startX && !this.lockX) {
      this.lockY = true
    } else {
      this.lockX = true;
    }

    if (this.lockX && this.currentY > this.startY) {
      let translateY =  Math.max(55 - (this.currentY - this.startY), 0);
      this.refs.move.style.transform = `translateY(-${translateY}px)`
    } else if (this.lockY){
      let translateX = this.currentX - this.startX;
      if (Math.abs(translateX) > 60) {
        translateX = translateX > 0 ? 60 : -60;
        this.action = translateX > 0 ? 'toggle' : 'delete';
      }
      e.target.style.transform = `translateX(${translateX}px)`
    }
  }

  touchEnd = (e) => {
    if (this.lockX) {
      this.refs.move.classList.add('transition')
      if (this.currentY - this.startY > 55) {
        this.props.dispatch(isEditing(true));
      } else {
        this.refs.move.style.transform = `translateY(-55px)`
      }
    } else {
      e.target.classList.add('transition');
      if (Math.abs(this.currentX - this.startX) >= 60) {
        const id = e.target.dataset.id;
        if (this.action === 'toggle') {
          this.props.dispatch(toggleTodo(id));
        } else {
          this.props.dispatch(deleteTodo(id));
        }
      }
      e.target.style.transform = 'translateX(0px)'
    }

    this.lockX = false;
    this.lockY = false;
  }

  cancelEdit = (e) => {
    this.refs.move.style.transform = `translateY(-55px)`;
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
        >
          <div ref="move" className={styles.move}>
            <AddTodo cancelEdit={this.cancelEdit}/>
            <TodoList />
            <div onClick={this.cancelEdit} className={layerClass}/>
          </div>
        </div>
    )
  }
}

const mapStateToProps = ({ isEditing }) => ({ isEditing });

export default connect(mapStateToProps)(App);
