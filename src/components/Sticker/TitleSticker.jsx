import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TitleSticker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleEdit: false,
            value: this.props.title
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
            // this.props.editTaskName(this.props.stickerIndex, this.props.modalIndexItem, this.state.value);
            // this.setState({titleEdit: false});
        }
    }

    render() {
        return this.state.titleEdit ? (
            <div>
                <textarea
                    name="description"
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyPress={this.handleSubmit}
                />
            </div>
        ) : (
            <div>
                <a onClick={() => this.setState({titleEdit: true})}>{this.state.value}</a>
            </div>
        );
    }
}

TitleSticker.propTypes = {
    title: PropTypes.string.isRequired
};

export default TitleSticker;