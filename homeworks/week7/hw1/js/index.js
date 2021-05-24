const form = document.querySelector('.form')

form.addEventListener('submit', test)

function test(e) {
  const inputName = document.querySelector('input[name=name]')
  const inputNameReminder = document.querySelector('input[name=name] ~ h4')
  const inputEmail = document.querySelector('input[name=email]')
  const inputEmailReminder = document.querySelector('input[name=email] ~ h4')
  const inputMobile = document.querySelector('input[name=number]')
  const inputMobileReminder = document.querySelector('input[name=number] ~ h4')
  const inputTypeBed = document.getElementById('bed').checked
  const inputTypeFloor = document.getElementById('floor').checked
  const inputTypeReminder = document.querySelector('input[name=type] ~ h4')
  const inputText = document.querySelector('input[name=text]')
  const inputTextReminder = document.querySelector('input[name=text] ~ h4')
  const isEmail = /^([\w]+)(.[\w]+)*@([\w]+)(.[\w]{2,3}){1,2}$/
  const isMobile = /^09[0-9]{8}$/

  if (inputName.value === '') {
    inputNameReminder.style.display = 'block'
    e.preventDefault()
  }

  if (!isEmail.test(inputEmail.value)) {
    inputEmailReminder.style.display = 'block'
    e.preventDefault()
  }

  if (!isMobile.test(inputMobile.value)) {
    inputMobileReminder.style.display = 'block'
    e.preventDefault()
  }

  if (inputTypeBed === false && inputTypeFloor === false) {
    inputTypeReminder.style.display = 'block'
    e.preventDefault()
  }

  if (inputText.value === '') {
    inputTextReminder.style.display = 'block'
    e.preventDefault()
  }

  if (
    inputName.value !== '' &&
    isEmail.test(inputEmail.value) &&
    isMobile.test(inputMobile.value) &&
    (inputTypeBed !== false || inputTypeFloor !== false) &&
    inputText.value !== ''
  ) {
    alert('報名成功！')
  }
}
