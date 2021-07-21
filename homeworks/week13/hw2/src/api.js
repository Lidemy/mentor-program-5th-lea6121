/* eslint-disable */
import $ from 'jquery'

export function getCommentsAPI(apiUrl, siteKey, before, cb) {
  let url = `${apiUrl}/api_comments.php?site_key=${siteKey}`
  if (before) {
    url += `&before=${before}`
  }
  $.ajax({ url })
    .done((data) => cb(data))
    .fail((err) => console.log(err))
}

export function addComments(apiUrl, siteKey, data, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_comments.php`,
    data
  }).done(function (data) {
    cb(data)
  })
}
