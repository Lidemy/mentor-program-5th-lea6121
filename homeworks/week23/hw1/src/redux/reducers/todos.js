import {
  ADD_TODO,
  DELETE_ALL_TODO,
  DELETE_TODO,
  COMPLETE_TODO,
  UNDO_TODO,
  SHOW_ALL,
  SHOW_UNDONE,
  SHOW_DONE
} from '../actionTypes'

let todoId = 2

const initialState = {
  todos: [
    { id: 0, text: 'Finish Todo', isDone: true },
    { id: 1, text: 'Watch NBA', isDone: false }
  ],
  filter: 'all'
}

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        todos: [
          ...state.todos,
          {
            id: todoId++,
            text: action.payload.text,
            isDone: false
          }
        ],
        filter: 'all'
      }
    }

    case DELETE_TODO: {
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload.id)
      }
    }

    case DELETE_ALL_TODO: {
      return {
        todos: []
      }
    }

    case COMPLETE_TODO: {
      const newTodos = [...state.todos]
      newTodos[action.payload.id].isDone = true
      return {
        ...state,
        todos: newTodos
      }
    }

    case UNDO_TODO: {
      const newTodos = [...state.todos]
      newTodos[action.payload.id].isDone = false
      return {
        ...state,
        todos: newTodos
      }
    }

    case SHOW_ALL: {
      return {
        ...state,
        filter: 'all'
      }
    }

    case SHOW_DONE: {
      return {
        ...state,
        filter: 'done'
      }
    }
    case SHOW_UNDONE: {
      return {
        ...state,
        filter: 'undone'
      }
    }

    default: {
      return state
    }
  }
}
