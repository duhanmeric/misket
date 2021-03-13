import { useState } from "react";
export default function TaskInput({ tasks, setTasks }) {
  const [inputText, setInputText] = useState("");
  const [id, setId] = useState(0);

  const handleInputText = (e) => {
    setInputText(e.target.value);
  };

  const addTask = (e) => {
    if (inputText === "" || inputText.trim() === "") {
      alert("you entered a empty todo");
      setInputText("");
      return;
    } else if (e.key === "Enter" || e.type === "click") {
      let trimmed = inputText.replace(/\s+/g, " ");
      setTasks([
        ...tasks,
        {
          id: id,
          title: trimmed,
          editing: false,
          completed: false,
        },
      ]);
      setId(id + 1);
      setInputText("");
    }
  };

  return (
    <>
      <input
        type="text"
        value={inputText}
        onChange={handleInputText}
        placeholder="Enter task..."
        className="input-text"
        onKeyPress={(e) => {
          if (e.key === "Enter") addTask(e);
        }}
      />
      <i
        className="fas fa-plus"
        onClick={(e) => {
          addTask(e);
        }}
      ></i>
    </>
  );
}
