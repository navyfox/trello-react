import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import './Sticker.css';

import ModalTask from "../ModalTask/ModalTask";
import { addTask, editSticker } from '../../reducers/board';
import TitleSticker from './TitleSticker';

class Sticker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddTask: false,
            value: ''
        };
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    };

    handleSubmit = () => {
        this.props.addTask(this.state.value, this.props.index);
        this.setState({isAddTask: false});
    };

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
            <footer><a onClick={() => this.setState({isAddTask: true})}
                       className="add-card">Add a card...</a></footer>;
        return (
            <div className="list">
                <header>
                    <TitleSticker title={this.props.title} editSticker={this.props.editSticker} index={this.props.index}/>
                    <a className="close" onClick={this.props.handleDelete}>&times;</a>
                </header>
                <ModalTask index={this.props.index}/>
                {newTaskContent}
                {footerAddTask}
            </div>
        )
    }
}

Sticker.propTypes = {
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => (bindActionCreators({
    addTask,
    editSticker
}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(Sticker);