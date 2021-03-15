import TaskInput from "./TaskInput";
import SingleTask from "./SingleTask";
import TaskControl from "./TaskControl";
import { useState } from "react";

export default function ProjectContent({ selectedProject }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const handleFilter = () => {
    if (filter === "all") {
      return tasks;
    } else if (filter === "active") {
      return tasks.filter((task) => !task.completed);
    } else if (filter === "done") {
      return tasks.filter((task) => task.completed);
    }
  };
  return (
    <div className="content">
      <h2 className="project-title">
        {selectedProject && selectedProject.title}
      </h2>
      <div className="content-list">
        <div className="card-header">
          <TaskInput tasks={tasks} setTasks={setTasks} />
        </div>
        <div className="card-body">
          <ul className="list-group task-list">
            {handleFilter().map((task) => (
              <SingleTask
                task={task}
                tasks={tasks}
                key={task.id}
                setTasks={setTasks}
              />
            ))}
          </ul>
        </div>
        <div className="card-footer">
          <TaskControl
            filter={filter}
            setFilter={setFilter}
            setTasks={setTasks}
          />
        </div>
      </div>
    </div>
  );
}
