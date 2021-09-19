import {
  ADD_TODO,
  COMPLETE_TODO,
  UNDO_TODO,
  DELETE_ALL_TODO,
  DELETE_TODO,
  SHOW_ALL,
  SHOW_DONE,
  SHOW_UNDONE
} from './actionTypes'

export function addTodo(text) {
  return {
    type: ADD_TODO,
    payload: {
      text
    }
  }
}

export function completeTodo(id) {
  return {
    type: COMPLETE_TODO,
    payload: {
      id
    }
  }
}

export function undoTodo(id) {
  return {
    type: UNDO_TODO,
    payload: {
      id
    }
  }
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {
      id
    }
  }
}

export function deleteAllTodo() {
  return {
    type: DELETE_ALL_TODO
  }
}

export function showAll() {
  return {
    type: SHOW_ALL
  }
}

export function showDone() {
  return {
    type: SHOW_DONE
  }
}

export function showUndone() {
  return {
    type: SHOW_UNDONE
  }
}
