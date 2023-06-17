const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const sequelize = require("../config/database.js");
const User = require("../models/User.js");

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

    let testAccount = await nodemailer.createTestAccount();
    // Send email to the form submitter
    // const transporter = await nodemailer.createTransport({
    //   service: "Gmail",
    //   auth: {
    //     user: emailSender,
    //     pass: emailPassword,
    //   },
    // });

    let transporter = await nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "heaven.olson98@ethereal.email", // ethereal generated
        pass: "8fye7VAVfqT7bTFNtw", // ethereal generated
      },
    });

    const mailOptions = {
      from: '"Register Form "<testForm@testAccount.com>',
      to: email,
      subject: "Form Submission Confirmation",
      text: "Thank you for submitting the form!",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error in sending email  " + error);
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

module.exports = { createUser, getUsers };
