/* eslint-disable */
import css from './style.css'
import { getCommentsAPI, addComments } from './api.js'
import { appendComment } from './utils.js'
import { getLoadMoreBtn, getForm } from './templates.js'
import $ from 'jquery'

export function init(options) {
  let before = 0
  let siteKey = ''
  let apiUrl = ''
  let containerElement = null
  let commentDOM = null
  let loadMoreClassName
  let commentsClassName
  let commentsSelector
  let formClassName
  let formSelector

  siteKey = options.siteKey
  apiUrl = options.apiUrl

  loadMoreClassName = `${siteKey}-load-more`
  commentsClassName = `${siteKey}-comments`
  formClassName = `${siteKey}-add-comment-form`
  formSelector = `.${formClassName}`
  commentsSelector = `.${commentsClassName}`

  containerElement = $(options.containerSelector)
  containerElement.append(getForm(formClassName, commentsClassName))

  getComments()

  $(commentsSelector).on('click', `.${loadMoreClassName}`, function () {
    $(`.${loadMoreClassName}`).hide()
    getComments()
  })

  $(formSelector).submit((e) => {
    e.preventDefault()
    const nicknameDOM = $(`${formSelector} input[name=nickname]`)
    const contentDOM = $(`${formSelector} textarea[name=content]`)

    const newCommentData = {
      site_key: siteKey,
      nickname: nicknameDOM.val(),
      content: contentDOM.val()
    }
    addComments(apiUrl, siteKey, newCommentData, (data) => {
      if (!data.ok) {
        alert(data.message)
        return
      }
      nicknameDOM.val('')
      contentDOM.val('')
      appendComment(commentDOM, newCommentData, true)
    })
  })

  function getComments() {
    // const commentDOM = $(commentsSelector)
    getCommentsAPI(apiUrl, siteKey, before, (data) => {
      if (!data.ok) {
        console.log(data.message)
        return
      }
      const comments = data.discussions

      if (comments.length < 6) {
        for (let i = 0; i < comments.length; i += 1) {
          appendComment($(commentsSelector), comments[i])
        }
        $(`.${loadMoreClassName}`).hide()
      } else {
        for (let i = 0; i < comments.length - 1; i += 1) {
          appendComment($(commentsSelector), comments[i])
        }
        const loadMoreBtn = getLoadMoreBtn(loadMoreClassName)
        $(commentsSelector).append(loadMoreBtn)

        before = comments[comments.length - 2].id
      }
    })
  }
}
