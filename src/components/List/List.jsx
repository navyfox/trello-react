import React, { Component } from 'react';
import './List.css';
import ModalTask from "../ModalTask/ModalTask";

class List extends Component {
    constructor (props) {
        super(props);
        this.state = {
            addCard: false,
            value: '',
            loc: {item1: []}
        };
        if (localStorage.getItem("myKey") === null) {
            var serialObj = JSON.stringify(this.state.loc);
            localStorage.setItem("myKey", serialObj);
        } else {
            var returnObj = JSON.parse(localStorage.getItem("myKey"));
            this.state.loc = returnObj;
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange (event) {
        this.setState({value: event.target.value});
    }
    handleSubmit () {
        this.state.loc.item1.push(this.state.value);
        var serialObj = JSON.stringify(this.state.loc);
        localStorage.setItem("myKey", serialObj);
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
                    <li><textarea
                        name="description"
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
    render () {
        if (this.state.addCard) {
            return (this.rendAdd())
        } else {
            return (this.rendDefault())
        }
    }
}

export default List;


//
// class Form extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             value: '',
//             loc: {item1: ["1", "2","3"]}
//         };
//         var serialObj = JSON.stringify(this.state.loc);
//         localStorage.setItem("myKey", serialObj);
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//
//     handleChange(event) {
//         this.setState({value: event.target.value});
//     }
//
//     handleSubmit(event) {
//         this.state.loc.item1.push(this.state.value);
//         var serialObj = JSON.stringify(this.state.loc);
//         localStorage.setItem("myKey", serialObj);
//         alert('Textarea value is: ' + this.state.value);
//         alert(this.state.loc.item1);
//         ReactDOM.render(
//             <Form />,
//             document.getElementById('root')
//         );
//     }
//
//     render() {
//         var returnObj = JSON.parse(localStorage.getItem("myKey"));
//         return (
//             <div>
//                 <ul>
//                     {returnObj.item1.map((item, index) => <li key={index}>{item}</li>)}
//                 </ul>
//                 <textarea
//                     name="description"
//                     value={this.state.value}
//                     onChange={this.handleChange}
//                 />
//                 <br />
//                 <button onClick={this.handleSubmit}>
//                     Submit
//                 </button>
//             </div>
//         );
//     }
// }
//
// ReactDOM.render(
//     <Form />,
//     document.getElementById('root')
// );