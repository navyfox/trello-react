import React, {Component} from 'react';

class Description extends Component {
    constructor(props) {
        super(props);
        let returnObj = JSON.parse(localStorage.getItem("key"))[this.props.listName][this.props.modalIndexItem];
        this.state = {
            edit: false,
            storage: returnObj,
            value: returnObj.description,
            defaultValue: "Add description...",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        if (event.key === 'Enter') {
            let timeVar = this.state.storage;
            timeVar.description = this.state.value;
            this.setState({edit: false, storage: timeVar});
            let returnObj = JSON.parse(localStorage.getItem("key"));
            returnObj[this.props.listName][this.props.modalIndexItem].description = this.state.value;
            let newSerialObj = JSON.stringify(returnObj);
            localStorage.setItem("key", newSerialObj);
        }
    }

    renderDefault() {
        let text;
        if ((this.state.value === undefined) || (this.state.value === "")) {
            text = this.state.defaultValue;
        } else {
            text= this.state.value;
        }
        return (
            <div className="description-block">
                <div className="title description" onClick={() => this.setState({edit: true})}>{text}</div>
            </div>
        );
    }

    renderEdit() {
        return (
            <div className="description-block">
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