import Api from "./Api";

export default {
  createPost(credentials) {
    return Api().post("/create-project", credentials);
  },
};
