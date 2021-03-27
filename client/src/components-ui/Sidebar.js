import { Link, Redirect } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserProvider";
import ProjectService from "../services/ProjectService";

export default function Sidebar({
  handleSelected,
  setProjectList,
  projectList,
}) {
  const { user, setUser, token, setToken } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    if (!user) {
      setRedirect("/");
    }
  }, [user]);

  useEffect(() => {
    let tempArr = [];
    const fetchProjects = async () => {
      const res = await ProjectService.getPost({
        params: {
          UserId: user ? user.id : null,
        },
      });
      tempArr = res.data;
      setProjectList(tempArr);
    };

    fetchProjects();
  }, [setProjectList, user]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  const handleLogOut = () => {
    setUser(null);
    setToken(null);
    console.log(user, token);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const handleAddProject = async () => {
    const res = await ProjectService.createPost({
      title: "untitled",
      UserId: user.id,
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
      {user ? (
        <div className="mt-4 d-flex flex-column justify-content-start align-items-center">
          <img style={{ width: "60px" }} src={user.photoURL} alt="pp" />
          <div className="mt-3 username" style={{ fontSize: "18px" }}>
            {user.username}
          </div>
        </div>
      ) : null}

      <div className="current-projects">
        <div className="current-projects-title">Projects</div>
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
            disabled={projectList.length >= 5}
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
