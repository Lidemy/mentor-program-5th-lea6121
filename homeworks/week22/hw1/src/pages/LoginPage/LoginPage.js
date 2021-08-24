import React, { useState, useContext } from 'react'
import { ResetStyle, GlobalStyle } from '../../globalStyle'
import { Loading } from '../../components/App/App'
import './login.css'
import { getMe, login } from '../../WebAPI'
import { setAuthToken } from '../../utils'
import { useHistory } from 'react-router'
import { AuthContext } from '../../contexts'

export default function LoginPage() {
  const { setUser } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const { username, password } = formData
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
    login(username, password).then((data) => {
      setIsLoadingMsg(false)
      if (data.ok === 0) {
        return setErrors(data.message)
      }
      setAuthToken(data.token)

      getMe().then((response) => {
        if (response.ok !== 1) {
          setAuthToken(null)
          return setErrors(response.toString())
        }
        alert('登入成功！')
        setUser(response.data)
        history.push('/')
      })
    })
  }

  return (
    <div className="login-wrapper">
      <ResetStyle />
      <GlobalStyle />
      {isLoadingMsg && <Loading>Loading...</Loading>}
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <div className="login-form">
            USERNAME
            <br />
            <input
              className="login-input"
              type="text"
              name="username"
              value={username}
              onChange={(e) => updateFormData(e)}
              required
            />
            <br />
          </div>
          <div className="login-form">
            PASSWORD
            <br />
            <input
              className="login-input"
              type="password"
              name="password"
              value={password}
              onChange={(e) => updateFormData(e)}
              required
            />
            <br />
            <span>{errors}</span>
          </div>
          <div>
            <input className="login-submit" type="submit" value="SIGN IN" />
          </div>
        </form>
      </div>
    </div>
  )
}
