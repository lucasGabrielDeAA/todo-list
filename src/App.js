import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

import Note from './components/Note';
import NoteForm from './components/NoteForm';

class App extends Component {

  state = {
    notes: [],
    totalNotes: 0,
  };

  componentDidMount() {
    const database = firebase.database().ref('notes');

    database.on('value', snap => {
      this.setState({ totalNotes: snap.numChildren() });
    });

    database.on('child_added', snap => {
      this.setState({
        notes: [...this.state.notes, { id: snap.key, message: snap.val().message }]
      });
    });

    database.on('child_removed', snap => {
      this.setState({
        notes: [...this.state.notes.filter(note => (note.id !== snap.key))]
      })
    });

  }

  addNote = (noteMessage) => {
    const database = firebase.database().ref().child('notes');
    database.push().set({ id: Math.random(), message: noteMessage });
  }

  removeNote = (noteId) => {
    const database = firebase.database().ref().child('notes');
    database.child(noteId).remove();
  }

  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="header">
            {this.state.totalNotes + ' notes'}
          </div>
        </div>
        <div className="notesBody">
          {this.state.notes.length > 0 ?
            this.state.notes.map(note => (
              <Note
                key={note.id}
                message={note.message}
                id={note.id}
                removeNote={this.removeNote}
              />
            ))
            : null
          }
        </div>
        <div className="notesFooter">
          <NoteForm addNote={this.addNote} />
        </div>
      </div>
    );
  }
}

export default App;
