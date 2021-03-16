import Api from "./Api";

export default {
  createPost(credentials) {
    return Api().post("/create-project", credentials);
  },
  getPost(a) {
    return Api().get("/get-projects", a);
  },
  deleteProject({ ProjectId }) {
    return Api().delete("/delete-project", { data: { ProjectId } });
  },
};
