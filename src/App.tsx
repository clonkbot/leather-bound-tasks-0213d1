import { useState, useEffect } from 'react'
import './styles.css'

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('skeu-todos')
    if (saved) {
      return JSON.parse(saved).map((t: Todo) => ({
        ...t,
        createdAt: new Date(t.createdAt)
      }))
    }
    return [
      { id: '1', text: 'Review quarterly reports', completed: false, createdAt: new Date() },
      { id: '2', text: 'Call the accountant', completed: true, createdAt: new Date() },
      { id: '3', text: 'Order new stationery', completed: false, createdAt: new Date() },
    ]
  })
  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  useEffect(() => {
    localStorage.setItem('skeu-todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        {
          id: Date.now().toString(),
          text: newTodo.trim(),
          completed: false,
          createdAt: new Date()
        },
        ...todos
      ])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const activeTodos = todos.filter(t => !t.completed).length

  return (
    <div className="app-container">
      {/* Leather texture overlay */}
      <div className="leather-texture" />

      {/* Main notepad */}
      <div className="notepad">
        {/* Brass binding rings */}
        <div className="binding-rings">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="ring" />
          ))}
        </div>

        {/* Notepad header */}
        <div className="notepad-header">
          <div className="embossed-title">
            <span className="title-text">Tasks</span>
            <span className="title-accent">&amp; Notes</span>
          </div>
          <div className="date-stamp">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
        </div>

        {/* Input area */}
        <div className="input-area">
          <div className="paper-clip" />
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Write a new task..."
            className="todo-input"
          />
          <button onClick={addTodo} className="add-button">
            <span className="add-icon">+</span>
          </button>
        </div>

        {/* Filter tabs */}
        <div className="filter-tabs">
          {(['all', 'active', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-tab ${filter === f ? 'active' : ''}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'active' && activeTodos > 0 && (
                <span className="badge">{activeTodos}</span>
              )}
            </button>
          ))}
        </div>

        {/* Todo list */}
        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p>No tasks here yet</p>
            </div>
          ) : (
            filteredTodos.map((todo, index) => (
              <div
                key={todo.id}
                className={`todo-card ${todo.completed ? 'completed' : ''}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`checkbox ${todo.completed ? 'checked' : ''}`}
                  aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
                >
                  {todo.completed && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <span className={`todo-text ${todo.completed ? 'strike' : ''}`}>
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-button"
                  aria-label="Delete task"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer stats */}
        <div className="notepad-footer">
          <span className="stat">{activeTodos} task{activeTodos !== 1 ? 's' : ''} remaining</span>
          {todos.filter(t => t.completed).length > 0 && (
            <button
              onClick={() => setTodos(todos.filter(t => !t.completed))}
              className="clear-button"
            >
              Clear completed
            </button>
          )}
        </div>

        {/* Stitching detail */}
        <div className="stitching top" />
        <div className="stitching bottom" />
      </div>

      {/* Page footer */}
      <footer className="page-footer">
        Requested by @web-user · Built by @clonkbot
      </footer>
    </div>
  )
}

export default App
