import React, { Component } from 'react';
import './TitleTask.css';

class TitleTask extends Component {
    constructor(props) {
        super(props);
        var returnObj = JSON.parse(localStorage.getItem("key")).task[this.props.modalIndexItem];
        this.state = {
            titleEdit: false,
            storage: returnObj,
            title: returnObj.title,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (event.target.value === "") {} else {
            this.setState({title: event.target.value});
        }
    }

    handleSubmit(event) {
        if (event.key === 'Enter') {
            this.setState({ titleEdit: false});
            this.state.storage.title = this.state.title;
            var returnObj = JSON.parse(localStorage.getItem("key"));
            returnObj.task[this.props.modalIndexItem].title = this.state.title;
            var newSerialObj = JSON.stringify(returnObj);
            localStorage.setItem("key", newSerialObj);

        }
    }
    renderDefault () {
        return (
            <div>
                <div className="title" onClick={() => this.setState({ titleEdit: true })}>{this.state.title}</div>
            </div>
        );
    }

    renderEdit () {
        return (
            <div>
                <textarea
                    name="description"
                    value={this.state.title}
                    onChange={this.handleChange}
                    onKeyPress={this.handleSubmit}
                />
            </div>
        );
    }
    render () {
        if (this.state.titleEdit) {
            return (this.renderEdit())
        } else {
            return (this.renderDefault())
        }
    }
}

export default TitleTask;