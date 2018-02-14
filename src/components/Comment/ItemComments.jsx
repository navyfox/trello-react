import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemComments extends Component {
    render() {
        return (
            <div className="comment">
                <div className="comment_item">{this.props.item}</div>
                <a className="comment_link" onClick={this.props.func}>Delete</a>
            </div>
        );
    }
}

ItemComments.propTypes = {
    item: PropTypes.string.isRequired,
    func: PropTypes.func.isRequired
};

export default ItemComments;