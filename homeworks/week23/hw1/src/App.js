import './App.css'
import { useSelector } from 'react-redux'
import { selectFilters, selectTodos } from './redux/selectors'
import { useDispatch } from 'react-redux'
import AddTodo from './containers/AddTodo'
import {
  undoTodo,
  completeTodo,
  deleteTodo,
  deleteAllTodo,
  showDone,
  showAll,
  showUndone
} from './redux/actions'

function Todo({ todo }) {
  const dispatch = useDispatch()
  return (
    <li className="todo-item">
      <div className={todo.isDone ? 'done' : 'undone'}>
        <label
          className="form-check-label1"
          htmlFor="{todo.index}"
          style={{
            textDecoration: todo.isDone ? 'line-through' : 'none',
            fontStyle: todo.isDone ? 'italic' : ''
          }}
        >
          {todo.text}
        </label>
      </div>
      <div className="todo-btn">
        <button
          type="button"
          className={
            todo.isDone ? 'btn btn-outline-success' : 'btn btn-outline-danger'
          }
          onClick={
            todo.isDone
              ? () => dispatch(undoTodo(todo.id))
              : () => dispatch(completeTodo(todo.id))
          }
        >
          {todo.isDone ? 'done' : 'undone'}
        </button>
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => dispatch(deleteTodo(todo.id))}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

function App() {
  const todos = useSelector(selectTodos)
  const visibilityFilter = useSelector(selectFilters)
  const dispatch = useDispatch()

  return (
    <div className="wrapper">
      <header></header>

      <section className="todo">
        <div className="todo-container">
          <div className="todo-top">
            <h1>Redux React Todo</h1>
          </div>
        </div>

        <div className="todo-wrapper">
          <AddTodo />
          <div className="todo-content">
            <ul className="todo-list">
              {todos
                .filter((todo) => {
                  if (visibilityFilter === 'all') return todo
                  if (visibilityFilter === 'done') return todo.isDone
                  return !todo.isDone
                })
                .map((todo, id) => (
                  <Todo todo={todo} index={id} />
                ))}
            </ul>
            <div className="todo-controller">
              <div className="btn-group me-2" role="group">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-all"
                  onClick={() => dispatch(showAll())}
                >
                  all
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-active"
                  onClick={() => dispatch(showUndone())}
                >
                  active
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-completed"
                  onClick={() => dispatch(showDone())}
                >
                  completed
                </button>
              </div>

              <div>
                <button
                  type="button"
                  className="btn btn-dark delete-all"
                  onClick={() => dispatch(deleteAllTodo())}
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
