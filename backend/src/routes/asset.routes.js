import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import {
  createAsset,
  getMyAssets,
  getAssetById,
  updateAsset,
  deleteAsset
} from '../controllers/asset.controller.js'

const router = express.Router()

router.post('/', authMiddleware, createAsset)
router.get('/', authMiddleware, getMyAssets)
router.get('/:id', authMiddleware, getAssetById)
router.put('/:id', authMiddleware, updateAsset)
router.delete('/:id', authMiddleware, deleteAsset)

export default router
