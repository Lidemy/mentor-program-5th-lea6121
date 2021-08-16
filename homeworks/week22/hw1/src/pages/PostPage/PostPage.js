import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { ResetStyle, GlobalStyle } from '../../components/globalStyle'
import './post.css'
import { postNewPost } from '../../WebAPI'
import { Loading } from '../../components/App/App'

export default function PostPage() {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  })
  const { title, content } = formData
  const [errors, setErrors] = useState('')
  const [isLoadingMsg, setIsLoadingMsg] = useState(false)
  const history = useHistory()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (isLoadingMsg) {
      return
    }
    setIsLoadingMsg(true)
    postNewPost(title, content).then((data) => {
      setIsLoadingMsg(false)
      if (data.code) {
        return setErrors(data.message)
      }
      if (data.title) {
        alert('發布文章成功！')
        history.push('/')
      }
    })
  }

  return (
    <div className="post-wrapper">
      {isLoadingMsg && <Loading>Loading...</Loading>}
      <ResetStyle />
      <GlobalStyle />
      <div className="post-container">
        <form className="post-form" onSubmit={handleFormSubmit}>
          <div className="post-form__editor">
            <div className="post-form__title input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter the title here..."
                name="title"
                value={title}
                onChange={handleInputChange}
              />
            </div>
            <div className="post-form__content form-floating">
              <textarea
                className="form-control"
                placeholder="Leave a comment..."
                name="content"
                value={content}
                onChange={handleInputChange}
              ></textarea>
              <label htmlFor="floatingTextarea2">Leave a comment here...</label>
            </div>
            <div className="post-form__error">{errors}</div>
          </div>

          <div className="post-form__submit">
            <input type="submit" value="SUBMIT" class="post-form__submit-btn" />
          </div>
        </form>
      </div>
    </div>
  )
}
