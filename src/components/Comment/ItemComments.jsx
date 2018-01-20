import React, { Component } from 'react';

class ItemComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noDelete: true,
        };
        this.deleteComment = this.deleteComment.bind(this);
    }
    deleteComment () {
        var returnObj = JSON.parse(localStorage.getItem("key"));
        returnObj.task[this.props.modalIndexItem].comments.splice(returnObj.task[this.props.modalIndexItem].comments.indexOf(this.props.item), 1);
        var newSerialObj = JSON.stringify(returnObj);
        console.log(newSerialObj);
        localStorage.setItem("key", newSerialObj);
        this.setState({noDelete: false});
    }

    render () {
        if (this.state.noDelete) {
            return (
                <div className="list comment">
                    <ul>
                        <li>{this.props.item}</li>
                    </ul>
                    <footer>
                        <a onClick={this.deleteComment}>DELETE</a>
                    </footer>
                </div>
            );
        } else {
            //{this.props.item}
            return (<div></div>);
        }
    }
}

export default ItemComments;