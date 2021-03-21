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
    </div>
  );
}
