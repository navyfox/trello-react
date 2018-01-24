import React, {Component} from 'react';
import './Board.css';
import List from "../List/List";


class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addList: false,
            flag: true,
            value: '',
        };
        let returnObj = JSON.parse(localStorage.getItem("key"));
        if (returnObj === null) {
            returnObj = {};
            let newSerialObj = JSON.stringify(returnObj);
            localStorage.setItem("key", newSerialObj);
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        if (event.key === 'Enter') {
            let returnObj = JSON.parse(localStorage.getItem("key"));
            returnObj[event.target.value] = [];
            let newSerialObj = JSON.stringify(returnObj);
            localStorage.setItem("key", newSerialObj);
            this.setState({value: ""});
            this.setState({addList: false});
        }
    }
    deleteList (item) {
        let returnObj = JSON.parse(localStorage.getItem("key"));
        delete returnObj[item];
        let newSerialObj = JSON.stringify(returnObj);
        localStorage.setItem("key", newSerialObj);
        this.setState({flag: !this.state.flag});
    }
    rendDefault () {
        let returnObj = JSON.parse(localStorage.getItem("key"));
        let arrayList = [];
        for (let key in returnObj) {
            arrayList.unshift(key)
        }
        return (
            <div className="lists">
                {arrayList.map((item, index) => <List key={index} listName={item} close={() => this.deleteList(item)}/>)}
                <div className="list">
                    <div className="add-list"><a onClick={() => this.setState({addList: true})}>Add new list</a></div>
                </div>
            </div>
        )
    }
    rendAdd () {
        let returnObj = JSON.parse(localStorage.getItem("key"));
        let arrayList = [];
        for (let key in returnObj) {
            arrayList.unshift(key)
        }
        return (
            <div className="lists">
                {arrayList.map((item, index) => <List key={index} listName={item}/>)}
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

export default Board;