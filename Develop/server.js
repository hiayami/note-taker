const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');

const path = require('path');

//setup routes to serve index.html, notes.html, and all other static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/notes', express.static(path.join(__dirname, 'public', 'notes.html')));

//sanitize requests so express lets us access the payload
app.use(express.json())
//add note to db.json. Generate non-repeating ID using time in milliseconds
app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json'), {encoding:'utf-8'})) 
    req.body.id = Date.now()
    notes.push(req.body)
    fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes))
    res.send('success')
})

//return db.json file to the front end
app.get('/api/notes', (req, res) => {
   const notes = fs.readFileSync(path.join(__dirname, 'db', 'db.json'), {encoding:'utf-8'}) 
    res.json(JSON.parse(notes))
})

//find the note to delete by the passed note id. IF it exists, delete it from db.json
app.delete('/api/notes/:noteId', (req, res) => {
    const id = req.params.noteId 
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json'), {encoding:'utf-8'})) 
    const index = notes.findIndex(note => note.id == id)
    if (index >= 0) {
        notes.splice(index, 1)
    }
    fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes))
    res.send('success')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})