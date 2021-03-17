import { UserContext } from "../UserProvider";
import { useContext } from "react";

export default function Profile() {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="profile">
        <div className="profile-center w-75">
          <div className="profile-photo">
            <img src={user ? user.photoURL : null} alt="user-img" />
          </div>
          <h1 style={{ marginTop: "10px" }}>{user ? user.username : null}</h1>
          <div className="form-group">
            <label htmlFor="bio">Your bio</label>
            <textarea className="form-control" id="bio" rows="2"></textarea>
          </div>
          <button style={{ marginTop: "10px" }} className="btn btn-danger">
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
}
