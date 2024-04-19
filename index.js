const express = require('express')
const app = express()
const port = 3001
const db = require('./db')
let sql

const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:3000'
}))

const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/notes', (req, res) => {
    sql = `SELECT * FROM note`
    db.all(sql, [], (err, rows) => {
        if(err){
            return res.json({success: false})
        }
        return res.json({success: true, data: rows})
    })
})

app.post('/notes', (req, res) => {
    const {title, description} = req.body
    sql = 'INSERT INTO note (title, description) VALUES (?, ?)'
    db.run(sql, [title, description], (err) => {
        if(err) return res.json({success: false})
        return res.json({success: true})
    })
})

app.put('/notes/:id', (req, res) => {
    const {title, description} = req.body
    const {id} = req.params
    sql = 'UPDATE note SET title = COALESCE(?, title), description = COALESCE(?, description) WHERE id = ?'
    db.run(sql, [title, description, id], (err) => {
        if(err) return res.json({success: false})
        return res.json({success: true})
    })
})

app.delete('/notes/:id', (req, res) => {
    sql = 'DELETE FROM note WHERE id = ?'
    const {id} = req.params
    db.run(sql, id, (err) => {
        if(err) return res.json({success: false})
        return res.json({success: true}) 
    })
})

app.listen(port)