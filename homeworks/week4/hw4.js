const request = require('request')

request.get(
  {
    url: 'https://api.twitch.tv/kraken/games/top',
    headers: {
      Accept: 'application / vnd.twitchtv.v5 + json',
      'Client-ID': 'xe68qafh532i3xiod0d09w3jutfewd'
    }
  },
  (error, response, body) => {
    let data = {}
    try {
      data = JSON.parse(body).top
    } catch (err) {
      console.log('Too bad :( Something went wrong.')
    }
    for (let i = 0; i < data.length; i++) {
      console.log(`${data[i].game._id} ${data[i].game.name}`)
    }
  }
)
