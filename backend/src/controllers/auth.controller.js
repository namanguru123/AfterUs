import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { generateToken } from '../utils/token.js'
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";




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

   

    const verificationToken = crypto.randomBytes(32).toString("hex");

    user.emailVerificationToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24h

    await user.save();
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

    await sendEmail({
        to: user.email,
        subject: "Verify your AfterUs account",
        html: `
          <h2>Welcome to AfterUs</h2>
          <p>Please verify your email to activate your account.</p>
          <a href="${verificationUrl}">Verify Email</a>
          <p>This link expires in 24 hours.</p>
        `,
    });


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

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in",
      });
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



export const verifyEmail = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired verification link",
      });
    }

    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Email verification failed",
    });
  }
};

export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Account is already verified",
      });
    }

    // Generate new token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    user.emailVerificationToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

    await sendEmail({
      to: user.email,
      subject: "Verify your AfterUs account",
      html: `
        <h2>Verify your email</h2>
        <p>Please click the link below to verify your account:</p>
        <a href="${verifyUrl}">Verify Email</a>
        <p>This link expires in 24 hours.</p>
      `,
    });

    res.status(200).json({
      message: "Verification email resent",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to resend verification email",
    });
  }
};
