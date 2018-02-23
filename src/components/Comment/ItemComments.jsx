import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import bindActionCreators from "redux/es/bindActionCreators";
import {delTaskComment, editTaskComment} from "../../reducers/board";
import {getTask} from "../../selectors/selectors";

class ItemComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            value: this.props.comment
        };
        console.log('this.props.comment', this.props.index);
    }

    handleEdit = () => {
        this.setState({isEdit: true});
    };

    handleChange = (event) => {
        this.setState({value: event.target.value});
    };

    handleSubmit = (event) => {
        if (event.key === 'Enter') {
            this.props.editTaskComment(this.props.stickerIndex, this.props.modalIndexItem, this.props.index, this.state.value);
            this.setState({isEdit: false});
        }
    };

    handleDelete = () => {
        this.props.delTaskComment(this.props.stickerIndex, this.props.modalIndexItem, this.props.index);
    };

    render() {
        const commentItem = this.state.isEdit ?
            (<div className="description-block">
                <textarea
                    name="commentItem"
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyPress={this.handleSubmit}
                />
            </div>)
            :
            (<div className="comment_item">{this.props.item}</div>);
        return (
            <div className="comment">
                {commentItem}
                <div className="comment_links">
                    <a className="comment_link" onClick={this.handleDelete}>Delete</a>
                    <a className="comment_link" onClick={this.handleEdit}>Edit</a>
                    <div>{this.props.userName}</div>
                </div>
            </div>
        );
    }
}

ItemComments.propTypes = {
    item: PropTypes.string.isRequired,
    stickerIndex: PropTypes.number.isRequired,
    modalIndexItem: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    userName : state.getIn(['board', 'userName']),
    comment : getTask(state, ownProps.stickerIndex, ownProps.modalIndexItem).get('comments').get(ownProps.index)
});
const mapDispatchToProps = (dispatch) => (bindActionCreators({
    editTaskComment,
    delTaskComment
}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(ItemComments);