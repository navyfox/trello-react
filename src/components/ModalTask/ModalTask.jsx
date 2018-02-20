import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TitleTask from "../TitleTask/TitleTask";
import Description from "../Description/Description";
import Comment from "../Comment/Comment";
import { getStiker } from "../../selectors/selectors";
import { delTask } from "../../reducers/stickers";

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

    handelDeleteTask() {
        this.props.delTask(this.props.index, this.state.modalIndexItem);
        this.setState({showModal: false});
    }

    render() {
        return (
            <ul>
                {this.props.tasks.map(item => <li key={item.id}><a
                    onClick={() => this.handleOpenModal(item.id)}>{item.name}</a></li>)}
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel=""
                    onRequestClose={this.handleCloseModal}
                    className="open-modal"
                    ariaHideApp={false}
                >
                    <div className="header-modal">
                        <div className="header-modal__left">
                            <TitleTask stickerIndex={this.props.index} modalIndexItem={this.state.modalIndexItem}/>
                            <Description stickerIndex={this.props.index} modalIndexItem={this.state.modalIndexItem}/>
                        </div>
                        <div className="header-modal__right">
                            <button className="del-task" onClick={() => this.handelDeleteTask()}><span>DELETE</span>
                            </button>
                        </div>
                    </div>
                    <Comment stickerIndex={this.props.index} modalIndexItem={this.state.modalIndexItem}/>
                </ReactModal>
            </ul>
        );
    }
}

ModalTask.propTypes = {
    index: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => ({tasks: getStiker(state, ownProps.index).toJS().tasks});
const mapDispatchToProps = (dispatch) => (bindActionCreators({
    delTask
}, dispatch));
export default connect(mapStateToProps, mapDispatchToProps)(ModalTask);
