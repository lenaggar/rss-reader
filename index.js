const express = require('express')
const path = require('path')
const axios = require('axios')
const parser = require('xmljson').to_json
const opn = require('opn')

const PORT = 7000
const PUBLIC = path.resolve(__dirname, 'public')
const INDEX = path.resolve(PUBLIC, 'index.html')

const app = express()

// middleware
app.use(express.static(PUBLIC))

// routing
app.get('/parse-feed', (request, response) => {
  axios
    .get(request.query.url)
    .then((res) => {
      const xml = res.data

      parser(xml, (err, feed) => {
        if (!err) {
          response.json({
            success: true,
            feed
          })
        }

        response.json({
          success: false,
          errorMessage: 'Feed could not be parsed, probably not a valid RSS feed url.'
        })
      })
    })
    .catch((err) => {
      response.json({
        success: false,
        errorMessage: 'Cannot download this RSS feed, please try later.',
        error: err
      })
    })
})

app.get('*', (request, response) => {
  response.sendFile(INDEX)
})

// start server
app.listen(PORT, () => {
  opn(`http://localhost:${PORT}`)
  console.log(` ~ app listening on port: ${PORT}`) // eslint-disable-line
})
