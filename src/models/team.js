import mongoose from "mongoose"

const teamSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  role: { type: String },
  information: { type: String },
  tag: { type: String },
  certificates: [{ type: String }],
  facebook: { type: String },
  instagram: { type: String },
  twitter: { type: String },
  phoneNo: { type: String },
  email: { type: String },
})

const teamModel = mongoose.model("team", teamSchema)

export default teamModel
