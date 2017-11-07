const axios = require('axios')
const xml2js = require('xml2js')

module.exports = () => {
  axios.get('https://www.smashingmagazine.com/feed/').then(({ data }) => {
    const parser = new xml2js.Parser()

    if (data) {
      parser.parseString(data, (err, json) => {
        global.lenaggar = json
      })
    }
  })
}
