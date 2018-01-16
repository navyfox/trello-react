import React, { Component } from 'react';
import ReactModal from 'react-modal';

class ModalTask extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }

    render () {
        var returnObj = JSON.parse(localStorage.getItem("myKey"));
        return (
            <ul>
                {returnObj.item1.map((item, index) => <li key={index}><a onClick={this.handleOpenModal}>{item}</a></li>)}
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                >
                    <button onClick={this.handleCloseModal}>Close Modal</button>
                </ReactModal>
            </ul>
        );
    }
}
export default ModalTask;