const express = require("express");
let router = express.Router();
require("dotenv").config();
const { User } = require("../../models/User-model.js");
const { grantAccess } = require("../../middelware/roles");
const {CheckUserExist} = require("../../middelware/auth")

router.route("/").get(async (req, res) => {
  res.send("hi");
});

router.route("/register").post(async (req, res) => {
  try {
    if (await User.emailTaken(req.body.email)) {
      return res.status(400).json({ message: "Sorry email taken" }); //if email taken kill the process with this return
    }
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
    });

    const token = user.GenerateToken();
    const doc = await user.save();

    console.log(doc);
    res
      .cookie("x-access-token", token)
      .status(200)
      .send({
        email: doc.email,
        username: doc.firstname + " " + doc.lastname,
        firstname: doc.firstname,
        lastname: doc.lastname,
        role: doc.role,
        age: doc.age,
        id : doc._id

      });
  } catch (error) {
    res.status(400).json({
      message: "error here",
      error,
    });
  }
});

router.route("/signin").post(async (req, res) => {
  try {
    //first check email
    let user = await User.findOne({ email: req.body.email });
    //if email exist compare password then add token
    if (!user) {
      return res
        .status(400)
        .json({ message: "enter a valid email or signUp first " });
    }
    const compare = await user.deCryptPassword(req.body.password);
    if (!compare) {  return res
        .status(400)
        .json({ message: "password not valid for this email " }); }//return to kill the process else generate token

    //generte token
    const token = user.GenerateToken();

    //response
    res
      .cookie("x-access-token", token)
      .status(200)
      .send({
        email: user.email,
        username: user.firstname + " " + user.lastname,
        firstname: user.firstname,
        lastname: user.lastname,
        age: user.age,
        role: user.role,
        id : user._id

      });
  } catch (error) {
    res.status(400).json({ message: "Error", error: error });

  }
});


router.route('/isauthed') //in the front end we will pass a header token to check user authed or not
.get(CheckUserExist, grantAccess("updateOwn", "profile") , async (req,res) =>{
    res.status(200).json({
      email : req.user.email,
      firstname : req.user.firstname,
      lastname : req.user.lastname,
      age : req.user.age,
      role : req.user.role,
      id : req.user._id
    })
})

module.exports = router;
