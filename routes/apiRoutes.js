const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');;
const db = require('../db/database');

//route to read the `db.json` file and return all saved notes as JSON
app.get('/api/notes', async function (req, res) {
    const notes = await db.readNotes();
    return res.json(notes);
  });

//receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post('/api/notes', async function (req, res) {
      const notes = await db.readNotes();
      let newNote = {
          id: uuidv4(),
          title: req.body.title,
          text: req.body.text
      };
      // add the new note to the array of existing data
      newDB = [newNote, ...notes];
      // update (add) db.json
      await db.updateNotes(newDB, 'add');

      // return the new note to the client
      return res.send(newNote)
  });

app.delete('/api/notes/:id', async function(req, res) {
    // Identify the note to delete based on the id
    const noteToDelete = req.params.id;
    // current state of db.json
    const currentDB = await db.readNotes();
    // recreate the db array but only with notes that do not have the entered id
    const updatedDB = currentDB.filter((note) => note.id !== noteToDelete);
    // rewrite the updatedDB of notes to the `db.json` file
    await db.updateNotes(updatedDB, 'delete');
    // return updatedDB to client
    return res.send(updatedDB);
})

module.exports = app;