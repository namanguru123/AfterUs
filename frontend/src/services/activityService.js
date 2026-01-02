import api from "../api/axios";

export const getActivityLogs = async () => {
  const res = await api.get("/activity");
  return res.data;
};
