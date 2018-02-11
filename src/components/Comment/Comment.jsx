import React, {Component} from 'react';
import ItemComments from "./ItemComments";
import {getStiker} from "../../selectors/selectors";
import {connect} from "react-redux";

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit() {
        this.props.onAddComment(this.state.value);
        this.setState({value: ''});
    }

    deleteComment(index) {
        this.props.onDeleteComment(this.props.stickerIndex, this.props.modalIndexItem, index);
    }

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
                {this.props.comments.map((item, index) => <ItemComments key={index} item={item}
                                                        func={() => this.deleteComment(index)}/>)}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({comments: getStiker(state.stickers, ownProps.stickerIndex).toJS().tasks.find(obj => obj.id === ownProps.modalIndexItem).comments});
const mapDispatchToProps = (dispatch, ownProps) => ({
    onAddComment: (comment) => {
        dispatch({type: 'ADD_TASK_COMMENT', id: ownProps.stickerIndex, idTask: ownProps.modalIndexItem, comment: comment})
    },
    onDeleteComment: (stickerIndex, idTask, idComment) => {
        dispatch({type: 'DELETE_TASK_COMMENT', id: stickerIndex, idTask: idTask, idComment: idComment})
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Comment);
