import { useState } from 'react'

export default function AddTodo({ addTodo }) {
  const [value, setValue] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim() !== '') {
      addTodo(value)
      setValue('')
    }
  }

  return (
    <form className="input-group mb-3" onSubmit={handleSubmit}>
      <input
        className="form-control"
        type="text"
        placeholder="What do you want to get done today..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btn btn-outline-light" onClick={handleSubmit}>
        +
      </button>
    </form>
  )
}
