import React, {Component} from 'react';
import './Sticker.css';
import ModalTask from "../ModalTask/ModalTask";
import {connect} from "react-redux";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddTask: false,
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit() {
        this.props.onAddTask(this.state.value);
        this.setState({isAddTask: false});
    }

    render() {
        let newTaskContent = this.state.isAddTask ? (
            <ul>
                <li className="text-area"><textarea
                    name="list"
                    onChange={this.handleChange}
                />
                </li>
            </ul>
        ) : null;
        let footerAddTask = this.state.isAddTask ?
            (<footer>
                <input className="left-input" value="Add" type="submit" onClick={this.handleSubmit}/>
                <input className="right-input" value="Delete" type="submit"
                       onClick={() => this.setState({isAddTask: false})}/>
            </footer>)
            :
            <footer><a onClick={() => this.setState({isAddTask: true})} className="add-card">Add a card...</a></footer>;
        return (
            <div className="list">
                <header>
                    {this.props.title}
                    <a className="close" onClick={this.props.handleDelete}>&times;</a>
                </header>
                <ModalTask index={this.props.index}/>
                {newTaskContent}
                {footerAddTask}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({stickers: state.stickers});
const mapDispatchToProps = (dispatch, ownProps) => ({
    onAddTask: (name) => {
        dispatch({
            type: 'ADD_TASK',
            id: ownProps.index,
            name: name,
            index: Date.now()
        });
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(List);