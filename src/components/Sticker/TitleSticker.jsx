import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TitleSticker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleEdit: false,
            value: this.props.title
        };
    }

    handleChange = (event) => {
        if (event.target.value !== "" && event.target.value.length <= 33) {
            this.setState({value: event.target.value});
        }
    };

    handleSubmit = (event) => {
        if (event.key === 'Enter') {
            this.props.editSticker(this.props.index, this.state.value);
            this.setState({titleEdit: false});

        }
    };

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
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    editSticker: PropTypes.func.isRequired
};

export default TitleSticker;