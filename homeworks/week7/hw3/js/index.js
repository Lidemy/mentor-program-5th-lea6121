const todoItems = []
const myTodo = document.querySelector('.todo__list')
const form = document.querySelector('.form')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const input = document.querySelector('.todo__input')
  const inputValue = input.value.trim()
  if (inputValue !== '') {
    addTodo(inputValue)
    input.value = ''
  }
})

function renderTodo(todo) {
  let newTodos = ''
  const newTodo = `<li class= "todo__item">
          <input id="${todo.id}" type="checkbox" />
          <label for="${todo.id}" class="checkmark"></label>
          <span>${todo.inputValue}</span>
          <button class="delete-todo"><svg><use href="#delete-icon"></use></svg>
          </button>
          </li>`
  newTodos += newTodo
  myTodo.innerHTML += newTodos
}

function addTodo(inputValue) {
  const todo = {
    inputValue,
    id: Date.now()
  }
  todoItems.push(todo)
  renderTodo(todo)
}

myTodo.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-todo') === true) {
    e.target.parentNode.remove()
  }
  if (e.target.classList.contains('checkmark')) {
    e.target.parentNode.classList.toggle('todo__done')
  }
})
