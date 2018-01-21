import React, {Component} from 'react';
import ReactModal from 'react-modal';
import TitleTask from "../TitleTask/TitleTask";
import Description from "../Description/Description";
import Comment from "../Comment/Comment";

class ModalTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modalIndexItem: null
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
        returnObj["task"].splice(this.state.modalIndexItem, 1);
        localStorage.removeItem("key");
        let newSerialObj = JSON.stringify(returnObj);
        localStorage.setItem("key", newSerialObj);
        this.setState({showModal: false});
    }

    render() {
        let arr = JSON.parse(localStorage.getItem("key"));
        return (
            <ul>
                {arr.task.map((item, index) => <li key={index}><a
                    onClick={() => this.handleOpenModal(index)}>{item["title"]}</a></li>)}
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                >
                    <button onClick={this.handleCloseModal}>Close Modal</button>
                    <button onClick={() => this.deleteTask()}>DELETE TASK</button>
                    <TitleTask modalIndexItem={this.state.modalIndexItem}/>
                    <Description modalIndexItem={this.state.modalIndexItem}/>
                    <Comment modalIndexItem={this.state.modalIndexItem}/>
                </ReactModal>
            </ul>
        );
    }
}

export default ModalTask;
