import Api from "./Api";

export default {
  addTask(credentials) {
    return Api().post("/add-task", credentials);
  },
  getTasks(a) {
    return Api().get("/get-tasks", a);
  },
  deleteTask({ id }) {
    return Api().delete("/delete-task", { data: { id } });
  },
  changeTask(info) {
    if ("checkingTaskId" in info) {
      return Api().patch("/change-task", { checkingId: info.checkingTaskId });
    }
  },
};
