import React, { Component } from 'react';
import './List.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addCard: false,
            value: '',
            obj: {
                item1: "Lorem ipsum dolor sit amet",
                item2: "Lorem ipsum dolor sit amet",
                item3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet"
            },
            loc: ["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet"],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // var obj = {
        //     item1: "Lorem ipsum dolor sit amet",
        //     item2: "Lorem ipsum dolor sit amet",
        //     item3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet"
        // };
        // var serialObj = JSON.stringify(obj);
        // localStorage.setItem("myKey", serialObj);
        // var returnObj = JSON.parse(localStorage.getItem("myKey"));
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        this.state.loc.push(this.state.value);
        this.setState({addCard: false});
        // alert('Textarea value is: ' + this.state.value);
    }
    rendDefault() {
        return (
            <div className="list">
                <header>{this.props.title}</header>
                <ul>
                    {this.state.loc.map((item, index) => <li key={index}>{item}</li>)}
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
                    {this.state.loc.map((item, index) => <li key={index}>{item}</li>)}
                    <li><textarea
                        name="description"
                        // value={this.state.value}
                        onChange={this.handleChange}
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
    render() {
        if (this.state.addCard) {
            return (this.rendAdd())
        } else {
            return (this.rendDefault())
        }
    }
}

export default List;