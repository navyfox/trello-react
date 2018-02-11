import React, {Component} from 'react';
import './TitleTask.css';
import {connect} from "react-redux";
import {getStiker} from "../../selectors/selectors";

class TitleTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleEdit: false,
            value: this.props.title,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (event.target.value === "") {
        } else {
            this.setState({value: event.target.value});
        }
    }

    handleSubmit(event) {
        if (event.key === 'Enter') {
            this.props.onEditTaskName(this.props.stickerIndex, this.props.modalIndexItem, this.state.value);
            this.setState({titleEdit: false});
        }
    }

    render() {
        return this.state.titleEdit ? (
            <div>
                <textarea
                    name="description"
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyPress={this.handleSubmit}
                />
            </div>
        ) : (
            <div>
                <div className="title" onClick={() => this.setState({titleEdit: true})}>{this.state.value}</div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => ({
    title: getStiker(state.stickers, ownProps.stickerIndex).toJS().tasks.find(obj => obj.id === ownProps.modalIndexItem).name});
const mapDispatchToProps = (dispatch) => ({
    onEditTaskName: (id, idTask, name) => {
        dispatch({ type: 'EDIT_TASK_NAME', id: id, idTask: idTask, name: name});
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(TitleTask);
