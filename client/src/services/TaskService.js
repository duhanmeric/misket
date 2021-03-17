import Api from "./Api";

export default {
  addTask(credentials) {
    return Api().post("/task", credentials);
  },
  getTasks(a) {
    return Api().get("/task", a);
  },
  deleteTask({ id }) {
    return Api().delete(`/task/${id}`);
  },
  changeTask(info) {
    if ("checkingTaskId" in info) {
      return Api().patch(`/task/${info.checkingTaskId}`, {
        checkingId: info.checkingTaskId,
      });
    } else if ("editedTitle" in info) {
      console.log(info);
      return Api().patch(`/task/${info.editedId}`, {
        editedTitle: info.editedTitle,
      });
    }
  },
};
