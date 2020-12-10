import React, { Component } from 'react';
import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
    buttons = [
        {
            name: 'all',
            label: 'All',
        },
        {
            name: 'active',
            label: 'Active',
        },
        {
            name: 'done',
            label: 'Done',
        },
    ];
    render() {
        const { filter, onFilterChange } = this.props;
        const buttons = this.buttons.map((item) => {
            const isActive = filter === item.name;
            const classListItem = isActive? 'btn-outline-info active' : 'btn-outline-info';
            return (
                <button type='button'
                    className={`btn ${classListItem}`}
                    key={ item.name }
                    onClick= {() => {
                        onFilterChange(item.name)}}
                    > {item.label} </button>
            )
        });
        return (
            <div className='btn-group'>
                {buttons}
            </div>
        )
    }
};