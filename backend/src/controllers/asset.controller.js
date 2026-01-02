import DigitalAsset from "../models/DigitalAsset.js";
import { encrypt } from "../utils/encrypt.js";
import { decrypt } from "../utils/decrypt.js";
import { logActivity } from "../utils/activityLogger.js";


export const createAsset = async (req, res) => {
  try {
    const { title, category, assetType, data } = req.body;

    if (!title || !category || !assetType || !data) {
      return res.status(400).json({
        message: "Title, category, asset type, and data are required",
      });
    }

    const encryptedData = encrypt(data);

    const asset = await DigitalAsset.create({
      owner: req.user.id,
      title,
      category,
      assetType,
      encryptedData,
    });

  
    await logActivity({
      owner: req.user.id,
      action: "ASSET_CREATED",
      entityType: "ASSET",
      entityId: asset._id,
      message: `Asset "${asset.title}" was created`,
    });

    return res.status(201).json({
      message: "Asset created securely",
      asset: {
        id: asset._id,
        title: asset.title,
        category: asset.category,
        assetType: asset.assetType,
        createdAt: asset.createdAt,
      },
    });
  } catch (error) {
    console.error("CREATE ASSET ERROR:", error);
    return res.status(500).json({
      message: "Failed to create asset",
    });
  }
};


export const getMyAssets = async (req, res) => {
  try {
    const assets = await DigitalAsset.find({
      owner: req.user.id,
      isDeleted: false,
    });

    const decryptedAssets = assets.map((asset) => ({
      id: asset._id,
      title: asset.title,
      category: asset.category,
      assetType: asset.assetType,
      data: decrypt(asset.encryptedData),
      createdAt: asset.createdAt,
    }));

    return res.status(200).json(decryptedAssets);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getAssetById = async (req, res) => {
  try {
    const asset = await DigitalAsset.findOne({
      _id: req.params.id,
      owner: req.user.id,
      isDeleted: false,
    });

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    return res.status(200).json({
      id: asset._id,
      title: asset.title,
      category: asset.category,
      assetType: asset.assetType,
      data: decrypt(asset.encryptedData),
      createdAt: asset.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const updateAsset = async (req, res) => {
  try {
    const { title, category, assetType, data } = req.body;

    const asset = await DigitalAsset.findOne({
      _id: req.params.id,
      owner: req.user.id,
      isDeleted: false,
    });

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    if (title) asset.title = title;
    if (category) asset.category = category;
    if (assetType) asset.assetType = assetType;
    if (data) asset.encryptedData = encrypt(data);

    await asset.save();


    await logActivity({
      owner: req.user.id,
      action: "ASSET_UPDATED",
      entityType: "ASSET",
      entityId: asset._id,
      message: `Asset "${asset.title}" was updated`,
    });

    return res.status(200).json({
      message: "Asset updated securely",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const deleteAsset = async (req, res) => {
  try {
    const asset = await DigitalAsset.findOne({
      _id: req.params.id,
      owner: req.user.id,
      isDeleted: false,
    });

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    asset.isDeleted = true;
    await asset.save();

    await logActivity({
      owner: req.user.id,
      action: "ASSET_DELETED",
      entityType: "ASSET",
      entityId: asset._id,
      message: `Asset "${asset.title}" was deleted`,
    });

    return res.status(200).json({
      message: "Asset deleted (soft)",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
