import { User } from "../models/index.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import sequelize from "../config/database.js";

const emailSender = "testjd485@gmail.com";
const emailPassword = "Test@123";

const createUser = async (req, res) => {
  let transaction;
  try {
    const { name, dateOfBirth, email, phoneNumber } = req.body;

    transaction = await sequelize.transaction();

    const user = await User.create(
      { name, dateOfBirth, email, phoneNumber },
      { transaction }
    );

    // Send email to the form submitter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: emailSender,
        pass: emailPassword,
      },
    });

    const mailOptions = {
      from: emailSender,
      to: email,
      subject: "Form Submission Confirmation",
      text: "Thank you for submitting the form!",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    await transaction.commit();

    res.json({ success: true, message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    res.status(500).json({ success: false, message: "Failed to create user" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ success: true, message: "Users fetched successfully", users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

export { createUser, getUsers };
