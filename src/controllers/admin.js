import nodemailer from "nodemailer"
import User from "../models/user.js"
import "dotenv/config"

export const getCode = async (req, res) => {
  const code = Math.floor(Math.random() * 10000)

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_AUTH,
      pass: process.env.USER_PASSWORD,
    },
  })

  transporter.verify().then(console.log).catch(console.error)

  var mailOptions = {
    from: process.env.USER_AUTH,
    to: process.env.USER_AUTH,
    subject: "Password Reset Email",
    text: `Password reset code is : ${code}`,
  }

  transporter.sendMail(mailOptions, async function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent: " + info.response)
      const result = await User.findOne()
      console.log(result)
      const result2 = await User.updateOne({
        name: result.name,
        password: result.password,
        code: code,
      })
      console.log(result2)
      res.status(200).json({ success: true })
    }
  })
}

export const loginUser = async (req, res) => {
  const { username, password } = req.body

  try {
    const result = await User.findOne()
    if (result.name === username && result.password === password) {
      res.json({ success: true })
    } else {
      res.json({ success: false })
    }
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const sendNewPassword = async (req, res) => {
  const { newPassword, code } = req.body
  try {
    const result = await User.findOne()

    if (result.code === code) {
      const result2 = await User.updateOne({
        name: result.name,
        password: newPassword,
        code: 98989,
      })

      res.json({ success: true, result: result2 })
    }
  } catch (e) {
    console.log(e.toString())
    req.json({ success: false, error: e.toString() })
  }
}
