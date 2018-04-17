import React, { Component } from 'react';
import './styles.css';

class NoteForm extends Component {
    state = {
        noteMessage: ''
    };

    onChangeMessage = (evt) => {
        this.setState({ noteMessage: evt.target.value });
    }

    handleAddNote = () => {
        this.props.addNote(this.state.noteMessage);
        this.setState({ noteMessage: '' });
    }

    render() {
        return (
            <div className="formWrapper">
                <input
                    className="noteInput"
                    placeholder="Write a note..."
                    value={this.state.noteMessage}
                    onChange={this.onChangeMessage}
                />
                <button
                    className="addNoteButton"
                    onClick={this.handleAddNote}
                >
                    Add
                </button>
            </div>
        )
    }
}

export default NoteForm;
