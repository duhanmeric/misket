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
          <p className="intro-text w-50 mx-auto">
            With Misket, you can manage your day easily. Just create a new
            project and start to type tasks. You can make separate projects to
            keep track of your management.
          </p>
          <p className="intro-text w-50 mx-auto">
            Wrong order? Just drag the task and drop it on to another task.
          </p>
          <div className="row mx-auto justify-content-around mt-5 w-75">
            <div className="col-sm-4">
              <div className="card">
                <div
                  className="card-body d-flex justify-content-around align-items-center flex-column py-4"
                  style={{
                    minHeight: "220px",
                    maxHeight: "175px",
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
            <div className="col-sm-4">
              <div className="card">
                <div
                  className="card-body d-flex justify-content-around align-items-center flex-column py-4"
                  style={{
                    minHeight: "220px",
                    maxHeight: "175px",
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
            <div className="col-sm-4">
              <div className="card">
                <div
                  className="card-body d-flex justify-content-around align-items-center flex-column py-4"
                  style={{
                    minHeight: "220px",
                    maxHeight: "175px",
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
    </div>
  );
}
