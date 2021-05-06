const request = require('request')
const process = require('process')

const inputCountry = process.argv[2]
const hostName = 'https://restcountries.eu/rest/v2/name/'

function listCountryData() {
  request.get(`${hostName}${inputCountry}`, (error, response, body) => {
    let data = {}
    try {
      data = JSON.parse(body)
    } catch (err) {
      console.log('Something went wrong :( Try again!', error)
    }
    if (data.status === 404) {
      console.log('找不到國家資訊')
    } else {
      for (let i = 0; i < data.length; i++) {
        console.log(`      ============
      國家：${data[i].name}
      首都：${data[i].capital}
      貨幣：${data[i].currencies[0].code}
      國碼：${data[i].callingCodes[0]}`)
      }
    }
  })
}

listCountryData()
