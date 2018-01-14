import React, { Component } from 'react';
import './List.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addCard: false,
            obj: {
                item1: "Lorem ipsum dolor sit amet",
                item2: "Lorem ipsum dolor sit amet",
                item3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet"
            }
        };
        // var obj = {
        //     item1: "Lorem ipsum dolor sit amet",
        //     item2: "Lorem ipsum dolor sit amet",
        //     item3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet"
        // };
        // var serialObj = JSON.stringify(obj);
        // localStorage.setItem("myKey", serialObj);
        // var returnObj = JSON.parse(localStorage.getItem("myKey"));
    }
    rendDefault() {
        return (
            <div className="list">
                <header>{this.props.title}</header>
                <ul>
                    <li>{this.state.obj.item1}</li>
                    <li>{this.state.obj.item2}</li>
                    <li>{this.state.obj.item3}</li>
                </ul>
                <footer><a onClick={() => this.setState({addCard: true})} className="add-card">Add a card...</a></footer>
            </div>
        )
    }
    rendAdd() {
        return (
            <div className="list">
                <header>{this.props.title}</header>
                <ul>
                    <li>{this.state.obj.item1}</li>
                    <li>{this.state.obj.item2}</li>
                    <li>{this.state.obj.item3}</li>
                    <li><textarea defaultValue="My Card"></textarea></li>
                </ul>
                <footer>
                    <input value="Add" type="submit"/>
                    <input value="Delete" type="submit" onClick={() => this.setState({addCard: false})}/>
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

export default List;