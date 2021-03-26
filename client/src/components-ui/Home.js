import { Link } from "react-router-dom";
import boy from "../assets/boy.svg";
import { UserContext } from "../UserProvider";
import { useContext } from "react";

export default function Home() {
  const { user } = useContext(UserContext);

  return (
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
              to={user ? `/dashboard/${user.username}` : "/register"}
              className="make-btn"
            >
              Make a List
            </Link>
          </div>
        </div>
        <div className="row mx-0 justify-content-around vector-row">
          <div className="col-sm-4 col-md-5 text-center">
            <img src={boy} alt="boy" width="75%" height="75%" />
          </div>
        </div>
      </section>
      <section className="intro-section">
        <h3 className="intro-title text-center">Organize your projects</h3>
        <p className="intro-text text-center w-50 mx-auto">
          With Misket, you can manage your day easily. Just create a new project
          and start to type tasks. You can make separate projects to keep track
          of your management.
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
          You can contact with me through form down below.
        </p>
        <p className="mb-0 text-center contact-text">
          Misket has developed for educational purposes.
        </p>
        <form action="#" style={{ marginTop: "30px" }}>
          <div
            className="upper d-flex justify-content-center mx-auto"
            style={{ maxWidth: "600px" }}
          >
            <div
              className="form-group"
              style={{ marginRight: "30px", maxWidth: "250px", width: "100%" }}
            >
              <label htmlFor="email" className="mb-1">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="email"
                placeholder="Enter email"
              />
            </div>
            <div
              className="form-group"
              style={{ maxWidth: "250px", width: "100%" }}
            >
              <label htmlFor="name" className="mb-1">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="name"
                placeholder="Enter name"
              />
            </div>
          </div>
          <div
            className="below mx-auto"
            style={{ maxWidth: "530px", marginTop: "20px" }}
          >
            <div className="form-group">
              <label htmlFor="message" className="mb-1">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="5"
                style={{ resize: "none" }}
              ></textarea>
            </div>
          </div>
          <div
            className="btn-container d-flex justify-content-center mt-4 mx-auto"
            style={{ maxWidth: "530px" }}
          >
            <button className="send-btn w-100">Send</button>
          </div>
        </form>
      </section>
      <footer>
        <div className="author">Made with ❤️ by duhanmeric</div>
      </footer>
    </div>
  );
}
