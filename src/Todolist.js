// TodoList.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, removeTodo } from '../src/reducers/TodoSlice';

const TodoList = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    dispatch(
      addTodo({
        id: Date.now(),
        text: newTodo,
        completed: false,
      })
    );
    setNewTodo('');
  };

  const handleToggleTodo = id => {
    dispatch(toggleTodo(id));
  };

  const handleRemoveTodo = id => {
    dispatch(removeTodo(id));
  };

  const filteredTodos = todos.filter(todo => {
    if (statusFilter === 'completed') {
      return todo.completed;
    } else if (statusFilter === 'uncompleted') {
      return !todo.completed;
    } else {
      return true;
    }
  });

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const filteredAndSearchedTodos = filteredTodos.filter(todo =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={event => setNewTodo(event.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      <div>
        <label>
          Filter:
          <select
            value={statusFilter}
            onChange={event => setStatusFilter(event.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Search:
          <input type="text" value={searchTerm} onChange={handleSearchChange} />
        </label>
      </div>

      <ul>
        {filteredAndSearchedTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
