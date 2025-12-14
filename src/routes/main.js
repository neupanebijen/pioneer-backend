import express from "express"
import { getCode, sendNewPassword, loginUser } from "../controllers/admin.js"

import {
  addEvent,
  uploadImage,
  addPackageImage,
  addTeamMember,
  addTestimonial,
  addUsefulInformation,
  createPackage,
  editContacts,
  editEvent,
  editPackage,
  addPage,
  editPage,
  getAPage,
  editTeamMember,
  editTestimonial,
  editUsefulInformation,
  getAllPackage,
  getPackage,
  getAllPage,
  removeEvent,
  removePackage,
  removePackageImage,
  removeTeamMember,
  removeTestimonial,
  removeUsefulInformation,
  searchPackage,
  getAllTeamMembers,
  getTeamMember,
  getAllTestimonials,
  getAllEvents,
  getEvent,
  getContacts,
  getUsefulInformation,
} from "../controllers/io.js"

const router = express.Router()

router.get("/testRouter", (req, res) => {
  res.json({ sucess: "true" })
})

router.post("/createPackage", createPackage)
router.post("/getAllPackage", getAllPackage)
router.post("/getPackage", getPackage)
router.post("/editPackage", editPackage)
router.post("/removePackage", removePackage)
router.post("/searchPackage", searchPackage)
router.post("/addPackageImage", uploadImage, addPackageImage)
router.post("/removePackageImage", removePackageImage)
router.post("/createPackage", createPackage)
router.post("/addPage", addPage)
router.post("/editPage", editPage)
router.post("/getAPage", getAPage)
router.post("/getAllPage", getAllPage)
router.post("/addTeamMember", addTeamMember)
router.post("/getAllTeamMembers", getAllTeamMembers)
router.post("/getTeamMember", getTeamMember)
router.post("/editTeamMember", editTeamMember)
router.post("/removeTeamMember", removeTeamMember)
router.post("/addTestimonial", addTestimonial)
router.post("/getAllTestimonials", getAllTestimonials)
router.post("/editTestimonial", editTestimonial)
router.post("/removeTestimonial", removeTestimonial)
router.post("/addEvent", addEvent)
router.post("/getAllEvents", getAllEvents)
router.post("/getEvent", getEvent)
router.post("/editEvent", editEvent)
router.post("/removeEvent", removeEvent)
router.post("/editContacts", editContacts)
router.post("/getContacts", getContacts)
router.post("/addUsefulInformation", addUsefulInformation)
router.post("/getUsefulInformation", getUsefulInformation)
router.post("/editUsefulInformation", editUsefulInformation)
router.post("/removeUsefulInformation", removeUsefulInformation)
router.post("/loginUser", loginUser)
router.post("/getCode", getCode)
router.post("/sendNewPassword", sendNewPassword)

export default router
