import Api from "./Api";

export default {
  addTask(credentials) {
    return Api().post("/add-task", credentials);
  },
};
