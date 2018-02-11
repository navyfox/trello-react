import React, {Component} from 'react';
import './Board.css';
import Sticker from "../Sticker/Sticker";
import {connect} from 'react-redux';
import Immutable from 'immutable';
import {List} from 'immutable';


class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddSticker: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        if (event.key === 'Enter') {
            this.props.onAddSticker(event.target.value);
            this.setState({isAddSticker: false});
        }
    }

    render() {
        let newStickerContent = this.state.isAddSticker
            ? <textarea onKeyPress={this.handleSubmit}/>
            : <a onClick={() => this.setState({isAddSticker: true})}>Add new sticker</a>;
        return (
            <div className="lists">
                {this.props.stickers.map(item => <Sticker key={item.id} title={item.name} index={item.id}
                                                          handleDelete={() => this.props.onDelSticker(item.id)}/>)}
                <div className="list">
                    <div className="add-list">
                        {newStickerContent}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({stickers: state.stickers.toJS()});
const mapDispatchToProps = (dispatch) => ({
    onAddSticker: (name) => {
        const payload = Immutable.fromJS({
            id: Date.now(),
            name,
            tasks: List([])
        });
        dispatch({type: 'ADD_STICKER', payload: payload});
    },
    onDelSticker: (id) => {
        dispatch({type: 'DELETE_STICKER', id: id})
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);