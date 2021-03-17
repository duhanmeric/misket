import TaskInput from "./TaskInput";
import SingleTask from "./SingleTask";
import TaskControl from "./TaskControl";
import { useState, useEffect } from "react";
import TaskService from "../services/TaskService";

export default function ProjectContent({ selectedContent }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let tempArr = [];
    const fetchTasks = async () => {
      const res = await TaskService.getTasks({
        params: {
          ProjectId: selectedContent ? selectedContent.id : null,
        },
      });
      tempArr = res.data;
      tempArr.forEach((t) => {
        t.editing = false;
      });
      setTasks(tempArr);
    };

    fetchTasks();
  }, [selectedContent]);

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
      {selectedContent ? (
        <>
          <h2 className="project-title">
            {selectedContent && selectedContent.title}
          </h2>
          <div className="content-list">
            <div className="card-header">
              <TaskInput
                tasks={tasks}
                setTasks={setTasks}
                selectedContent={selectedContent}
              />
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
                selectedContent={selectedContent.id}
              />
            </div>
          </div>
        </>
      ) : (
        <h3 style={{ color: "gray" }}>Nothing to See here...</h3>
      )}
    </div>
  );
}
