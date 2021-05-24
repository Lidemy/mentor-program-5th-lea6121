const question = document.querySelectorAll('.question')
const answer = document.querySelectorAll('.answer')

for (let i = 0; i < question.length; i++) {
  question[i].addEventListener('click', () => {
    answer[i].style.display =
      !answer[i].style.display || answer[i].style.display === 'none'
        ? 'block'
        : 'none'
  })
}
