import axios from "axios";

export default () => {
  return axios.create({
    baseURL: "https://misket.herokuapp.com/api/",
  });
};
