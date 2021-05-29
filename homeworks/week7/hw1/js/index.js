const form = document.querySelector('.form')

form.addEventListener('submit', test)

function test(e) {
  const inputName = document.querySelector('input[name=name]')
  const inputNameReminder = document.querySelector('input[name=name] ~ h4')
  const inputEmail = document.querySelector('input[name=email]')
  const inputEmailReminder = document.querySelector('input[name=email] ~ h4')
  const inputMobile = document.querySelector('input[name=number]')
  const inputMobileReminder = document.querySelector('input[name=number] ~ h4')
  const inputTypeBed = document.getElementById('bed')
  const inputTypeFloor = document.getElementById('floor')
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

  if (!inputTypeBed.checked && !inputTypeFloor.checked) {
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
    (inputTypeBed.checked !== false || inputTypeFloor.checked !== false) &&
    inputText.value !== ''
  ) {
    let inputTypeValue = ''
    if (inputTypeBed.checked === true) {
      inputTypeValue = inputTypeBed.value
    } else {
      inputTypeValue = inputTypeFloor.value
    }

    const result = `
    報名成功！提交結果：
    - 暱稱：${inputName.value}
    - 電子郵件：${inputEmail.value}
    - 手機號碼：${inputMobile.value}
    - 報名類型：${inputTypeValue}
    - 如何知道活動：${inputText.value}
    - 其他：${document.querySelector('input[name=comment]').value}`

    alert(result)
  }
}
