import React, {Component} from 'react';
import ReactModal from 'react-modal';
import TitleTask from "../TitleTask/TitleTask";
import Description from "../Description/Description";
import Comment from "../Comment/Comment";
import {connect} from "react-redux";
import {getStiker} from "../../selectors/selectors";

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
        this.props.onDeleteTask(this.state.modalIndexItem);
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

const mapStateToProps = (state, ownProps) => ({tasks: getStiker(state.stickers, ownProps.index).toJS().tasks});
const mapDispatchToProps = (dispatch, ownProps) => ({
    onDeleteTask: (idTask) => {
        dispatch({
            type: 'DELETE_TASK',
            id: ownProps.index,
            idTask: idTask
        })
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(ModalTask);
