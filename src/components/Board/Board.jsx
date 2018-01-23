import React, {Component} from 'react';
import './Board.css';
import List from "../List/List";


class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addList: false,
            value: '',
            storage: {
                "": []
            },
        };
        let newSerialObj = JSON.stringify(this.state.storage);
        localStorage.setItem("k", newSerialObj);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        if (event.key === 'Enter') {
            let returnObj = JSON.parse(localStorage.getItem("key"));
            returnObj[this.state.value] = [];
            let newSerialObj = JSON.stringify(returnObj);
            localStorage.setItem("key", newSerialObj);
            alert('Textarea value is: ' + this.state.value);
        }
    }
    rendDefault () {
        return (
            <div className="lists">
                <List name='List header'/>
                <div className="list">
                    <div className="add-list"><a onClick={() => this.setState({addList: true})}>Add new list</a></div>
                </div>
            </div>
        )
    }
    rendAdd () {
        return (
            <div className="lists">
                <List title='List header'/>
                <div className="list">
                    <div className="add-list">
                        <textarea
                            // value={this.state.value}
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

export default Board;