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
        returnObj[this.props.listName].splice(this.state.modalIndexItem, 1);
        localStorage.removeItem("key");
        let newSerialObj = JSON.stringify(returnObj);
        localStorage.setItem("key", newSerialObj);
        this.setState({showModal: false});
    }

    render() {
        let arr = JSON.parse(localStorage.getItem("key"));
        return (
            <ul>
                {arr[this.props.listName].map((item, index) => <li key={index}><a
                    onClick={() => this.handleOpenModal(index)}>{item["title"]}</a></li>)}
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel=""
                    onRequestClose={this.handleCloseModal}
                    className="open-modal"
                    ariaHideApp={false}
                >
                    <div className="header-modal">
                        <div className="header-modal__left">
                            <TitleTask listName={this.props.listName} modalIndexItem={this.state.modalIndexItem}/>
                            <Description listName={this.props.listName} modalIndexItem={this.state.modalIndexItem}/>
                        </div>
                        <div className="header-modal__right">
                            <button className="del-task" onClick={() => this.deleteTask()}><span>DELETE</span></button>
                        </div>
                    </div>
                    <Comment listName={this.props.listName} modalIndexItem={this.state.modalIndexItem}/>
                </ReactModal>
            </ul>
        );
    }
}

export default ModalTask;
