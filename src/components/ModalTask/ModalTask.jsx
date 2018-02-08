import React, {Component} from 'react';
import ReactModal from 'react-modal';
import TitleTask from "../TitleTask/TitleTask";
import Description from "../Description/Description";
import Comment from "../Comment/Comment";
import {connect} from "react-redux";

class ModalTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modalIndexItem: null,
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal(index) {
        this.setState({showModal: true, modalIndexItem: index});
    }

    handleCloseModal() {
        this.setState({showModal: false, modalIndexItem: null});
    }

    deleteTask() {
        let returnObj = JSON.parse(localStorage.getItem("key"));
        returnObj[this.props.listName].splice(this.state.modalIndexItem, 1);
        localStorage.removeItem("key");
        let newSerialObj = JSON.stringify(returnObj);
        localStorage.setItem("key", newSerialObj);
        this.setState({showModal: false});
    }

    render() {
        // this.state.lsetState(st);
        const arr = this.props.lists[this.props.index].tasks;
        return (
            <ul>
                {arr.map((item, index) => <li key={index}><a
                    onClick={() => this.handleOpenModal(index)}>{item.name}</a></li>)}
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel=""
                    onRequestClose={this.handleCloseModal}
                    className="open-modal"
                    ariaHideApp={false}
                >
                    <div className="header-modal">
                        <div className="header-modal__left">
                            <TitleTask listIndex={this.props.index} modalIndexItem={this.state.modalIndexItem}/>
                            {/*<Description listIndex={this.props.index} modalIndexItem={this.state.modalIndexItem}/>*/}
                        </div>
                        <div className="header-modal__right">
                            <button className="del-task" onClick={() => this.deleteTask()}><span>DELETE</span></button>
                        </div>
                    </div>
                    {/*<Comment listIndex={this.props.index} modalIndexItem={this.state.modalIndexItem}/>*/}
                </ReactModal>
            </ul>
        );
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
)(ModalTask);
