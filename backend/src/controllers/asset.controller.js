import DigitalAsset from "../models/DigitalAsset.js";
import { encrypt } from "../utils/encrypt.js";
import { decrypt } from "../utils/decrypt.js";
import { logActivity } from "../utils/activityLogger.js";
import { encryptFileBuffer, decryptFileBuffer } from "../utils/fileCrypto.js";
import fs from "fs";
import path from "path";
import User from "../models/User.js";


/**
 * CREATE ASSET (UNLINKED / LOCKED)
 */
export const createAsset = async (req, res) => {
  try {
    

    

    if (!req.user.isPremium && req.user.assetCount >= 3) {
      return res.status(403).json({
        message: "You have reached the limit of 3 assets. Please upgrade to Premium to create more.",
      });
    }



    const { title, category, assetType, data } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    // 1️⃣ Basic validation
    if (!title || !category || !assetType) {
      return res.status(400).json({
        message: "title, category and assetType are required",
      });
    }

    // 2️⃣ Allowed asset types
    const ALLOWED_TYPES = ["TEXT", "LINK", "PDF", "IMAGE"];
    if (!ALLOWED_TYPES.includes(assetType)) {
      return res.status(400).json({
        message: "Invalid assetType",
      });
    }

    // 3️⃣ FILE ASSETS (PDF / IMAGE)
    if (assetType === "PDF" || assetType === "IMAGE") {
      if (!req.file) {
        return res.status(400).json({
          message: "File is required for PDF or IMAGE assets",
        });
      }

      // 🔐 read uploaded file
      const fileBuffer = fs.readFileSync(req.file.path);

      // 🔐 encrypt file buffer
      const {
        encryptedBuffer,
        iv,
        authTag,
        algorithm,
      } = encryptFileBuffer(fileBuffer);

      // 🔥 overwrite file with encrypted content
      fs.writeFileSync(req.file.path, encryptedBuffer);

      const asset = await DigitalAsset.create({
        owner: userId,
        title,
        category,
        assetType,
        isEncrypted: true,
        file: {
          path: req.file.path,
          originalName: req.file.originalname,
          mimeType: req.file.mimetype,
          size: req.file.size,
          iv,
          authTag,
          algorithm,
        },
      });

      user.assetCount += 1;
      await user.save();

      await logActivity({
        owner: req.user.id,
        action: "ASSET_CREATED",
        entityType: "ASSET",
        entityId: asset.id,
        message: "Digital asset created",
      });


      return res.status(201).json(asset);
    }

    // 4️⃣ TEXT / LINK ASSETS
    if (!data) {
      return res.status(400).json({
        message: "Sensitive data is required for TEXT or LINK assets",
      });
    }

    const encryptedData = encrypt(data);

    const asset = await DigitalAsset.create({
      owner: userId,
      title,
      category,
      assetType,
      isEncrypted: true,
      encryptedPayload: {
        text: JSON.stringify(encryptedData),
      },
    });

    user.assetCount += 1;
    await user.save();

    await logActivity({
        owner: req.user.id,
        action: "ASSET_CREATED",
        entityType: "ASSET",
        entityId: asset.id,
        message: "Digital asset created",
      });


    return res.status(201).json(asset);
  
  } catch (error) {
    console.error("Create Asset Error:", error);
    return res.status(500).json({
      message: "Failed to create asset",
    });
  }
};






/**
 * GET ALL MY ASSETS (SAFE RESPONSE)
 */
