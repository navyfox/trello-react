import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Board.css';

import Sticker from "../Sticker/Sticker";
import { addSticker, delSticker } from "../../reducers/board";
import { bindActionCreators } from 'redux';


class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddSticker: false,
            text: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (event.target.value.length <= 33) {
            this.setState({text: event.target.value});
        }
    }

    handleSubmit(event) {
        if (event.key === 'Enter') {
            this.props.addSticker(this.state.text);
            this.setState({isAddSticker: false});
        }
    }

    stickersArray = () => this.props.stickers.map( (item) => (
        <Sticker key={item.id}
                 title={item.name}
                 index={item.id}
                 handleDelete={() => this.props.delSticker(item.id)}
        />));

    render() {
        let newStickerContent = this.state.isAddSticker
            ? <textarea value={this.state.text}
                        onKeyPress={this.handleSubmit}
                        onChange={this.handleChange}
            />
            : <a onClick={() => this.setState({isAddSticker: true})}>Add new sticker</a>;
        return (
            <div className="lists">
                {this.stickersArray()}
                <div className="list">
                    <div className="add-list">
                        {newStickerContent}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({stickers: state.get('board').get('stickers').toJS()});
const mapDispatchToProps = (dispatch) => (bindActionCreators({
    addSticker,
    delSticker
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Board);