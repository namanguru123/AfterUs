import TrustedPerson from "../models/TrustedPerson.js";
import { logActivity } from "../utils/activityLogger.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

export const addTrustedPerson = async (req, res) => {
  try {
    const { name, email, relation } = req.body;

    if (!name || !email || !relation) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const person = await TrustedPerson.create({
      owner: req.user.id,
      name,
      email,
      relation,
      verificationToken,
      verificationExpires: Date.now() + 24 * 60 * 60 * 1000,
    });

    await logActivity(req.user.id, {
      type: "TRUSTED_PERSON_ADDED",
      title: "Trusted person added",
      description: `${name} added as trusted person`,
    });

    const verifyUrl = `${process.env.BACKEND_URL}/api/trusted-people/verify?token=${verificationToken}`;

    try {
      await sendEmail({
        to: email,
        subject: "Verify your access on AfterUs",
        html: `
          <p>You have been added as a trusted person on <strong>AfterUs</strong>.</p>
          <p>Please verify your email by clicking the link below:</p>
          <a href="${verifyUrl}">${verifyUrl}</a>
          <p>This link will expire in 24 hours.</p>
        `,
      });
    } catch (emailError) {
      console.error("EMAIL SEND FAILED:", emailError);
    }

    return res.status(201).json(person);
  } catch (err) {
    console.error("ADD TRUSTED PERSON ERROR:", err);
    return res.status(500).json({ message: "Failed to add trusted person" });
  }
};

export const getTrustedPeople = async (req, res) => {
  try {
    const people = await TrustedPerson.find({
      owner: req.user.id,
      isDeleted: false,
    }).sort({ createdAt: -1 });

    return res.json(people);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch trusted people" });
  }
};

export const deleteTrustedPerson = async (req, res) => {
  try {
    const person = await TrustedPerson.findOne({
      _id: req.params.id,
      owner: req.user.id,
      isDeleted: false,
    });

    if (!person) {
      return res.status(404).json({ message: "Trusted person not found" });
    }

    person.isDeleted = true;
    await person.save();

    await logActivity(req.user.id, {
      type: "TRUSTED_PERSON_REMOVED",
      title: "Trusted person removed",
      description: `${person.name} removed from trusted people`,
    });

    return res.json({ message: "Trusted person removed" });
  } catch (err) {
    return res.status(500).json({ message: "Delete failed" });
  }
};

export const verifyTrustedPersonByToken = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).send("Invalid verification link");
    }

    const person = await TrustedPerson.findOne({
      verificationToken: token,
      verificationExpires: { $gt: Date.now() },
      isDeleted: false,
    });

    if (!person) {
      return res.status(400).send("Verification link expired or invalid");
    }

    person.status = "VERIFIED";
    person.verificationToken = null;
    person.verificationExpires = null;

    await person.save();

    await logActivity(person.owner, {
      type: "TRUSTED_PERSON_VERIFIED",
      title: "Trusted person verified",
      description: `${person.name} verified their access`,
    });

    return res.redirect(`${process.env.FRONTEND_URL}/dashboard/people`);
  } catch (err) {
    console.error("VERIFY TRUSTED PERSON ERROR:", err);
    return res.status(500).send("Verification failed");
  }
};
