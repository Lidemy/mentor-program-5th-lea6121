const request = require('request')
const process = require('process')

const inputOrder = process.argv[2]
const idParams = process.argv[3]
const bookTitle = process.argv[4]
const hostName = 'https://lidemy-book-store.herokuapp.com/books'

switch (inputOrder) {
  case 'list':
    listData()
    break
  case 'read':
    getDataDetail()
    break
  case 'delete':
    deleteData(idParams)
    break
  case 'create':
    createData(idParams, bookTitle)
    break
  case 'update':
    updateData(idParams, bookTitle)
    break
}

function listData() {
  request.get(`${hostName}?_limit=20`, (error, response, body) => {
    let data = {}
    let dataName = ''
    let dataId = ''
    try {
      data = JSON.parse(body)
    } catch (err) {
      console.log('Something went wrong :(', error)
    }
    for (let i = 0; i < data.length; i++) {
      dataId = data[i].id
      dataName = data[i].name
      console.log(`${dataId} ${dataName}`)
    }
  })
}

function getDataDetail() {
  request.get(`${hostName}/${idParams}`, (error, response, body) => {
    let data = {}
    try {
      data = JSON.parse(body)
    } catch (err) {
      console.log('Something went wrong :(', error)
    }
    console.log(`${data.id} ${data.name}`)
  })
}

function createData(bookTitle) {
  request.post(
    {
      url: `${hostName}`,
      form: {
        id: '999',
        name: bookTitle
      }
    },
    (error, response, body) => {
      let data = {}
      try {
        data = JSON.parse(body)
        console.log(data)
        console.log(`No.${data.id}《${data.name}》新增成功`)
      } catch (err) {
        console.log('Something went wrong :(', error)
      }
    }
  )
}

function updateData(idParams, bookTitle) {
  request.patch(
    {
      url: `${hostName}/${idParams}`,
      form: {
        id: idParams,
        name: bookTitle
      }
    },
    (error, response, body) => {
      let data = {}
      try {
        data = JSON.parse(body)
        console.log(data)
        console.log(`修改完成，最新資料為 No.${data.id}《${data.name}》`)
      } catch (err) {
        console.log('Something went wrong :(', error)
      }
    }
  )
}

function deleteData(idParams) {
  request.delete(`${hostName}/${idParams}`, (error, response, body) => {
    let data = {}
    try {
      data = JSON.parse(body)
      console.log(data)
      console.log('本筆資料已刪除')
    } catch (err) {
      console.log('Something went wrong :(', error)
    }
  })
}
