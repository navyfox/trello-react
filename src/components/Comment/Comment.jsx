import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ItemComments from './ItemComments';
import { getTask } from '../../selectors/selectors';
import { addTaskComment } from '../../reducers/board';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    };

    handleSubmit = () => {
        this.props.addTaskComment(this.props.stickerIndex, this.props.modalIndexItem, this.state.value);
        this.setState({value: ''});
    };

    itemCommentsArray = () => this.props.comments.map((item, index) => (
        <ItemComments key={index}
                      item={item}
                      stickerIndex={this.props.stickerIndex}
                      modalIndexItem={this.props.modalIndexItem}
                      index={index}
        />
    )).reverse();

    render() {
        return (
            <div className="add-comment">
                <h2>Add comment</h2>
                <textarea
                    name="comment"
                    onChange={this.handleChange}
                    value={this.state.value}
                />
                <input value="Add" type="submit" onClick={this.handleSubmit}/>
                {this.itemCommentsArray()}
            </div>
        )
    }
}

Comment.propTypes = {
    stickerIndex: PropTypes.number.isRequired,
    modalIndexItem: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    comments : getTask(state, ownProps.stickerIndex, ownProps.modalIndexItem).get('comments')
});

const mapDispatchToProps = (dispatch) => (bindActionCreators({
    addTaskComment
}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(Comment);
