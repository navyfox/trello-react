import React, {Component} from 'react';

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

export default ItemComments;