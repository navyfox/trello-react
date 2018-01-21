import React, {Component} from 'react';

class Description extends Component {
    constructor(props) {
        super(props);
        let returnObj = JSON.parse(localStorage.getItem("key")).task[this.props.modalIndexItem];
        this.state = {
            edit: false,
            storage: returnObj,
            value: returnObj.description,
        };
        if (this.state.value === undefined) {
            this.state.value = "DESCRIPTION";
        }
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
            this.setState({edit: false});
            this.state.storage.description = this.state.value;
            let returnObj = JSON.parse(localStorage.getItem("key"));
            returnObj.task[this.props.modalIndexItem].description = this.state.value;
            let newSerialObj = JSON.stringify(returnObj);
            localStorage.setItem("key", newSerialObj);
        }
    }

    renderDefault() {
        return (
            <div>
                <div className="title" onClick={() => this.setState({edit: true})}>{this.state.value}</div>
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
        if (this.state.edit) {
            return (this.renderEdit())
        } else {
            return (this.renderDefault())
        }
    }
}

export default Description;