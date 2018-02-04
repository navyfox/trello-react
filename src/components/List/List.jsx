import React, {Component} from 'react';
import './List.css';
import ModalTask from "../ModalTask/ModalTask";
import {connect} from "react-redux";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addCard: false,
            value: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit() {
        let returnObj = JSON.parse(localStorage.getItem("key"));
        returnObj[this.props.listName].push({"title": this.state.value});
        let newSerialObj = JSON.stringify(returnObj);
        localStorage.setItem("key", newSerialObj);
        this.setState({addCard: false});
    }

    rendDefault() {
        return (
            <div className="list">
                <header>
                    {this.props.listName}
                    <a className="close" onClick={this.props.close}>&times;</a>
                </header>
                {/*<ModalTask listName={this.props.listName}/>*/}
                <footer><a onClick={() => this.setState({addCard: true})} className="add-card">Add a card...</a>
                </footer>
            </div>
        )
    }

    rendAdd() {
        return (
            <div className="list">
                <header>
                    {this.props.listName}
                    <a className="close" onClick={this.props.close}>&times;</a>
                </header>
                {/*<ModalTask listName={this.props.listName}/>*/}
                <ul>
                    <li className="text-area"><textarea
                        name="list"
                        onChange={this.handleChange}
                    />
                    </li>
                </ul>
                <footer>
                    <input className="left-input" value="Add" type="submit" onClick={this.handleSubmit}/>
                    <input className="right-input" value="Delete" type="submit"
                           onClick={() => this.setState({addCard: false})}/>
                </footer>
            </div>
        )
    }

    render() {
        if (this.state.addCard) {
            return (this.rendAdd())
        } else {
            return (this.rendDefault())
        }
    }
}

export default connect(
    // state => ({
    //     task: state.lists[this.props.index].task
    // }),
    // dispatch => ({
    //     onAddList: (name) => {
    //         const payload = {
    //             id: Date.now().toString(),
    //             name,
    //             tasks: []
    //         };
    //         dispatch({ type: 'ADD_LIST', payload });
    //     },
    //     onDelList: (index) => {
    //         dispatch({ type: 'DELETE_LIST', payload: index })
    //     }
    // })
)(List);