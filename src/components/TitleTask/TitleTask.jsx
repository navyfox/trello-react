import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import PropTypes from "prop-types";

import './TitleTask.css';

import { getStiker } from "../../selectors/selectors";
import { editTaskName } from "../../reducers/stickers";

class TitleTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleEdit: false,
            value: this.props.title,
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
            this.props.editTaskName(this.props.stickerIndex, this.props.modalIndexItem, this.state.value);
            this.setState({titleEdit: false});
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
                <div className="title" onClick={() => this.setState({titleEdit: true})}>{this.state.value}</div>
            </div>
        )
    }
}

TitleTask.propTypes = {
    stickerIndex: PropTypes.number.isRequired,
    modalIndexItem: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    title: getStiker(state.stickers, ownProps.stickerIndex).toJS().tasks.find(obj => obj.id === ownProps.modalIndexItem).name
});
const mapDispatchToProps = (dispatch) => (bindActionCreators({
    editTaskName
}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(TitleTask);
