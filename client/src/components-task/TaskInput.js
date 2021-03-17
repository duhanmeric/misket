import { useState } from "react";
import TaskService from "../services/TaskService";

export default function TaskInput({ tasks, setTasks, selectedProject }) {
  const [inputText, setInputText] = useState("");

  const handleInputText = (e) => {
    setInputText(e.target.value);
  };

  const addTask = async (e) => {
    if (inputText === "" || inputText.trim() === "") {
      alert("you entered a empty todo");
      setInputText("");
      return;
    } else if (e.key === "Enter" || e.type === "click") {
      let trimmed = inputText.replace(/\s+/g, " ");
      const res = await TaskService.addTask({
        title: trimmed,
        // editing: false,
        completed: false,
        ProjectId: selectedProject.id,
      });
      console.log(res.data);
      setTasks([
        ...tasks,
        {
          id: res.data.id,
          title: res.data.title,
          editing: false,
          completed: res.data.completed,
        },
      ]);
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
