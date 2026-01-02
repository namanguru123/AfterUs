import api from "../api/axios";

export const getConditions = async () => {
  const res = await api.get("/conditions");
  return res.data;
};


export const createInactivityCondition = (days) => {
  return api.post("/conditions", {
    type: "INACTIVITY",
    config: {
      inactivityDays: Number(days),
    },
  });
};

export const toggleCondition = async (id) => {
  const res = await api.patch(`/conditions/${id}/toggle`);
  return res.data;
};

export const deleteCondition = async (id) => {
  const res = await api.delete(`/conditions/${id}`);
  return res.data;
};
