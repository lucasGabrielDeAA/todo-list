import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

import Note from './components/Note';
import NoteForm from './components/NoteForm';

class App extends Component {

  state = {
    notes: [],
  };

  componentDidMount() {
    const notesDatabase = firebase.database().ref().child('notes');

    notesDatabase.on('child_added', snap => {
      this.setState({
        notes: [...this.state.notes, { id: snap.key, message: snap.val().message }]
      });
    });

    notesDatabase.on('child_removed', snap => {
      this.setState({
        notes: [...this.state.notes.filter(note => (note.id !== snap.key))]
      })
    });
  }

  addNote = (noteMessage) => {
    const notesDatabase = firebase.database().ref().child('notes');
    notesDatabase.push().set({ message: noteMessage });
  }

  removeNote = (noteId) => {
    const notesDatabase = firebase.database().ref().child('notes');
    notesDatabase.child(noteId).remove();
  }

  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="header">
            React + Firebase TodoList
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
          <NoteForm addNote={this.addNote}/>
        </div>
      </div>
    );
  }
}

export default App;
