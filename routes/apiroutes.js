const fs = require ("fs")
const { v4:uuidv4 } = require ("uuid");
uuidv4();
module.exports = function(app) {
    app.get("/api/notes", function (req, res) { 
        fs.readFile("./dbnotes/db.json","utf8", (err,data) => {
            if (err) throw err
            const allNotes = JSON.parse(data);
            res.json(allNotes);
        })
              
    });
    app.post("/api/notes", function (req, res) {
        let noteId = uuidv4()
        let newNote = {
            id: noteId,
            title: req.body.title, 
            text: req.body.text
        }
        fs.readFile("./dbnotes/db.json","utf8", (err,data) => {
            if (err) throw err
            const allNotes = JSON.parse(data)
            allNotes.push(newNote)
        fs.writeFile("./dbnotes/db.json",JSON.stringify(allNotes, null, 2), err => {
            if (err) throw err
            res.redirect("/")  
            console.log("Note Created") 
        });
        });
        });
    app.delete("/api/notes/:id", function (req, res) {
        let noteId = req.params.id
        fs.readFile("./dbnotes/db.json","utf8", (err,data) => {
            if (err) throw err
            const allNotes = JSON.parse(data)
            const updatedNotes = allNotes.filter(note => note.id!= noteId)
            fs.writeFile("./dbnotes/db.json",JSON.stringify(updatedNotes, null, 2), err => {
                if (err) throw err
                res.send(true);
                console.log("Note Deleted")
        });
    });
});
}
