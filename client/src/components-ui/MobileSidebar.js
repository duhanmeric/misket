import { UserContext } from "../UserProvider";
import { useContext, useEffect, useState } from "react";
import ProjectService from "../services/ProjectService";
import { Redirect, Link } from "react-router-dom";
import { decode } from "jsonwebtoken";

export default function MobileSidebar({
  handleSelected,
  setProjectList,
  projectList,
}) {
  const { token, setToken } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    if (!token) {
      setRedirect("/");
    }
  }, [token]);

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

  const handleBar = () => {
    const item = document.querySelector(".mb-sidebar-content");
    item.classList.toggle("opened");
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

  const handleLogOut = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <div className="mobile-sidebar">
      <div className="mb-logo">
        <Link to={"/"}>MISKET</Link>
      </div>
      <div className="bar" onClick={() => handleBar()}>
        <i className="fas fa-bars"></i>
      </div>
      <div className="mb-sidebar-content">
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
        <div className="current-projects" style={{ marginTop: "4rem" }}>
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
        <div className="logout mb-4" style={{ marginLeft: "0.4rem" }}>
          <i className="fas fa-sign-out-alt"></i>
          <h6 className="logout-btn mb-0" onClick={() => handleLogOut()}>
            Logout
          </h6>
        </div>
      </div>
    </div>
  );
}
