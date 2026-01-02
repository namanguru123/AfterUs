import api from "../api/axios";

export const getDashboardSummary = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/dashboard/summary", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
