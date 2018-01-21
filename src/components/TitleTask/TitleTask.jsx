import React, {Component} from 'react';
import './TitleTask.css';

class TitleTask extends Component {
    constructor(props) {
        super(props);
        let returnObj = JSON.parse(localStorage.getItem("key")).task[this.props.modalIndexItem];
        this.state = {
            titleEdit: false,
            storage: returnObj,
            value: returnObj.title,
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
            this.setState({titleEdit: false});
            this.state.storage.title = this.state.value;
            let returnObj = JSON.parse(localStorage.getItem("key"));
            returnObj.task[this.props.modalIndexItem].title = this.state.value;
            let newSerialObj = JSON.stringify(returnObj);
            localStorage.setItem("key", newSerialObj);
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

export default TitleTask;