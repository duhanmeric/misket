import Api from "./Api";

export default {
  register(credentials) {
    return Api().post("/register", credentials);
  },
  login(credentials) {
    // console.log(credentials);
    return Api().post("/login", credentials);
  },
  verification() {
    return Api().get("/verification/:ticket");
  },
};
