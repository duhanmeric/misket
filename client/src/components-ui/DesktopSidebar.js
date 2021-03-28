import { Redirect } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserProvider";
import ProjectService from "../services/ProjectService";
import { decode } from "jsonwebtoken";

export default function DesktopSidebar({
  handleSelected,
  setProjectList,
  projectList,
}) {
  const { token, setToken } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setRedirect("/");
    }
  }, [token]);

  useEffect(() => {
    if (projectList.length > 4) {
      setError("Maximum 5 projects allowed.");
      setTimeout(function () {
        setError("");
      }, 3000);
    }
  }, [projectList.length]);

  useEffect(() => {
    let tempArr = [];
    const fetchProjects = async () => {
      const res = await ProjectService.getPost({
        params: {
          UserId: token ? decode(token).id : null,
        },
      });
      tempArr = res.data;
      setProjectList(tempArr);
    };

    fetchProjects();
  }, [setProjectList, token]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  const handleLogOut = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const handleAddProject = async () => {
    const res = await ProjectService.createPost({
      title: "untitled",
      UserId: decode(token).id,
    });
    setProjectList([
      ...projectList,
      {
        id: res.data.id,
        title: res.data.title,
        editing: false,
      },
    ]);
  };

  const handleDeleteProject = async (id) => {
    const tempProjects = projectList.filter((project) => project.id !== id);
    setProjectList(tempProjects);
    handleSelected(null);
    await ProjectService.deleteProject({
      ProjectId: id,
    });
  };

  return (
    <div className="sidebar">
      {token ? (
        <div className="mt-4 d-flex flex-column justify-content-start align-items-center">
          <img
            style={{ width: "60px" }}
            src={decode(token).photoURL}
            alt="pp"
          />
          <div className="mt-3 username" style={{ fontSize: "18px" }}>
            {decode(token).username}
          </div>
        </div>
      ) : null}

      <div className="current-projects">
        <div className="current-projects-title">Projects</div>
        {error ? <div style={{ color: "red" }}>{error}</div> : null}
        <ul className="list-unstyled mt-1">
          {projectList.map((project) => (
            <li key={project.id} className="project-list-item">
              <div
                className="project-info w-100"
                onClick={() => handleSelected(project)}
              >
                <div className="project-icon">
                  <i className="far fa-file-alt"></i>
                </div>
                <div
                  className="project-list-title"
                  style={{ marginRight: "auto" }}
                >
                  {project.title}
                </div>
              </div>
              <div
                className="delete-project"
                onClick={() => handleDeleteProject(project.id)}
              >
                <i className="fas fa-trash delete-project-icon"></i>
              </div>
            </li>
          ))}
          <button
            className="add-project"
            disabled={projectList.length > 4}
            onClick={() => handleAddProject()}
          >
            <i className="fas fa-plus"></i>
            <div className="add-project-title">Add Project</div>
          </button>
        </ul>
      </div>
      <div className="logout">
        <i className="fas fa-sign-out-alt"></i>
        <h6 className="logout-btn mb-0" onClick={() => handleLogOut()}>
          Logout
        </h6>
      </div>
    </div>
  );
}
