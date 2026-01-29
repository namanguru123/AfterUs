import AccessRule from "../models/AccessRule.js";
import DigitalAsset from "../models/DigitalAsset.js";
import TrustedPerson from "../models/TrustedPerson.js";
import ActivityLog from "../models/ActivityLog.js";
import { decrypt } from "../utils/decrypt.js";
import { decryptFileBuffer } from "../utils/fileCrypto.js";
import fs from "fs";
import path from "path";

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
      trustedContact: trustedPerson.userId,
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

    if (rule.revealCount >= 10) {
      return res.status(403).json({
        message: "Sensitive data already revealed",
      });
    }

    // Handle TEXT and LINK assets - reveal sensitive data
    if (asset.assetType === "TEXT" || asset.assetType === "LINK") {
      if (!asset.encryptedPayload?.text) {
        return res.status(400).json({ message: "No sensitive data available" });
      }

      const encrypted =
        typeof asset.encryptedPayload.text === "string"
          ? JSON.parse(asset.encryptedPayload.text)
          : asset.encryptedPayload.text;

      const value = decrypt(encrypted);

      rule.revealCount += 1;
      await rule.save();

      await ActivityLog.create({
        owner: trustedPerson.owner,
        action: "SENSITIVE_DATA_REVEALED",
        entityType: "ASSET",
        entityId: asset._id,
        message: `Sensitive data of "${asset.title}" was revealed to ${trustedPerson.name}`,
      });

      return res.json({ value });
    }

    // Handle PDF and IMAGE assets - return file info for download
    if (asset.assetType === "PDF" || asset.assetType === "IMAGE") {
      if (!asset.file || !asset.file.path) {
        return res.status(400).json({ message: "File not available" });
      }

      rule.revealCount += 1;
      await rule.save();

      await ActivityLog.create({
        owner: trustedPerson.owner,
        action: "SENSITIVE_DATA_REVEALED",
        entityType: "ASSET",
        entityId: asset._id,
        message: `File "${asset.title}" was accessed by ${trustedPerson.name}`,
      });

      // Return file info so frontend can download it
      return res.json({
        type: "FILE",
        assetType: asset.assetType,
        title: asset.title,
        mimeType: asset.file.mimeType,
      });
    }

    return res.status(400).json({ message: "Invalid asset type" });
  } catch (error) {
    console.error("REVEAL ERROR:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const downloadAssetForTrustedPerson = async (req, res) => {
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
      trustedContact: trustedPerson.userId,
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

    if (!["PDF", "IMAGE"].includes(asset.assetType)) {
      return res.status(400).json({ message: "Only PDF and IMAGE assets can be downloaded" });
    }

    if (!asset.file || !asset.file.path) {
      return res.status(404).json({ message: "File not found" });
    }

    const absolutePath = path.resolve(asset.file.path);

    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ message: "File missing on server" });
    }

    // Read encrypted file
    const encryptedBuffer = fs.readFileSync(absolutePath);

    // Decrypt the file buffer
    const decryptedBuffer = decryptFileBuffer({
      buffer: encryptedBuffer,
      iv: asset.file.iv,
      authTag: asset.file.authTag,
    });

    res.setHeader(
      "Content-Type",
      asset.file.mimeType || "application/octet-stream"
    );

    res.setHeader(
      "Content-Disposition",
      `inline; filename="${asset.file.originalName}"`
    );

    res.setHeader(
      "Access-Control-Expose-Headers",
      "Content-Type,Content-Disposition"
    );

    res.send(decryptedBuffer);
  } catch (error) {
    console.error("DOWNLOAD ERROR:", error);
    return res.status(500).json({ message: "Failed to download file" });
  }
};

