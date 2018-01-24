import React, {Component} from 'react';
import ItemComments from "./ItemComments";

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            delete: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit() {
        let returnObj = JSON.parse(localStorage.getItem("key"));
        if (returnObj[this.props.listName][this.props.modalIndexItem].comments === undefined) {
            returnObj[this.props.listName][this.props.modalIndexItem].comments = [];
            returnObj[this.props.listName][this.props.modalIndexItem].comments.push(this.state.value);
        } else {
            returnObj[this.props.listName][this.props.modalIndexItem].comments.unshift(this.state.value);
        }
        let newSerialObj = JSON.stringify(returnObj);
        localStorage.setItem("key", newSerialObj);
        this.setState({value: ""});
    }

    deleteComment(index) {
        let returnObj = JSON.parse(localStorage.getItem("key"));
        returnObj[this.props.listName][this.props.modalIndexItem].comments.splice(index, 1);
        let newSerialObj = JSON.stringify(returnObj);
        console.log(newSerialObj);
        localStorage.setItem("key", newSerialObj);
        this.setState({delete: !this.state.delete});
    }

    render() {
        let arr = JSON.parse(localStorage.getItem("key"))[this.props.listName][this.props.modalIndexItem].comments;
        if (arr === undefined) {
            arr = [];
        }
        return (
            <div className="add-comment">
                <h2>Add comment</h2>
                <textarea
                    name="comment"
                    onChange={this.handleChange}
                    value={this.state.value}
                />
                <input value="Add" type="submit" onClick={this.handleSubmit}/>
                {arr.map((item, index) => <ItemComments key={index} item={item}
                                                        func={() => this.deleteComment(index)}/>)}
            </div>
        );
    }
}

export default Comment;
