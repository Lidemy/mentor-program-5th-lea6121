import React, { useState, useContext } from 'react'
import { ResetStyle, GlobalStyle } from '../../globalStyle'
import { useHistory } from 'react-router'
import { Loading } from '../../components/App/App'
import './register.css'
import { register, getMe } from '../../WebAPI'
import { AuthContext } from '../../contexts'
import { setAuthToken } from '../../utils'

export default function RegisterPage() {
  const { setUser } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    nickname: '',
    username: '',
    password: ''
  })
  const { nickname, username, password } = formData
  const updateFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const [errors, setErrors] = useState('')
  const [isLoadingMsg, setIsLoadingMsg] = useState(false)
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLoadingMsg) {
      return
    }
    setIsLoadingMsg(true)
    register(nickname, username, password).then((data) => {
      setIsLoadingMsg(false)
      if (data.code) {
        return setErrors(data.message)
      }
      if (data.ok === 1) {
        setAuthToken(data.token)
      }
      getMe().then((response) => {
        if (response.ok !== 1) {
          setAuthToken(null)
          return setErrors(response.toString())
        }
        alert('註冊成功！')
        setUser(response.data)
        history.push('/')
      })
    })
  }

  return (
    <div className="register-wrapper">
      <ResetStyle />
      <GlobalStyle />
      {isLoadingMsg && <Loading>Loading...</Loading>}
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <div className="register-form">
            NICKNAME
            <br />
            <input
              className="register-input"
              type="text"
              name="nickname"
              placeholder="您的暱稱"
              value={nickname}
              onChange={(e) => updateFormData(e)}
              required
            />
            <br />
          </div>
          <div className="register-form">
            USERNAME
            <br />
            <input
              className="register-input"
              type="text"
              name="username"
              placeholder="您的使用者名稱"
              value={username}
              onChange={(e) => updateFormData(e)}
              required
            />
            <br />
          </div>
          <div className="register-form">
            PASSWORD
            <br />
            <input
              className="register-input"
              type="password"
              name="password"
              placeholder="您的密碼"
              value={password}
              onChange={(e) => updateFormData(e)}
              required
            />
            <br />
            <span>{errors}</span>
          </div>
          <div>
            <input className="register-submit" type="submit" value="SUBMIT" />
          </div>
        </form>
      </div>
    </div>
  )
}
