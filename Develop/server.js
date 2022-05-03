const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
var path = require('path');


app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})