import { useEffect, useRef, useState } from "react";
import "./App.css";
import TodoList from "./component/TodoList";
import { v4 as uuidv4 } from "uuid";

export type Todo = {
  id: string;
  text: string;
};

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: uuidv4(),
      text: "技術書を１冊読む",
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
    setTodos([{ id: uuidv4(), text: inputText }, ...todos]);
    setInputText("");
  };

  const completeTodo = (id: string) => {
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
