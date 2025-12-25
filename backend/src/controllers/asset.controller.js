import DigitalAsset from '../models/DigitalAsset.js'
import { encrypt } from '../utils/encrypt.js'
import { decrypt } from '../utils/decrypt.js'

// Create Asset
export const createAsset = async (req, res) => {
  try {
    const { title, data } = req.body

    if (!title || !data) {
      return res.status(400).json({ message: 'Title and data required' })
    }

    const encryptedData = encrypt(data)

    const asset = await DigitalAsset.create({
      owner: req.user.id,
      title,
      encryptedData
    })

    return res.status(201).json({
      message: 'Asset created securely',
      assetId: asset._id
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Get All Assets
export const getMyAssets = async (req, res) => {
  try {
    const assets = await DigitalAsset.find({
      owner: req.user.id,
      isDeleted: false
    })

    const decryptedAssets = assets.map(asset => ({
      id: asset._id,
      title: asset.title,
      data: decrypt(asset.encryptedData),
      createdAt: asset.createdAt
    }))

    return res.status(200).json(decryptedAssets)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Get Single Asset by ID
export const getAssetById = async (req, res) => {
  try {
    const asset = await DigitalAsset.findOne({
      _id: req.params.id,
      owner: req.user.id,
      isDeleted: false
    })

    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' })
    }

    return res.status(200).json({
      id: asset._id,
      title: asset.title,
      data: decrypt(asset.encryptedData),
      createdAt: asset.createdAt
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Update Asset
export const updateAsset = async (req, res) => {
  try {
    const { title, data } = req.body

    const asset = await DigitalAsset.findOne({
      _id: req.params.id,
      owner: req.user.id,
      isDeleted: false
    })

    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' })
    }

    if (title) asset.title = title
    if (data) asset.encryptedData = encrypt(data)

    await asset.save()

    return res.status(200).json({
      message: 'Asset updated securely'
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Delete Asset
export const deleteAsset = async (req, res) => {
  try {
    const asset = await DigitalAsset.findOne({
      _id: req.params.id,
      owner: req.user.id,
      isDeleted: false
    })

    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' })
    }

    asset.isDeleted = true
    await asset.save()

    return res.status(200).json({
      message: 'Asset deleted (soft)'
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
