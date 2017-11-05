const express = require('express')
const path = require('path')
const axios = require('axios')
const parser = require('xmljson').to_json
const uuidv4 = require('uuid/v4')
const opn = require('opn')

const PORT = 7000
const DIST = path.resolve(__dirname, 'dist')
const INDEX = path.resolve(DIST, 'index.html')

const app = express()

// middleware
app.use(express.static(DIST))

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
            feed: Object.assign(feed, { id: uuidv4() })
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
        errorMessage: 'Cannot download this RSS feed, please try again later.',
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
