import React, { Component } from 'react';
import ReactModal from 'react-modal';
import TitleTask from "../TitleTask/TitleTask";
import Description from "../Description/Description";

class ModalTask extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showModal: false,
            modalIndexItem: null
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    handleOpenModal (index) {
        this.setState({
            showModal: true,
            modalIndexItem: index,
        });
    }

    handleCloseModal () {
        this.setState({ showModal: false, modalIndexItem: null });
    }

    render () {
        var returnObj = JSON.parse(localStorage.getItem("key"));
        return (
            <ul>
                {returnObj.task.map((item, index) => <li key={index}><a onClick={() => this.handleOpenModal(index)}>{item["title"]}</a></li>)}
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                >
                    <button onClick={this.handleCloseModal}>Close Modal</button>
                    <TitleTask modalIndexItem={this.state.modalIndexItem}/>
                    <Description modalIndexItem={this.state.modalIndexItem}/>
                </ReactModal>
            </ul>
        );
    }
}
export default ModalTask;
