let isLoading = false
const myTitle = document.querySelector('h1')
let displayStream = 20
let i = 0

function renderStream(data) {
  const myContent = document.querySelector('.contents')
  let allContents = ''

  if (data.length < displayStream) {
    displayStream = data.length
    console.log(displayStream)
  }

  while (i < displayStream) {
    const contents = `<a href="${data[i].channel.url}" class="content">
        <figure>
          <img src="${data[i].preview.medium}"  class="content__pic">
          <figcaption>
            <div class="content__headshot">
              <img src="${data[i].channel.logo}"/>
            </div>
            <div class="content__title">
              <p>${data[i].channel.status}</p>
              <p>${data[i].channel.game}</p>
              <p>${data[i].channel.name}</p>
            </div>
          </figcaption>
        </figure>
      </a>`
    allContents += contents
    i++
  }

  myContent.innerHTML += allContents

  /* eslint-disable */
  if ((i = displayStream) && data.length > displayStream) {
    displayStream = displayStream + 20
  }
  /* eslint-enable */
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

if (gameParams === 'FIFA 20') {
  myTitle.innerText = 'FIFA 20'
}

if (gameParams === 'Counter-Strike: Global Offensive') {
  myTitle.innerText = 'Counter-Strike: Global Offensive'
}

function getStream() {
  let data = {}
  fetch(`https://api.twitch.tv/kraken/streams?game=${gameParams}&limit=100`, {
    headers: {
      Accept: 'application / vnd.twitchtv.v5 + json',
      'Client-ID': 'xe68qafh532i3xiod0d09w3jutfewd'
    }
  })
    .then((response) => response.json())
    .then((jsonData) => {
      data = jsonData.streams
      console.log(data.length)
      isLoading = true
      renderStream(data)
    })
    .catch((err) => {
      console.log('錯誤:', err)
    })
}

getStream()

window.onscroll = () => {
  if (
    window.scrollY + window.innerHeight >= document.body.scrollHeight &&
    isLoading === true
  ) {
    isLoading = false
    getStream()
  }
}

const myNavTag = document.querySelector('.tags')
myNavTag.addEventListener('click', (e) => {
  console.log(e)
})
