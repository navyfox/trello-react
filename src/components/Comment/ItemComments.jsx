import React, {Component} from 'react';

class ItemComments extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="comment">
                <h4>{this.props.item}</h4>
                <a className="comment_link" onClick={this.props.func}>DELETE</a>
            </div>
        );
    }
}

export default ItemComments;