export const getMyAssets = async (req, res) => {
  try {
    const assets = await DigitalAsset.find({
      owner: req.user.id,
      isDeleted: false,
    }).sort({ createdAt: -1 });

    const response = assets.map((asset) => {

      let data = null;

        if (
              (asset.assetType === "TEXT" || asset.assetType === "LINK") &&
              asset.encryptedPayload?.text
            ) {
              const encrypted =
                typeof asset.encryptedPayload.text === "string"
                  ? JSON.parse(asset.encryptedPayload.text)
                  : asset.encryptedPayload.text;

              data = decrypt(encrypted);
            }


      return {
        id: asset._id,
        title: asset.title,
        category: asset.category,
        assetType: asset.assetType,
        data, // null for non-TEXT assets
        hasFile:
          asset.assetType === "PDF" || asset.assetType === "IMAGE",
        createdAt: asset.createdAt,
        condition: asset.condition,
      };
    });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * GET SINGLE ASSET BY ID (OWNER ONLY)
 */
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

    let data = null;

    if (
        (asset.assetType === "TEXT" || asset.assetType === "LINK") &&
        asset.encryptedPayload?.text
      ) {
        const encrypted =
          typeof asset.encryptedPayload.text === "string"
            ? JSON.parse(asset.encryptedPayload.text)
            : asset.encryptedPayload.text;

        data = decrypt(encrypted);
      }

    return res.status(200).json({
      id: asset._id,
      title: asset.title,
      category: asset.category,
      assetType: asset.assetType,
      data,
      createdAt: asset.createdAt,
      condition: asset.condition,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// export const getAssetFile = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     const asset = await DigitalAsset.findOne({
//       _id: id,
//       owner: userId,
//       isDeleted: false,
//     });

//     if (!asset) {
//       return res.status(404).json({ message: "Asset not found" });
//     }

//     if (!["PDF", "IMAGE"].includes(asset.assetType)) {
//       return res.status(400).json({
//         message: "This asset does not contain a file",
//       });
//     }

//     const filePath = asset.encryptedPayload?.file?.path;

//     if (!filePath || !fs.existsSync(filePath)) {
//       return res.status(404).json({
//         message: "File not found on server",
//       });
//     }

//     res.setHeader(
//       "Content-Type",
//       asset.encryptedPayload.file.mimeType
//     );

//     res.setHeader(
//       "Content-Disposition",
//       asset.assetType === "PDF"
//         ? "inline"
//         : "inline"
//     );

//     const fileStream = fs.createReadStream(filePath);
//     fileStream.pipe(res);
//   } catch (error) {
//     console.error("Get Asset File Error:", error);
//     res.status(500).json({ message: "Failed to fetch file" });
//   }
// };

export const getAssetFile = async (req, res) => {
  const asset = await DigitalAsset.findOne({
    _id: req.params.id,
    owner: req.user.id,
    isDeleted: false,
  });

  if (!asset || !asset.file?.path) {
    return res.status(404).json({ message: "File not found" });
  }

  const absolutePath = path.resolve(asset.file.path);

  if (!fs.existsSync(absolutePath)) {
    return res.status(404).json({ message: "File missing on server" });
  }

  // 🔐 read encrypted file
  const encryptedBuffer = fs.readFileSync(absolutePath);

  // 🔓 decrypt
  const decryptedBuffer = decryptFileBuffer({
    buffer: encryptedBuffer,
    iv: asset.file.iv,
    authTag: asset.file.authTag,
  });

  res.setHeader("Content-Type", asset.file.mimeType);
  res.setHeader(
    "Content-Disposition",
    `inline; filename="${asset.file.originalName}"`
  );

  res.send(decryptedBuffer);
};

/**
 * UPDATE ASSET METADATA OR TEXT CONTENT
 */
export const updateAsset = async (req, res) => {
  try {
    const { title, category, data } = req.body;

    const asset = await DigitalAsset.findOne({
      _id: req.params.id,
      owner: req.user.id,
      isDeleted: false,
    });

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    // Prevent updates after condition trigger (future safety)
    if (asset.condition) {
      // Optional: block updates once condition is linked
      // return res.status(400).json({ message: "Linked asset cannot be edited" });
    }

    if (title) asset.title = title;
    if (category) asset.category = category;

    // Only TEXT assets can update encrypted text
    if (asset.assetType === "TEXT" && data) {
      asset.encryptedPayload.text = encrypt(data);
    }

    await asset.save();

    await logActivity({
      owner: req.user.id,
      action: "ASSET_UPDATED",
      entityType: "ASSET",
      entityId: asset._id,
      message: `Asset "${asset.title}" was updated`,
    });

    return res.status(200).json({
      message: "Asset updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * SOFT DELETE ASSET
 */
export const deleteAsset = async (req, res) => {
  try {
    const asset = await DigitalAsset.findOne({
      _id: req.params.id,
      owner: req.user.id,
      isDeleted: false,
    });

    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    asset.isDeleted = true;
    await asset.save();

    user.assetCount -= 1;
    await user.save();

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
