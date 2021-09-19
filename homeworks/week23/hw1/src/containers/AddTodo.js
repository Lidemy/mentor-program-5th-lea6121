import { connect } from 'react-redux'
import { addTodo } from '../redux/actions'
import AddTodo from '../components/AddTodo'

const mapStateToProps = (store) => {
  return {
    todos: store.todoState.todos
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (payload) => dispatch(addTodo(payload))
  }
}

const connectToStore = connect(mapStateToProps, mapDispatchToProps)

// smart component
const ConnectedAddTodo = connectToStore(AddTodo)

export default ConnectedAddTodo
