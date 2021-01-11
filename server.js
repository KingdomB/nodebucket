const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 8080

app.use(express.static('./dist/nodebucket.json'))

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'dist/nodebucket.json' }
  )
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
