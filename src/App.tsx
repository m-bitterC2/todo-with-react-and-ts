import { useEffect, useRef, useState } from "react";
import "./App.css";
import TodoList from "./component/TodoList";

export type Todo = {
  id: number;
  text: string;
};

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 0,
      text: "ex1",
    },
  ]);

  useEffect(() => {
    // フォーカスの設定
    inputRef.current?.focus();
  });

  useEffect(() => {
    // bottonクリックイベント
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        buttonRef.current?.click();
      }
    };

    // イベントリスナーの追加
    inputRef.current?.addEventListener("keypress", handleKeyPress);

    return () => {
      inputRef.current?.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  const addTodo = () => {
    if (!inputText) return;
    setTodos([{ id: todos.length, text: inputText }, ...todos]);
    setInputText("");
  };

  const completeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const isMax = todos.length == 5;

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        disabled={isMax}
        placeholder="TODOを入力"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button ref={buttonRef} disabled={isMax} onClick={addTodo}>
        追加
      </button>
      {isMax && <p style={{ color: "red" }}>Todo登録上限は5件です</p>}
      <TodoList todos={todos} completeTodo={completeTodo} />
    </>
  );
}

export default App;
