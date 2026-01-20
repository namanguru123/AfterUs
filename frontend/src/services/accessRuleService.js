import api from "./api";

export const getSharedWithMe = async () => {
  const res = await api.get("/access-rules/shared-with-me");
  return res.data;
};


export const getSharedAssetByRule = async (ruleId) => {
  const res = await api.get(`/access-rules/${ruleId}/asset`);
  return res.data;
};
