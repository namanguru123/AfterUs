import mongoose from "mongoose";
import AccessRule from "../models/AccessRule.js";

export const getSharedWithMe = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const rules = await AccessRule.find({
      trustedContact: userId,
      status: "ACTIVE",
      isRevoked: false,
    }).populate("asset")
    .populate("owner", "fullName email");

    const assets = rules
      .filter(rule => rule.asset)
      .map(rule => ({
        accessRuleId: rule._id,
        assetId: rule.asset._id,
        title: rule.asset.title,
        description: rule.asset.description,
        createdAt: rule.asset.createdAt,
        owner: {
          id: rule.owner._id,
          name: rule.owner.fullName,
          email: rule.owner.email
        }
      }));

    return res.json(assets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to load shared assets" });
  }
};

export const getSharedAssetByRule = async (req, res) => {
  try {
    const { id } = req.params;

    const rule = await AccessRule.findOne({
      _id: id,
      trustedContact: req.user.id,
      status: "ACTIVE",
      isRevoked: false,
    }).populate("asset")
    .populate("owner", "fullName email");

    if (!rule || !rule.asset) {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.json({
      asset: {
        _id: rule.asset._id,
        title: rule.asset.title,
        type: rule.asset.assetType,
        createdAt: rule.asset.createdAt,
        owner: {
          id: rule.owner._id,
          name: rule.owner.fullName,
          email: rule.owner.email
        }
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch asset" });
  }
};
