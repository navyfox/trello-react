import React, { Component } from 'react';
import ReactModal from 'react-modal';
import bindActionCreators from "redux/es/bindActionCreators";
import {getUserName} from "../../reducers/board";
import {connect} from "react-redux";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenWindowLogin: true,
            text: '',
        };
    }

    handleChange = (event) => {
        this.setState({text: event.target.value});
    };

    handleSubmit = (event) => {
        if (event.key === 'Enter') {
            this.props.getUserName(this.state.text);
            this.setState({isOpenWindowLogin: false});
        }
    };

    render() {
        return (
            <ReactModal
                isOpen={this.state.isOpenWindowLogin}
                contentLabel=""
                className="open-modal-login"
                ariaHideApp={false}
            >
                <div>Enter your name</div>
                <textarea
                    name="login"
                    value={this.state.text}
                    onChange={this.handleChange}
                    onKeyPress={this.handleSubmit}
                />
            </ReactModal>
        )
    }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => (bindActionCreators({
    getUserName
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Login);