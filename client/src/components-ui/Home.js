import { Link } from "react-router-dom";
import boy from "../assets/boy.svg";
import { UserContext } from "../UserProvider";
import { useContext, useRef } from "react";
import Navbar from "./Navbar";
import { decode } from "jsonwebtoken";
import AuthService from "../services/AuthService";

export default function Home() {
  const { token } = useContext(UserContext);
  const email = useRef(null);
  const name = useRef(null);
  const message = useRef(null);

  return (
    <>
      <Navbar></Navbar>
      <div className="home">
        <section className="hero-section">
          <div className="row mx-0 hero-row">
            <h1 className="hero-title text-center">
              Unique lists to unique personalities
            </h1>
            <h6 className="hero-subtitle text-center">
              Follow up your tasks with separate lists.
            </h6>
            <div className="btn-container d-flex justify-content-center">
              <Link
                to={
                  token ? `/dashboard/${decode(token).username}` : "/register"
                }
                className="make-btn"
              >
                Make a List
              </Link>
            </div>
          </div>
          <div className="row mx-0 justify-content-around vector-row">
            <div className="col-sm-8 col-md-7 col-lg-5 text-center">
              <img src={boy} alt="boy" width="75%" height="75%" />
            </div>
          </div>
        </section>
        <section className="intro-section">
          <h3 className="intro-title text-center">Organize your projects</h3>
          <p className="intro-text text-center w-50 mx-auto">
            With Misket, you can manage your day easily. Just create a new
            project and start to type tasks. You can make separate projects to
            keep track of your management.
          </p>
          <div className="container w-75 card-container">
            <div className="row mx-0">
              <div className="col-sm-4 card-col">
                <div className="card home-card h-100">
                  <div className="card-body text-center h-100">
                    <i className="fas fa-map-pin"></i>
                    <p className="mb-0">Easy to use</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 card-col">
                <div className="card home-card h-100">
                  <div className="card-body text-center h-100">
                    <i className="fas fa-folder-open"></i>
                    <p className="mb-0">Work separately</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 card-col">
                <div className="card home-card h-100">
                  <div className="card-body text-center h-100">
                    <i className="fas fa-sort"></i>
                    <p className="mb-0">Reorder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="contact-section">
          <h3 className="contact-title text-center">Contact</h3>
          <p className="mb-0 text-center contact-text">
            You can contact with me through link down below.
          </p>
          <p className="mb-0 text-center contact-text">
            <a
              href="mailto:duhanmeric@gmail.com"
              style={{ color: "#eee", textDecoration: "none" }}
            >
              duhanmeric@gmail.com
            </a>
          </p>
        </section>
        <footer>
          <div className="author">Made with ❤️ by duhanmeric</div>
        </footer>
      </div>
    </>
  );
}
