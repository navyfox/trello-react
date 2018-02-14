import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ItemComments from './ItemComments';
import { getStiker } from '../../selectors/selectors';
import { addTaskComment, delTaskComment } from '../../reducers/stickers';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit() {
        this.props.addTaskComment(this.props.index, this.props.idTask, this.state.value);
        this.setState({value: ''});
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
                                                                        func={() => this.props.delTaskComment(this.props.index, this.props.idTask, index)}/>)}
            </div>
        )
    }
}

Comment.propTypes = {
    stickerIndex: PropTypes.number.isRequired,
    modalIndexItem: PropTypes.number.isRequired
};


const mapStateToProps = (state, ownProps) => ({
    comments: getStiker(state.stickers, ownProps.stickerIndex).toJS().tasks.find( taskItem => {
        return taskItem.id === ownProps.modalIndexItem;
    }).comments
});

const mapDispatchToProps = (dispatch) => (bindActionCreators({
    addTaskComment,
    delTaskComment
}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(Comment);
