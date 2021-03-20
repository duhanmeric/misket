import Api from "./Api";

export default {
  addTask(credentials) {
    return Api().post("/task", credentials);
  },
  getTasks(a) {
    return Api().get("/task", a);
  },
  deleteTask(info) {
    if ("deletedId" in info) {
      return Api().delete(`/task/${info.deletedId}`, {
        data: { deletedTaskId: info.deletedId },
      });
    } else if ("ProjectId" in info) {
      return Api().delete(`/task/${info.ProjectId}`, {
        data: { ProjectId: info.ProjectId },
      });
    }
    console.log(info);
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
    } else if ("sourceSwap" in info && "destSwap" in info) {
      return Api().patch(`/task/${info.sourceSwap.id}`, {
        sourceSwap: info.sourceSwap,
        destSwap: info.destSwap,
      });
    }
  },
};
