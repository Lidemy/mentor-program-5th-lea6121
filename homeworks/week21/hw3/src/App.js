import React from 'react'
import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    mobile: '',
    signUpType: '',
    howToKnow: '',
    feedback: ''
  })

  const [errors, setErrors] = useState('')

  const updateFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const { nickname, email, mobile, signUpType, howToKnow, feedback } = formData

  const { nicknameMsg, emailMsg, mobileMsg, signUpTypeMsg, howToKnowMsg } =
    errors

  function handleValidation() {
    let errors = {}
    let formIsValid = true

    // 名稱驗證
    if (nickname.trim() === '') {
      formIsValid = false
      errors['nicknameMsg'] = '請填寫名稱！'
    }

    // 信箱驗證
    const isEmail = /^([\w]+)(.[\w]+)*@([\w]+)(.[\w]{2,3}){1,2}$/

    if (!isEmail.test(email)) {
      formIsValid = false
      errors['emailMsg'] = '請填寫正確信箱！'
    }

    // 手機驗證
    const isMobile = /^09[0-9]{8}$/

    if (!isMobile.test(mobile)) {
      formIsValid = false
      errors['mobileMsg'] = '請填寫正確手機號碼！'
    }

    // radio 驗證
    if (signUpType === '') {
      formIsValid = false
      errors['signUpTypeMsg'] = '請選擇報名類型！'
    }

    // 如何得知活動驗證
    if (howToKnow.trim() === '') {
      formIsValid = false
      errors['howToKnowMsg'] = '請填寫內容！'
    }

    setErrors(errors)
    return formIsValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = `
    報名成功！提交結果：
    - 暱稱：${nickname}
    - 電子郵件：${email}
    - 手機號碼：${mobile}
    - 報名類型：${signUpType}
    - 如何知道活動：${howToKnow}
    - 其他：${feedback}`

    if (handleValidation()) {
      alert(result)
    }
  }

  return (
    <div className="App">
      <div className="wrapper">
        <main>
          <h1>新拖延運動報名表單</h1>
          <div className="event-info">
            <p className="info">活動日期：2020/12/10 ~ 2020/12/11</p>
            <p className="info">活動地點：台北市大安區新生南路二段1號</p>
          </div>
          <div id="notice">* 必填</div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="question">
              暱稱<span> *</span>
              <br />
              <input
                type="text"
                placeholder="您的回答"
                className="answer"
                name="nickname"
                value={nickname}
                onChange={(e) => updateFormData(e)}
              />
              <br />
              <span>{nicknameMsg}</span>
            </div>

            <div className="question">
              電子郵件<span> *</span>
              <br />
              <input
                type="email"
                placeholder="您的電子郵件"
                className="answer"
                name="email"
                value={email}
                onChange={(e) => updateFormData(e)}
              />
              <br />
              <span>{emailMsg}</span>
            </div>

            <div className="question">
              手機號碼<span> *</span>
              <br />
              <input
                type="tel"
                placeholder="您的手機號碼"
                className="answer"
                name="mobile"
                value={mobile}
                onChange={(e) => updateFormData(e)}
              />
              <br />
              <span>{mobileMsg}</span>
            </div>

            <div className="question">
              報名類型<span> *</span>
              <br />
              <div className="radio">
                <input
                  type="radio"
                  name="signUpType"
                  id="bed"
                  value="躺在床上用想像力實作"
                  onChange={(e) => updateFormData(e)}
                />
                <label htmlFor="bed">躺在床上用想像力實作</label>
                <br />
                <input
                  type="radio"
                  name="signUpType"
                  id="floor"
                  value="趴在地上滑手機找現成的"
                  onChange={(e) => updateFormData(e)}
                />
                <label htmlFor="floor">趴在地上滑手機找現成的</label>
                <br />
                <span>{signUpTypeMsg}</span>
              </div>
            </div>

            <div className="question">
              怎麼知道這個活動的？<span> *</span>
              <br />
              <input
                type="text"
                placeholder="您的回答"
                className="answer"
                name="howToKnow"
                value={howToKnow}
                onChange={(e) => updateFormData(e)}
              />
              <br />
              <span>{howToKnowMsg}</span>
            </div>

            <div className="question">
              其他
              <p>對活動的一些建議</p>
              <input
                type="text"
                placeholder="您的回答"
                className="answer"
                name="feedback"
                value={feedback}
                onChange={(e) => updateFormData(e)}
              />
            </div>

            <div>
              <input type="submit" className="submit" />
            </div>
            <p>請勿透過表單送出您的密碼。</p>
          </form>
        </main>
      </div>
      <footer>
        <div className="rights">© 2020 © Copyright. All rights Reserved.</div>
      </footer>
    </div>
  )
}

export default App
