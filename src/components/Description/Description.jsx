import React, {Component} from 'react';
import {getStiker} from "../../selectors/selectors";
import {connect} from "react-redux";

class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            value: this.props.description,
            defaultValue: "Add description...",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        if (event.key === 'Enter') {
            this.props.onDescription(this.state.value);
            this.setState({isEdit: false});
        }
    }

    render() {
        let text = (this.state.value === '') ? this.state.defaultValue : this.state.value;
        return this.state.isEdit ?
            (<div className="description-block">
                <textarea
                    name="description"
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyPress={this.handleSubmit}
                />
            </div>) :
            (<div className="description-block">
                <div className="title description" onClick={() => this.setState({isEdit: true})}>{text}</div>
            </div>)
    }
}

const mapStateToProps = (state, ownProps) => ({description: getStiker(state.stickers, ownProps.stickerIndex).toJS().tasks.find(obj => obj.id === ownProps.modalIndexItem).description});
const mapDispatchToProps = (dispatch, ownProps) => ({
    onDescription: (description) => {
        dispatch({
            type: 'EDIT_TASK_DESCRIPTION',
            id: ownProps.stickerIndex,
            idTask: ownProps.modalIndexItem,
            description: description
        })
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Description);