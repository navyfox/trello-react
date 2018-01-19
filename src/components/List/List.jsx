import React, { Component } from 'react';
import './List.css';
import ModalTask from "../ModalTask/ModalTask";

class List extends Component {
    constructor (props) {
        super(props);
        this.state = {
            addCard: false,
            value: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange (event) {
        this.setState({value: event.target.value});
    }
    handleSubmit () {
        var returnObj = JSON.parse(localStorage.getItem("key"));
        returnObj.task.push({"title": this.state.value});
        var newSerialObj = JSON.stringify(returnObj);
        localStorage.setItem("key", newSerialObj);
        this.setState({addCard: false});
    }
    rendDefault () {
        return (
            <div className="list">
                <header>{this.props.title}</header>
                <ModalTask/>
                <footer><a onClick={() => this.setState({addCard: true})} className="add-card">Add a card...</a></footer>
            </div>
        )
    }
    rendAdd () {
        return (
            <div className="list">
                <header>{this.props.title}</header>
                <ModalTask/>
                <ul>
                    <li className="text-area"><textarea
                        name="description"
                        onChange={this.handleChange}
                        // onKeyPress={this.handleSubmitEnter}
                    />
                    </li>
                </ul>
                <footer>
                    <input value="Add" type="submit" onClick={this.handleSubmit}/>
                    <input value="Delete" type="submit" onClick={() => this.setState({addCard: false})}/>
                </footer>
            </div>
        )
    }
    render () {
        if (this.state.addCard) {
            return (this.rendAdd())
        } else {
            return (this.rendDefault())
        }
    }
}

export default List;