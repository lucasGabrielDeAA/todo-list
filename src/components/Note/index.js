import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

const Note = ({ message, id, removeNote }) => ({
    render() {
        return (
            <div className="note fade-in">
                <span className="closebtn"
                    onClick={() => removeNote(id)}>
                    &times;
                </span>
                <p className="noteContent">{ message }</p>
            </div>
        )
    }
});

Note.propTypes = {
    message: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    removeNote: PropTypes.func.isRequired,
}

export default Note;
