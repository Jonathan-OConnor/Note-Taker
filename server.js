const express = require('express');
const app = express();
const fs = require(`fs`)
const { v4: uuidv4 } = require('uuid');


// will share any static html files with the browser
app.use(express.static('public'));

// accept incoming POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const saveFile = `./.db/.db.json`
const PORT = 3000; // for Heroku ? process.env.PORT || 3000

let noteList = fs.existsSync(saveFile) ?
    JSON.parse(fs.readFileSync(saveFile)) : []



app.get(`/notes`, function(req, res){
    res.sendFile(__dirname + `/public/notes.html`)
})

app.get('/api/notes' , function(req, res){
    res.send(noteList)
})
app.post(`/api/notes`, function(req,res){
    note = req.body
    note["id"] = uuidv4()
    noteList.push(note)
    fs.writeFileSync(saveFile, JSON.stringify(noteList))
    res.send(note)
})

app.get(`*`, function(req, res){
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(PORT, function () {
    console.log('Note-Taker on PORT ' + PORT);
});

