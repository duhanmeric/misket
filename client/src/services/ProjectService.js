import Api from "./Api";

export default {
  createPost(credentials) {
    return Api().post("/project", credentials);
  },
  getPost(a) {
    return Api().get("/project", a);
  },
  deleteProject({ ProjectId }) {
    return Api().delete("/project", { data: { ProjectId } });
  },
  changeProjectTitle(info) {
    if ("editedContentId" in info && "editedContentTitle" in info) {
      return Api().patch(`/project/${info.editedContentId}`, {
        editedContentId: info.editedContentId,
        editedContentTitle: info.editedContentTitle,
      });
    }
  },
};
