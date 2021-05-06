const request = require('request')

request(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
    let data = {}
    let dataName = ''
    let dataId = ''
    try {
      data = JSON.parse(body)
    } catch (err) {
      console.log('Something went wrong :(', error)
      return
    }
    for (let i = 0; i < data.length; i++) {
      dataId = data[i].id
      dataName = data[i].name
      console.log(`${dataId} ${dataName}`)
    }
  }
)
