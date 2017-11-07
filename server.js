const express = require('express')
const path = require('path')
const axios = require('axios')
const xml2js = require('xml2js')
const uuidv4 = require('uuid/v4')
const uuidv5 = require('uuid/v5')
const opn = require('opn')

// server instance environment variables
const PORT = 7000
const DIST = path.resolve(__dirname, 'dist')
const INDEX = path.resolve(DIST, 'index.html')
const MY_NAMESPACE = uuidv4()

const app = express()

// middleware
app.use((req, res, next) => {
  // Allow CORS headers
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})
app.use(express.static(DIST))

// routing
app.get('/parse-feed', (httpRequest, httpResponse) => {
  const { url, name } = httpRequest.query

  axios
    .get(url)
    .then(({ data }) => {
      const parser = new xml2js.Parser()

      parser.parseString(data, (err, json) => {
        if (!err) {
          const channel = json.rss.channel[0]

          // successful response schema
          const feed = {
            id: uuidv5(channel.link[0], MY_NAMESPACE),
            url,
            desiredName: name,
            title: channel.title[0],
            link: channel.link[0],
            description: channel.description[0],
            lastBuildDate: channel.lastBuildDate[0],
            items: channel.item.map(item => ({
              id: item.guid[0]._,
              title: item.title[0],
              link: item.link[0],
              pubDate: item.pubDate[0],
              creator: item['dc:creator'][0],
              category: item.category
            }))
          }

          httpResponse.json({
            success: true,
            feed
          })
        }

        httpResponse.json({
          success: false,
          errorMessage: 'Feed could not be parsed, probably not a valid RSS feed url.'
        })
      })
    })
    .catch(() => {
      httpResponse.json({
        success: false,
        errorMessage: 'Cannot download this RSS feed, please try again later.'
      })
    })
})

// wildcard route `*` to always serve the entry file of the SPA
app.get('*', (request, response) => {
  response.sendFile(INDEX)
})

// start server
app.listen(PORT, () => {
  opn(`http://localhost:${PORT}`)
    .then(() => {})
    .catch((err) => {
      console.log(err) // eslint-disable-line
    })
  console.log(` ~ app listening on port: ${PORT}`) // eslint-disable-line
})
