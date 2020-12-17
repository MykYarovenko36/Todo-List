import React, { Component } from 'react';
import AppHeader from '../app-header';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';
import ItemAddForm from '../item-add-form';
import './app.css';
import ItemStatusFilter from '../item-status-filter';

export default class App extends Component {
  maxId = 100;
  state = {
    todoData: [
      this.createTodoItem('Drink Cofee'),
      this.createTodoItem('Make Awersome App'),
      this.createTodoItem('Have a lunch'),
      this.createTodoItem('Have a dinner')
    ],
    term: '',
    filter: '', // active, all, done
  }
  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }
  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];
      return {
        todoData: newArray,
      }
    })
  }
  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];
      return {
        todoData: newArray,
      }
    })
  }
  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important'),
      };
    });
  }
  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      };
    });
  }
  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
      return [
        ...arr.slice(0, idx), 
        newItem,
        ...arr.slice(idx + 1)
      ];
  }
  search = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > - 1
    });
  }
  onSearchChange = (term) => {
    this.setState({ term });
  }
  filter = (items, filter) => {
    switch(filter) {
        case 'all':
            return items;
        case 'active':
            return items.filter((item) => !item.done);
        case 'done':
            return items.filter((item) => item.done);
        default:
            return items;
    }
  }
  onFilterChange = (filter) => {
    this.setState({ filter });
  }
  render() {
    const {todoData, term, filter} = this.state
    const doneCount = todoData
                        .filter((el) => el.done).length;
    const todoCount = todoData
                        .filter((el) => el.important).length;
    const visibleItems = this.filter(this.search(todoData, term), filter);
    return (
      <div className='todo-app'>
        <AppHeader todo={ todoCount } done={ doneCount } />
        <div className='top-panel d-flex'>
          <SearchPanel onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter 
            filter={ filter }
            onFilterChange = {this.onFilterChange} />
        </div>
        <TodoList 
          todos={visibleItems}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          onDeleted={(id) => {
            this.deleteItem(id)
          }} />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    )
  }
};
