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

export const getConditionById = async (id) => {
  const res = await api.get(`/conditions/${id}`);
  return res.data;
};


export const updateConditionAssets = async (id, assets) => {
  const res = await api.patch(`/conditions/${id}/assets`, {
    assets,
  });
  return res.data;
};


export const updateConditionTrustedPeople = (conditionId, trustedPeople) => {
  return api.patch(`/conditions/${conditionId}/trusted-people`, {
    trustedPeople,
  });
};
