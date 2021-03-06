import React from "react";

import Todo from "../components/Todo";
import * as TodoActions from "../actions/TodoActions";
import TodoStore from "../stores/TodoStore";


export default class Todos extends React.Component {
  constructor() {
    super();
    this.getTodos = this.getTodos.bind(this);
    this.state = {
      todos: TodoStore.getAll(),
      newTodoText: '',
    };
  }

  componentDidMount() {
    TodoStore.addChangeListener(this.getTodos);
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this.getTodos);
  }

  getTodos() {
    this.setState({
      todos: TodoStore.getAll(),
    });
  }

  createTodo() {
    if (!this.state.newTodoText) {
      return;
    }
    TodoActions.createTodo(this.state.newTodoText.trim());
    this.setState({newTodoText: ''});
  }

  reloadTodos() {
    TodoActions.reloadTodos();
  }

  handleNewTodoText(e) {
    this.setState({newTodoText: e.target.value});
  }

  render() {
    const { todos } = this.state;

    const TodoComponents = todos.map((todo) => {
        return <Todo key={todo.id} {...todo}/>;
    });

    return (
      <div>
        <h2>Todos</h2>
        <button onClick={this.reloadTodos.bind(this)}>Reload!</button>
        <form>
          <input type="text" placeholder='add new todo..' onChange={this.handleNewTodoText.bind(this)} value={this.state.newTodoText} />
          <button type="button" onClick={this.createTodo.bind(this)}>Create Todo</button>
        </form>

        <ul>{TodoComponents}</ul>
      </div>
    );
  }
}
