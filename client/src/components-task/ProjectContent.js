import TaskInput from "./TaskInput";
import SingleTask from "./SingleTask";
import TaskControl from "./TaskControl";
import { useState, useEffect, useRef } from "react";
import TaskService from "../services/TaskService";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ProjectService from "../services/ProjectService";

export default function ProjectContent({
  selectedContent,
  projectList,
  setProjectList,
}) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  let clickRef = useRef();

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

  const handleDragEnd = async (param) => {
    let copyList = tasks;
    const srcI = param.source.index;
    const desI = param.destination?.index;
    copyList.splice(desI, 0, copyList.splice(srcI, 1)[0]);
    for (let i = 0; i < tasks.length; i++) {
      if (i !== 0 && copyList[i - 1].id > copyList[i].id) {
        await TaskService.changeTask({
          sourceSwap: copyList[i],
          destSwap: copyList[i - 1],
        });
      }
    }
    setTasks(copyList);
  };

  const handleEditing = (selectedContent) => {
    let updated = projectList.map((project) => {
      if (project.id === selectedContent.id) {
        project.editing = true;
      } else {
        project.editing = false;
      }
      return project;
    });
    console.log(updated);
    setProjectList(updated);
  };

  const changeToNewTitle = (e, selectedContent) => {
    let updated = projectList.map((project) => {
      if (project.id === selectedContent.id) {
        project.title = e.target.value;
      }
      return project;
    });
    setProjectList(updated);
  };

  const handleKeyPress = async (e, selectedContent) => {
    if (e.key === "Enter") {
      let updated = projectList.map((project) => {
        if (project.id === selectedContent.id) {
          project.editing = false;
        }
        return project;
      });
      setProjectList(updated);
      await ProjectService.changeProjectTitle({
        editedContentId: selectedContent.id,
        editedContentTitle: selectedContent.title,
      });
    }
  };

  const handleClickOutside = (event) => {
    if (clickRef.current && !clickRef.current.contains(event.target)) {
      let updated = projectList.map((project) => {
        if (project.editing) {
          project.editing = false;
        }
        return project;
      });
      setProjectList(updated);
      projectList.map(async (project) => {
        await ProjectService.changeProjectTitle({
          editedContentId: selectedContent.id,
          editedContentTitle: selectedContent.title,
        });
        return project;
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
    <div className="content">
      {selectedContent ? (
        <>
          {!selectedContent.editing && selectedContent ? (
            <div className="selected-content">
              <h2
                className="project-title mb-0"
                onDoubleClick={() => handleEditing(selectedContent)}
              >
                {selectedContent.title}
              </h2>
              <i
                className="far fa-edit"
                onClick={() => handleEditing(selectedContent)}
              ></i>
            </div>
          ) : (
            <input
              value={selectedContent.title}
              autoFocus
              className="project-editing"
              ref={clickRef}
              onChange={(e) => {
                changeToNewTitle(e, selectedContent);
              }}
              onKeyPress={(e) => {
                handleKeyPress(e, selectedContent);
              }}
            />
          )}

          <div className="content-list">
            <div className="card-header dashboard-header">
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
              <div className="card-body dashboard-body">
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
            <div className="card-footer dashboard-footer">
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
