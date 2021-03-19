import TaskInput from "./TaskInput";
import SingleTask from "./SingleTask";
import TaskControl from "./TaskControl";
import { useState, useEffect } from "react";
import TaskService from "../services/TaskService";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

  const handleDragEnd = (param) => {
    let copyList = tasks;
    const srcI = param.source.index;
    const desI = param.destination?.index;
    copyList.splice(desI, 0, copyList.splice(srcI, 1)[0]);
    console.log(param.source, param.destination);
    for (let i = 0; i < tasks.length; i++) {
      if (i !== 0 && copyList[i - 1].id > copyList[i].id) {
        let tempId = copyList[i].id;
        copyList[i].id = copyList[i - 1].id;
        copyList[i - 1].id = tempId;
      }
    }
    console.log(copyList);
    setTasks(copyList);
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
            <DragDropContext
              onDragEnd={(param) => {
                handleDragEnd(param);
              }}
            >
              <div className="card-body">
                <Droppable droppableId="droppable-1">
                  {(provided, _) => (
                    <ul
                      className="list-group task-list"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {handleFilter().map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={"draggable-" + task.id}
                          index={index}
                        >
                          {(provided, _) => (
                            <SingleTask
                              provided={provided}
                              task={task}
                              tasks={tasks}
                              setTasks={setTasks}
                            />
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </div>
            </DragDropContext>
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
