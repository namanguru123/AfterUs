import AccessRule from "../models/AccessRule.js";
import DigitalAsset from "../models/DigitalAsset.js";
import TrustedPerson from "../models/TrustedPerson.js";
import ActivityLog from "../models/ActivityLog.js";
import { decrypt } from "../utils/decrypt.js";

export const revealSensitiveData = async (req, res) => {
  try {
    const { assetId } = req.params;

    const trustedPerson = await TrustedPerson.findOne({
      email: req.user.email,
      status: "VERIFIED",
      isDeleted: false,
    });

    if (!trustedPerson) {
      return res.status(403).json({ message: "Not a trusted person" });
    }

    const rule = await AccessRule.findOne({
      asset: assetId,
      trustedContact: trustedPerson.userId, // ← your confirmed fix
      status: "ACTIVE",
      isRevoked: false,
    });

    if (!rule) {
      return res.status(403).json({ message: "Access denied" });
    }

    const asset = await DigitalAsset.findById(assetId);
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    if (typeof rule.revealCount !== "number") {
      rule.revealCount = 0;
    }


    if (rule.revealCount >= 3) {
      return res.status(403).json({
        message: "Sensitive data already revealed",
      });
    }


    const value = decrypt(asset.encryptedData);

    rule.revealCount += 1;
    await rule.save();


    await ActivityLog.create({
      owner: trustedPerson.owner,          
      action: "SENSITIVE_DATA_REVEALED",
      entityType: "ASSET",
      entityId: asset._id,
      message: `Sensitive data of "${asset.title}" was revealed to ${trustedPerson.name} under condition "${rule.condition.type}"`,

    });


    return res.json({ value });
  } catch (error) {
    console.error("REVEAL ERROR:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

