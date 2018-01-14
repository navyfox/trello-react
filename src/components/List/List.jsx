import React, { Component } from 'react';
import './List.css';
import TaskList from '../TaskList/TaskList';

class List extends Component {
    render() {
        return (
            <div className="list">
                <header>{this.props.title}</header>
                <ul>
                    <TaskList>Lorem ipsum dolor sit amet</TaskList>
                    <TaskList>Lorem ipsum dolor sit amet</TaskList>
                    <TaskList>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet</TaskList>
                    <TaskList>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet metus laoreet, ut condimentum</TaskList>
                </ul>
                <footer>Add a card...</footer>
            </div>
        )
    }
}

export default List;