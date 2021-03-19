import { useRef, useEffect } from "react";
import TaskService from "../services/TaskService";

export default function Task({ tasks, task, setTasks, provided }) {
  let clickRef = useRef();

  const handleDelete = async (task) => {
    const tempTasks = tasks.filter((tempTask) => tempTask !== task);
    setTasks(tempTasks);
    await TaskService.deleteTask({
      deletedId: task.id,
    });
  };

  const handleChange = async (checkingTask, e) => {
    const res = await TaskService.changeTask({
      checkingTaskId: checkingTask.id,
    });
    let updated = tasks.map((task) => {
      if (task.id === checkingTask.id) {
        task.completed = res.data.completed;
      }
      return task;
    });
    setTasks(updated);
  };

  const handleEditing = (editingTask) => {
    let updated = tasks.map((task) => {
      if (task.id === editingTask.id) {
        task.editing = true;
      } else {
        task.editing = false;
      }
      return task;
    });
    setTasks(updated);
  };

  const handleNewTitle = (e, changingTitle) => {
    let updated = tasks.map((task) => {
      if (task.id === changingTitle.id) {
        task.title = e.target.value.replace(/\s+/g, " ");
      }
      return task;
    });
    setTasks(updated);
    console.log("handleNewTitle");
  };

  const handleKeyPress = async (e, doneEditing) => {
    if (e.key === "Enter") {
      let updated = tasks.map((task) => {
        if (task.id === doneEditing.id) {
          task.editing = false;
        }
        return task;
      });
      setTasks(updated);
      await TaskService.changeTask({
        editedId: doneEditing.id,
        editedTitle: doneEditing.title,
      });
    }
  };

  const handleClickOutside = (event) => {
    if (clickRef.current && !clickRef.current.contains(event.target)) {
      let updated = tasks.map((task) => {
        if (task.editing) {
          task.editing = false;
        }
        return task;
      });
      setTasks(updated);
      tasks.map(async (task) => {
        await TaskService.changeTask({
          editedId: task.id,
          editedTitle: task.title,
        });
        return task;
      });
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return (
    <li
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`list-group-item task-list-item ${
        task.editing ? "editing-task" : ""
      }`}
    >
      <div className="task-handle">
        <div className="task-check">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => handleChange(task, e)}
          />
        </div>
        {!task.editing ? (
          <div
            onDoubleClick={() => {
              handleEditing(task);
            }}
            className={`task-title ${task.completed ? "done" : "active"}`}
          >
            {task.title.length > 35
              ? task.title.substring(0, 34) + "..."
              : task.title}
          </div>
        ) : (
          <input
            value={task.title}
            autoFocus
            ref={clickRef}
            onChange={(e) => {
              handleNewTitle(e, task);
            }}
            onKeyPress={(e) => {
              handleKeyPress(e, task);
            }}
            className="input-editing"
          />
        )}
      </div>
      <div className="task-control">
        <i className="fas fa-times" onClick={() => handleDelete(task)}></i>
      </div>
    </li>
  );
}
