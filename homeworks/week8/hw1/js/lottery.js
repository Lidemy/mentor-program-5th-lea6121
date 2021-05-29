const btn1 = document.querySelector('.banner1 > div .button__lottery')
const btn2 = document.querySelector('.banner2 > div .button__lottery')
const banner1 = document.querySelector('.banner1')
const banner2 = document.querySelector('.banner2')
const myPrizeOutcome = document.querySelector('.banner2 > div h1')

function renderPrize(prize) {
  if (
    prize !== 'FIRST' &&
    prize !== 'SECOND' &&
    prize !== 'THIRD' &&
    prize !== 'NONE'
  ) {
    myPrizeOutcome.innerText = 'Something went wrong 請再試一次 :('
    alert('系統不穩定，請再試一次!')
  }

  if (prize === 'FIRST') {
    myPrizeOutcome.innerText = '恭喜你中頭獎了！日本東京來回雙人遊！'
    banner2.style.backgroundImage = "url('./img/flight.png')"
  }

  if (prize === 'SECOND') {
    myPrizeOutcome.innerText = '二獎！90 吋電視一台！'
    banner2.style.backgroundImage = "url('./img/livingRoom.png')"
  }

  if (prize === 'THIRD') {
    myPrizeOutcome.innerText =
      '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！'
    banner2.style.backgroundImage = "url('./img/youtube.png')"
  }

  if (prize === 'NONE') {
    myPrizeOutcome.innerText = '銘謝惠顧'
  }
}

function getPrize() {
  let prize = ''
  fetch(
    'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery',
    {}
  )
    .then((response) => {
      if (response.status !== 200) {
        myPrizeOutcome.innerText = 'Something went wrong 請再試一次 :('
        alert('系統不穩定，請再試一次!')
      }
      return response.json()
    })
    .then((jsonData) => {
      prize = jsonData.prize
      renderPrize(prize)
    })
    .catch((err) => {
      console.log('錯誤:', err)
    })
}

btn1.addEventListener('click', () => {
  banner2.style.backgroundImage = null
  myPrizeOutcome.innerText = 'Loading...'
  myPrizeOutcome.style.color = 'white'

  if (banner1.style.display !== 'none') {
    getPrize()
    banner2.style.display = 'block'
    banner1.style.display = 'none'
  }
})

btn2.addEventListener('click', () => {
  if (banner2.style.display !== 'none') {
    banner1.style.display = 'block'
    banner2.style.display = 'none'
  }
})
