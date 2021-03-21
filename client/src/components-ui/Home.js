import { Link } from "react-router-dom";
import Girl from "../assets/girl.svg";
import Boy from "../assets/boy.svg";

export default function Home() {
  return (
    <div className="home">
      <section className="hero-section container w-75">
        <div className="hero-row row mx-auto">
          <h1 className="hero-title text-center">
            Unique lists to unique personalities
          </h1>
          <h6 className="hero-subtitle text-center">
            Follow up your tasks with separate lists.
          </h6>
          <Link to={"/register"} className="make-list-link w-auto mx-auto">
            <button className="make-list-btn">Make a List</button>
          </Link>
        </div>
        <div className="vector-row row mx-auto w-100 d-flex justify-content-center">
          <div className="vectors d-flex justify-content-between">
            <img src={Girl} alt="girl" />
            <img src={Boy} alt="girl" />
          </div>
        </div>
      </section>
      <section className="intro-section">
        <div className="container-w-75">
          <h3 className="intro-title text-center">Organize your projects</h3>
          <p
            className="intro-text w-50 mx-auto text-center mt-3"
            style={{ fontSize: "18px", lineHeight: "160%" }}
          >
            With Misket, you can manage your day easily. Just create a new
            project and start to type tasks. You can make separate projects to
            keep track of your management. Wrong order? Just drag the task and
            drop it on to another task.
          </p>
          <div className="row mx-auto justify-content-between mt-5 w-75">
            <div className="col-sm-4 mx-auto" style={{ maxWidth: "300px" }}>
              <div className="card">
                <div
                  className="card-body d-flex justify-content-around align-items-center flex-column py-4"
                  style={{
                    minHeight: "250px",
                    overflow: "unset",
                    backgroundColor: "unset",
                  }}
                >
                  <i
                    className="fas fa-thumbtack"
                    style={{ fontSize: "48px", color: "#00ba63" }}
                  ></i>
                  <div className="card-info text-center">Easy to Use</div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 mx-auto" style={{ maxWidth: "300px" }}>
              <div className="card">
                <div
                  className="card-body d-flex justify-content-around align-items-center flex-column py-4"
                  style={{
                    minHeight: "250px",
                    overflow: "unset",
                    backgroundColor: "unset",
                  }}
                >
                  <i
                    className="fas fa-folder-open"
                    style={{ fontSize: "48px", color: "#00ba63" }}
                  ></i>
                  <div className="card-info text-center">Work separately</div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 mx-auto" style={{ maxWidth: "300px" }}>
              <div className="card">
                <div
                  className="card-body d-flex justify-content-around align-items-center flex-column py-4"
                  style={{
                    minHeight: "250px",
                    overflow: "unset",
                    backgroundColor: "unset",
                  }}
                >
                  <i
                    className="fas fa-arrows-alt"
                    style={{ fontSize: "48px", color: "#00ba63" }}
                  ></i>
                  <div className="card-info text-center">Reorder tasks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-section">
        <h1 className="contact-title">Contact</h1>
        <p className="text-center mb-0 mt-3">
          You can contact with me through form down below.
        </p>
        <p className="mb-5">Misket has developed for educational purposes.</p>
        <div className="row mx-auto w-75">
          <form action="#">
            <div
              className="upper-form mx-auto d-flex justify-content-between"
              style={{ maxWidth: "500px" }}
            >
              <div className="col-sm-5">
                <div className="form-group">
                  <label htmlFor="name" className="mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    aria-describedby="nameHelp"
                    placeholder="Enter fullname"
                  />
                </div>
              </div>
              <div className="col-sm-5">
                <div className="form-group">
                  <label htmlFor="email" className="mb-1">
                    Email Adress
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
              </div>
            </div>
            <div
              className="bottom-form mx-auto mt-3"
              style={{ maxWidth: "500px" }}
            >
              <div class="form-group">
                <label htmlFor="message" className="mb-1">
                  Message
                </label>
                <textarea
                  class="form-control"
                  id="message"
                  rows="6"
                  style={{ resize: "none" }}
                  placeholder="Enter your message"
                ></textarea>
              </div>
            </div>
            <div
              className="btn-container mt-4 mx-auto"
              style={{ maxWidth: "500px" }}
            >
              <button className="make-list-btn">Send</button>
            </div>
          </form>
        </div>
      </section>
      <footer
        style={{ borderTop: "1px solid #ccc", minHeight: "60px" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="author text-center">Made with 🧡 by duhanmeric</div>
      </footer>
    </div>
  );
}
