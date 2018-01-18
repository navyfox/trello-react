import React, { Component } from 'react';

class Description extends Component {
    constructor(props) {
        super(props);
        var returnObj = JSON.parse(localStorage.getItem("key")).task[this.props.modalIndexItem];
        // this.state.storage = returnObj;
        console.log(returnObj);
        this.state = {
            titleEdit: false,
            storage: returnObj,
            title: returnObj.title,
        };
        // var returnObj = JSON.parse(localStorage.getItem("key"));
        // this.state.storage = returnObj;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({title: event.target.value});
    }

    handleSubmit(event) {
        if (event.key === 'Enter') {
            this.setState({ titleEdit: false});
            this.state.storage.title = this.state.title;
            var returnObj = JSON.parse(localStorage.getItem("key"));
            returnObj.task[this.props.modalIndexItem].title = this.state.title;
            var newSerialObj = JSON.stringify(returnObj);
            localStorage.setItem("key", newSerialObj);
            console.log(this.state.storage);

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

export default Description;