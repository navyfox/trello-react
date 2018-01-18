import React, { Component } from 'react';

class TitleTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleEdit: false,
            value: 'eee'};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        if (event.key === 'Enter') {
            this.setState({ titleEdit: false })
        }
    }
    renderDefault () {
        return (
            <div>
                <div className="title" onClick={() => this.setState({ titleEdit: true })}>{this.state.value}</div>

                <br />
                <button onClick={this.handleSubmit}>
                    Submit
                </button>
            </div>
        );
    }

    renderEdit () {
        return (
            <div>
        <textarea
            name="description"
            value={this.state.value}
            onChange={this.handleChange}
            onKeyPress={this.handleSubmit}
        />
                <br />
                <button onClick={this.handleSubmit}>
                    Submit
                </button>
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