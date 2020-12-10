import React from 'react';
import './todo-list-item.css';

const TodoListItem = (props) => {
    const { label, onDeleted,
        onToggleImportant,
        onToggleDone,
        done, important } = props;
    let classNames = 'list-item-label';
    if (done) {
        classNames += ' done';
    }
    if (important) {
        classNames += ' important'
    }
    return (
        <div className='todo-list-item'>
            <span
                className={classNames}
                onClick={onToggleDone}
            > {label} </span>
            <div className='list-item-btn-group'>
                <button type="button" className="btn btn-danger list-item-btn"
                    onClick={onDeleted}>
                    <i className='fa fa-trash-o' />
                </button>
                <button
                    type="button"
                    className="btn btn-success list-item-btn"
                    onClick={onToggleImportant}>
                    <i className='fa fa-exclamation' />
                </button>
            </div>
        </div>
    )
};
export default TodoListItem;