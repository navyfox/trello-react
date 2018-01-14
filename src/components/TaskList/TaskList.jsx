import React, { Component } from 'react';

class TaskList extends Component {
    render() {
        return (
            <li>{this.props.children}</li>
        )
    }
}

export default TaskList;