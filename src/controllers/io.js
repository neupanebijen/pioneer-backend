import mongoose from "mongoose"

import Extra from "../models/extra.js"
import Package from "../models/package.js"
import Page from "../models/page.js"
import Team from "../models/team.js"
import Event from "../models/event.js"
import Testimonial from "../models/testimonial.js"
import multer from "multer"
import { v4 as uuidv4 } from "uuid"
import fs from "fs"

import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = __filename

const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + "/../../../uploads/")
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split("/")[1]
    callback(null, `${uuidv4()}.${ext}`)
  },
})

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true)
  } else {
    callback(new Error("Only Image is Allowed .. "))
  }
}

const upload = multer({
  storage: multerConfig,
  fileFilter: isImage,
})

export const uploadImage = upload.single("photo")

export const createPackage = async (req, res) => {
  const { data } = req.body

  try {
    const result = await Package.create(data)

    console.log(result)
    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const getAllPackage = async (req, res) => {
  try {
    const result = await Package.find({})

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

// export const getPackage = async (req, res) => {
//   const { packageId } = req.body

//   const condition = {
//     _id: mongoose.Types.ObjectId(packageId),
//   }

//   try {
//     const result = await Package.findOne(condition)

//     res.json({ success: true, result: result })
//   } catch (e) {
//     console.log(e.toString())
//     res.json({ success: false, error: e.toString() })
//   }
// }

// Passing the route from the front-end
export const getPackage = async (req, res) => {
  const { name } = req.body

  const condition = {
    route: name,
  }

  try {
    const result = await Package.findOne(condition)

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const editPackage = async (req, res) => {
  const { packageData } = req.body

  const condition = {
    _id: mongoose.Types.ObjectId(packageData._id),
  }

  const updatedData = packageData

  try {
    const oldResult = await Package.findOne(condition)

    const result = await Package.updateOne(condition, updatedData)
    if (result) {
      oldResult.image.forEach((value) => {
        if (!packageData.image.includes(value)) {
          fs.unlinkSync(`./uploads/${value}`, (err) => {
            if (err) throw err
          })
        }
      })
    }
    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const removePackage = async (req, res) => {
  const { packageId } = req.body

  const condition = {
    _id: mongoose.Types.ObjectId(packageId),
  }
  try {
    const oldResult = await Package.findOne(condition)

    const result = await Package.remove(condition)

    if (result) {
      oldResult.image.forEach((value) => {
        fs.unlinkSync(`./uploads/${value}`, (err) => {
          if (err) throw err
        })
      })
    }

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

// To be coded later
export const searchPackage = async (req, res) => {
  const { data } = req.body

  try {
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const addPackageImage = async (req, res) => {
  res.json({ success: true, filename: req.file.filename })
}

// To be coded later
export const removePackageImage = async (req, res) => {
  const { data } = req.body

  try {
    data.image.forEach((value) => {
      fs.unlinkSync(`./uploads/${value}`, (err) => {
        if (err) throw err

        console.log("file is deleted")
      })
    })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const addPage = async (req, res) => {
  const { pageData } = req.body

  try {
    const result = await Page.create(pageData)

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const editPage = async (req, res) => {
  const { pageData } = req.body

  const condition = {
    _id: mongoose.Types.ObjectId(pageData._id),
  }

  try {
    const result = await Page.updateOne(condition, pageData)

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const getAllPage = async (req, res) => {
  try {
    console.log("trigger")
    const result = await Page.find()

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString)
    res.json({ success: false, error: e.toString() })
  }
}

export const getAPage = async (req, res) => {
  const condition = {
    name: req.body.name,
  }

  try {
    const result = await Page.findOne(condition)

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e)
    res.json({ success: false, error: e.toString() })
  }
}

export const addTeamMember = async (req, res) => {
  const { memberData } = req.body

  try {
    const result = await Team.create(memberData)

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const getAllTeamMembers = async (req, res) => {
  try {
    const result = await Team.find()

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const getTeamMember = async (req, res) => {
  const { memberId } = req.body

  const condition = {
    _id: mongoose.Types.ObjectId(memberId),
  }

  try {
    const result = await Team.findOne(condition)

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const editTeamMember = async (req, res) => {
  const { memberData } = req.body
  console.log(memberData)

  const condition = {
    _id: mongoose.Types.ObjectId(memberData._id),
  }

  try {
    // const findResult = await Team.find(condition)

    // if (findResult.data.image !== memberData.image) {
    //   fs.unlinkSync(`./uploads/${findResult.data.image}`, (err) => {
    //     if (err) throw err

    //     console.log("file is deleted")
    //   })
    // }

    const result = await Team.updateOne(condition, memberData)

    res.json({ success: true, data: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const removeTeamMember = async (req, res) => {
  const { data } = req.body

  const condition = {
    _id: mongoose.Types.ObjectId(data._id),
  }

  try {
    const result = await Team.remove(condition)

    fs.unlinkSync(`./uploads/${data.image}`, (err) => {
      if (err) throw err

      console.log("file is deleted")
    })

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const addTestimonial = async (req, res) => {
  const { testimonial } = req.body

  try {
    const result = await Testimonial.create(testimonial)

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const getAllTestimonials = async (req, res) => {
  try {
    const result = await Testimonial.find()

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString)
    res.json({ success: false, error: e.toString() })
  }
}

export const editTestimonial = async (req, res) => {
  const { testimonial } = req.body

  const condition = {
    _id: mongoose.Types.ObjectId(testimonial._id),
  }

  try {
    const result = await Testimonial(condition, testimonial)

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const removeTestimonial = async (req, res) => {
  const { testimonialId } = req.body

  const condition = {
    _id: mongoose.Types.ObjectId(testimonialId),
  }

  try {
    const result = await Testimonial.remove(condition)

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const addEvent = async (req, res) => {
  const { event } = req.body

  try {
    const result = await Event.create(event)

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const getAllEvents = async (req, res) => {
  try {
    const result = await Event.find({})

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const getEvent = async (req, res) => {
  const { eventId } = req.body
  const condition = {
    _id: mongoose.Types.ObjectId(eventId),
  }

  try {
    const result = await Event.findOne(condition)

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ successs: false, error: e.toString() })
  }
}

export const editEvent = async (req, res) => {
  const { event } = req.body
  console.log("This is called: ", event)
  const condition = {
    _id: mongoose.Types.ObjectId(event._id),
  }

  try {
    const result = await Event.update(condition, event)

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const removeEvent = async (req, res) => {
  const { eventId } = req.body

  const condition = {
    _id: mongoose.Types.ObjectId(eventId),
  }

  try {
    const result = await Event.remove(condition)

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const editContacts = async (req, res) => {
  const { extra } = req.body

  const condition = {
    _id: mongoose.Types.ObjectId(extra._id),
  }

  try {
    const result = await Extra.updateOne(condition, extra)

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const getContacts = async (req, res) => {
  try {
    const result = await Extra.find()

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const addUsefulInformation = async (req, res) => {
  const { extra } = req.body

  const condition = {
    _id: mongoose.Types.ObjectId(extra._id),
  }

  try {
    const result = await Extra.updateOne(condition, extra)

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const getUsefulInformation = async (req, res) => {
  try {
    const result = await Extra.find()

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const editUsefulInformation = async (req, res) => {
  const { extra } = req.body

  const condition = {
    _id: mongoose.Types.ObjectId(extra._id),
  }

  try {
    const result = await Extra.updateOne(condition, extra)

    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}

export const removeUsefulInformation = async (req, res) => {
  const { extra } = req.body

  const condition = {
    _id: mongoose.Types.ObjectId(extra._id),
  }

  try {
    const result = await Extra.updateOne(condition, extra)
    res.json({ success: true, result: result })
  } catch (e) {
    console.log(e.toString())
    res.json({ success: false, error: e.toString() })
  }
}
