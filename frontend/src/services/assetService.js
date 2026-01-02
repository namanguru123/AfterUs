import api from "./api";

// Create asset
export const createAsset = async (assetData) => {
  const res = await api.post("/assets", assetData);
  return res.data;
};

// Get assets
export const getAssets = async () => {
  const res = await api.get("/assets");
  return res.data;
};


export const getAssetById = async (id) => {
  const res = await api.get(`/assets/${id}`);
  return res.data;
};

export const updateAsset = async (id, assetData) => {
  const res = await api.put(`/assets/${id}`, assetData);
  return res.data;
};


export const deleteAsset = async (id) => {
  await api.delete(`/assets/${id}`);
};
