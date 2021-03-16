import { Link, Redirect } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserProvider";
import ProjectService from "../services/ProjectService";

export default function Sidebar() {
  const { user, setUser, token, setToken } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  const [projectList, setProjectList] = useState([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    if (!user) {
      setRedirect("/");
    }
  }, [user]);

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
    // setProjectList([
    //   ...projectList,
    //   {
    //     id: id,
    //     title: "untitled",
    //   },
    // ]);
    // console.log(projectList);
    // setId(id + 1);
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
            <li key={project.id} className="project-list-item">
              <div className="project-icon">
                <i className="far fa-file-alt"></i>
              </div>
              <div className="project-list-title">{project.title}</div>
            </li>
          ))}
          <button
            className="add-project"
            disabled={projectList.length >= 7}
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
