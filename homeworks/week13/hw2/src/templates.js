export function getForm(className, commentsClassName) {
  return `
    <div>
      <form class="${className}">

        <div class="mb-3">
          <label>暱稱</label>
          <input name="nickname" type="text" class="form-control">
        </div>

        <div class="comment">
          <label>Comments</label>
          <textarea class="form-control" placeholder="Leave a comment here" name="content"
              style="height: 100px"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>

      </form>
      <div class="${commentsClassName}"></div>
    </div>
    `
}

export function getLoadMoreBtn(className) {
  return `<button class="${className} btn btn-secondary">載入更多</button>`
}
