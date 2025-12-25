import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { generateToken } from '../utils/token.js'

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields required' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword
    })

    return res.status(201).json({
      message: 'User registered successfully'
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = generateToken(user._id)

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email
      }
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}


export const getMe = async (req, res) => {
  return res.status(200).json(req.user)
}
