import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { editTaskDescription } from "../../reducers/board";
import { getTask } from "../../selectors/selectors";

class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            value: this.props.description,
            defaultValue: "Add description...",
        };
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    };

    handleSubmit = (event) => {
        if (event.key === 'Enter') {
            this.props.editTaskDescription(this.props.stickerIndex, this.props.modalIndexItem, this.state.value);
            this.setState({isEdit: false});
        }
    };

    render() {
        let text = (this.state.value === '') ? this.state.defaultValue : this.state.value;
        return this.state.isEdit ?
            (<div className="description-block">
                <textarea
                    name="description"
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyPress={this.handleSubmit}
                />
            </div>) :
            (<div className="description-block">
                <div className="title description" onClick={() => this.setState({isEdit: true})}>{text}</div>
            </div>)
    }
}

Description.propTypes = {
    stickerIndex: PropTypes.number.isRequired,
    modalIndexItem: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    description: getTask(state, ownProps.stickerIndex, ownProps.modalIndexItem).get('description')
});
const mapDispatchToProps = (dispatch) => (bindActionCreators({
    editTaskDescription
}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(Description);