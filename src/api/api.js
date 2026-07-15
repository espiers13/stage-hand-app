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
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const fetchSchedule = (token) => {
  return stagehandApi
    .get("/users/me/schedule", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const fetchCompanyMembers = (token, productionId) => {
  return stagehandApi
    .get(`/productions/${productionId}/members`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const fetchRehearsalsByProduction = (token, productionId) => {
  return stagehandApi
    .get(`productions/${productionId}/rehearsals`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const fetchProductionById = (token, id) => {
  return stagehandApi
    .get(`/productions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const fetchUsernameById = (id) => {
  return stagehandApi
    .get(`/username/${id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const createNewRehearsal = (rehearsal, productionId, token) => {
  return stagehandApi
    .post(`/productions/${productionId}/rehearsals`, rehearsal, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteRehearsal = (rehearsalId, productionId, token) => {
  return stagehandApi
    .delete(`productions/${productionId}/rehearsals/${rehearsalId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => {
      throw err;
    });
};

export const patchProduction = (productionId, updatedProduction, token) => {
  return stagehandApi
    .patch(`/productions/${productionId}`, updatedProduction, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};
