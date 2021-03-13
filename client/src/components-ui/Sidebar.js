import { Link, Redirect } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
// import { UserContext } from "../UserProvider";

export default function Sidebar({ handleContent }) {
  return (
    <div className="sidebar">
      <div className="logo">
        <Link to="/">Home</Link>
      </div>
      <div className="current-projects">
        <div className="current-projects-title">Projects</div>
        <ul className="list-unstyled mt-1">
          <button className="add-project" onClick={() => null}>
            <i className="fas fa-plus"></i>
            <div className="add-project-title">Add Project</div>
          </button>
        </ul>
      </div>
      <div className="logout">
        <i className="fas fa-sign-out-alt"></i>
        <h6 className="logout-btn mb-0" onClick={null}>
          Logout
        </h6>
      </div>
    </div>
  );
}
