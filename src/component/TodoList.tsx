import { Todo } from "../App";
import "./TodoList.css";

type Props = {
  todos: Todo[];
  completeTodo: (id: number) => void;
};

const TodoList = ({ todos, completeTodo }: Props) => {
  return (
    <ul>
      {todos.map((todo) => {
        return (
          <li key={todo.id}>
            <div>{todo.text}</div>
            <button onClick={() => completeTodo(todo.id)}>完了</button>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
