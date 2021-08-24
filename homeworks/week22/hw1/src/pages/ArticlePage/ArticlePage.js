import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { ResetStyle, GlobalStyle } from '../../globalStyle'
import './article.css'
import { getPost } from '../../WebAPI'
import { useParams } from 'react-router-dom'
import { Loading } from '../../components/App/App'

export default function ArticlePage() {
  const params = useParams()
  const [articles, setArticles] = useState([])
  const [isLoadingMsg, setIsLoadingMsg] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (isLoadingMsg) {
      return
    }
    setIsLoadingMsg(true)
    getPost(params.id).then((articles) => {
      setIsLoadingMsg(false)
      setArticles(articles)
    })
  }, [])

  const handleClick = () => {
    history.push('/')
  }

  return (
    <div>
      <ResetStyle />
      <GlobalStyle />
      <div>
        <div className="article">
        {isLoadingMsg && <Loading>Loading...</Loading>}
          <h1>{articles.title}</h1>
          <p>{new Date(articles.createdAt).toLocaleString()}</p>
          <div className="article__content">{articles.body}</div>
          <button
            type="button"
            className="article__content-btn btn btn-dark"
            onClick={handleClick}
          >
            回文章列表
          </button>
        </div>
      </div>
    </div>
  )
}
