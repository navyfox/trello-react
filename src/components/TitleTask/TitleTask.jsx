import React, {Component} from 'react';
import './TitleTask.css';
import {connect} from "react-redux";

class TitleTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleEdit: false,
            value: this.props.lists[this.props.listIndex].tasks[this.props.modalIndexItem].name,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (event.target.value === "") {
        } else {
            this.setState({value: event.target.value});
        }
    }

    handleSubmit(event) {
        if (event.key === 'Enter') {
            this.props.onEditTask(this.state.value, this.props.listIndex, this.props.modalIndexItem);
            this.setState({titleEdit: false});
        }
    }

    renderDefault() {
        return (
            <div>
                <div className="title" onClick={() => this.setState({titleEdit: true})}>{this.state.value}</div>
            </div>
        );
    }

    renderEdit() {
        return (
            <div>
                <textarea
                    name="description"
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyPress={this.handleSubmit}
                />
            </div>
        );
    }

    render() {
        if (this.state.titleEdit) {
            return (this.renderEdit())
        } else {
            return (this.renderDefault())
        }
    }
}

export default connect(
    state => ({
        lists: state.lists
    }),
    dispatch => ({
        onEditTask: (name, id, idTask) => {
            const payload = {
                id: id,
                idTask: idTask,
                name
            };
            dispatch({ type: 'EDIT_TASK_NAME', payload});
        }
    })
)(TitleTask);