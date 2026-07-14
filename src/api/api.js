import axios from "axios";

const stagehandApi = axios.create({
  baseURL: "https://stagehand-be.onrender.com/api",
});

export const loginUser = (email, password) => {
  const user = { email: email, password: password };
  return stagehandApi
    .post("/login", user)
    .then(({ data }) => data)
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const fetchProductions = (token) => {
  return stagehandApi
    .get("/user/productions", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data)
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
