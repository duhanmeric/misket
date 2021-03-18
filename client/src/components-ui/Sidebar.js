import { Link, Redirect } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserProvider";
import ProjectService from "../services/ProjectService";

export default function Sidebar({ handleProject }) {
  const { user, setUser, token, setToken } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  const [projectList, setProjectList] = useState([]);

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
  }, []);

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
    console.log(res.data);
    setProjectList([
      ...projectList,
      {
        id: res.data.id,
        title: res.data.title,
      },
    ]);
  };

  const handleDeleteProject = async (id) => {
    const tempProjects = projectList.filter((project) => project.id !== id);
    setProjectList(tempProjects);
    await ProjectService.deleteProject({
      ProjectId: id,
    });
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <Link to="/">Home</Link>
      </div>
      {user ? (
        <div className="d-flex justify-content-start align-items-center">
          <img
            style={{ width: "40px", marginRight: "10px" }}
            src={user.photoURL}
          />
          <div>{user.username}</div>
        </div>
      ) : null}

      <div className="current-projects">
        <div className="current-projects-title">Projects</div>
        <ul className="list-unstyled mt-1">
          {projectList.map((project) => (
            <li
              key={project.id}
              className="project-list-item"
              onClick={() => handleProject(project)}
            >
              <div className="project-info">
                <div className="project-icon">
                  <i className="far fa-file-alt"></i>
                </div>
                <div className="project-list-title">{project.title}</div>
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
