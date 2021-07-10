let isLoading = false
const myTitle = document.querySelector('h1')
const limit = 20
let offset = 20

function renderStreams(dataStreams) {
  const myContent = document.querySelector('.contents')
  let allContents = ''

  for (let i = 0; i < dataStreams.length; i++) {
    const contents = `<a href="${dataStreams[i].channel.url}" class="content">
      <figure>
        <img src="${dataStreams[i].preview.medium}"  class="content__pic">
        <figcaption>
          <div class="content__headshot">
            <img src="${dataStreams[i].channel.logo}"/>
          </div>
          <div class="content__title">
            <p>${dataStreams[i].channel.status}</p>
            <p>${dataStreams[i].channel.game}</p>
            <p>${dataStreams[i].channel.name}</p>
          </div>
        </figcaption>
      </figure>
    </a>`
    allContents += contents
  }
  myContent.innerHTML += allContents
}

let gameParams = new URLSearchParams(window.location.search).get('game')

if (gameParams === null) {
  gameParams = ''
}

if (gameParams === 'League Of Legends') {
  myTitle.innerText = 'League Of Legends'
}

if (gameParams === 'Just Chatting') {
  myTitle.innerText = 'Just Chatting'
}

if (gameParams === 'Fortnite') {
  myTitle.innerText = 'Fortnite'
}

if (gameParams === 'Apex Legends') {
  myTitle.innerText = 'Apex Legends'
}

if (gameParams === 'Counter-Strike: Global Offensive') {
  myTitle.innerText = 'Counter-Strike: Global Offensive'
}

/* 原未使用 async await 的版本
function getStreams() {
  let data = {}

  fetch(
    `https://api.twitch.tv/kraken/streams?game=${gameParams}&limit=${limit}&offset=${offset}`,
    {
      headers: {
        Accept: 'application / vnd.twitchtv.v5 + json',
        'Client-ID': 'xe68qafh532i3xiod0d09w3jutfewd'
      }
    }
  )
    .then((response) => response.json())
    .then((jsonData) => {
      data = jsonData.streams
      isLoading = true
      renderStreams(data)
    })
    .catch((err) => {
      console.log('錯誤:', err)
    })
}
*/

async function getStreams() {
  const response = await fetch(
    `https://api.twitch.tv/kraken/streams?game=${gameParams}&limit=${limit}&offset=${offset}`,
    {
      headers: {
        Accept: 'application / vnd.twitchtv.v5 + json',
        'Client-ID': 'xe68qafh532i3xiod0d09w3jutfewd'
      }
    }
  )
  const data = await response.json()
  return data
}

async function run() {
  try {
    const data = await getStreams()
    let dataStreams = {}
    isLoading = true
    dataStreams = data.streams
    renderStreams(dataStreams)
  } catch (err) {
    console.log('錯誤:', err)
  }
}

run()

window.onscroll = () => {
  if (
    window.scrollY + window.innerHeight >= document.body.scrollHeight &&
    isLoading === true
  ) {
    isLoading = false
    offset += 20
    getStreams()
    run()
  }
}
