import React, {Component} from 'react';
import './Board.css';
import List from "../List/List";
import {connect} from 'react-redux';


class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addList: false,
            flag: true,
            value: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        if (event.key === 'Enter') {
            this.props.onAddList(event.target.value);
            this.setState({value: ""});
            this.setState({addList: false});
        }
    }
    deleteList (index) {
        this.props.onDelList(index);
        this.setState({flag: !this.state.flag});
    }
    rendDefault () {
        return (
            <div className="lists">
                {this.props.lists.map((item, index) => <List key={index} listName={item.name} close={() => this.deleteList(index)}/>)}
                <div className="list">
                    <div className="add-list"><a onClick={() => this.setState({addList: true})}>Add new list</a></div>
                </div>
            </div>
        )
    }
    rendAdd () {
        return (
            <div className="lists">
                {this.props.lists.map((item, index) => <List key={index} listName={item.name} index={index} close={() => this.deleteList(index)}/>)}
                <div className="list">
                    <div className="add-list">
                        <textarea
                            value={this.state.value}
                            onChange={this.handleChange}
                            onKeyPress={this.handleSubmit}
                        />
                    </div>
                </div>
            </div>
        )
    }
    render() {
        if (this.state.addList) {
            return (this.rendAdd())
        } else {
            return (this.rendDefault())
        }
    }
}

export default connect(
    state => ({
        lists: state.lists
    }),
    dispatch => ({
        onAddList: (name) => {
            const payload = {
                id: Date.now().toString(),
                name,
                tasks: []
            };
            dispatch({ type: 'ADD_LIST', payload });
        },
        onDelList: (index) => {
            dispatch({ type: 'DELETE_LIST', payload: index })
        }
    })
)(Board);