import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import {
  createAsset,
  getMyAssets,
  getAssetById,
  getAssetFile,
  updateAsset,
  deleteAsset
} from '../controllers/asset.controller.js'


import { upload } from "../utils/fileupload.js";




const router = express.Router()

router.post(
  "/",
  authMiddleware,
  upload.single("file"), // multer always present
  createAsset
);


router.get('/', authMiddleware, getMyAssets)


router.get(
  "/:id/file",
  authMiddleware,
  getAssetFile
);


router.get('/:id', authMiddleware, getAssetById)
router.put('/:id', authMiddleware, updateAsset)
router.delete('/:id', authMiddleware, deleteAsset)

export default router
