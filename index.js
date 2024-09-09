const express = require('express')
const multer = require('multer')

let app = express()
app.use(express.json(), express.static('public'))

let upload = (field) => {
  return multer({
    storage: multer.diskStorage({
      destination: './public/uploads/',
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      }
    })
  }).single(field)
}

app.post('/submit', upload('image'), (req, res) => {
  res.send({
    name: req.body.name,
    image: req.file.filename
  })
})

app.listen(8000)