import api from "../api/axios";

export const getTrustedPeople = async () => {
  const res = await api.get("/trusted-people");
  return res.data;
};

export const addTrustedPerson = async (data) => {
  const res = await api.post("/trusted-people", data);
  return res.data;
};

export const verifyTrustedPerson = async (id) => {
  const res = await api.put(`/trusted-people/${id}/verify`);
  return res.data;
};

export const deleteTrustedPerson = async (id) => {
  const res = await api.delete(`/trusted-people/${id}`);
  return res.data;
};
