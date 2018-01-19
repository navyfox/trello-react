import React, { Component } from 'react';

class Description extends Component {
    constructor(props) {
        super(props);
        var returnObj = JSON.parse(localStorage.getItem("key")).task[this.props.modalIndexItem];
        console.log(returnObj);
        this.state = {
            edit: false,
            storage: returnObj,
            description: returnObj.description,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({description: event.target.value});
    }
    handleSubmit(event) {
        if (event.key === 'Enter') {
            this.setState({ edit: false});
            this.state.storage.description = this.state.description;
            var returnObj = JSON.parse(localStorage.getItem("key"));
            returnObj.task[this.props.modalIndexItem].description = this.state.description;
            var newSerialObj = JSON.stringify(returnObj);
            localStorage.setItem("key", newSerialObj);
            console.log(this.state.storage);
        }
    }
    renderDefault () {
        if (this.state.description === undefined) {
            var description = "DESCRIPTION";
        } else {
            var description = this.state.description
        }
        return (
            <div>
                <div className="title" onClick={() => this.setState({ edit: true })}>{description}</div>
            </div>
        );
    }
    renderEdit () {
        return (
            <div>
                <textarea
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    onKeyPress={this.handleSubmit}
                />
            </div>
        );
    }
    render () {
        if (this.state.edit) {
            return (this.renderEdit())
        } else {
            return (this.renderDefault())
        }
    }
}

export default Description;