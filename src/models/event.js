import mongoose from "mongoose"

const eventSchema = mongoose.Schema({
  title: { type: String },
  images: [{ type: String }],
  content: { type: String },
  tag: { type: String },
  facebookSharLink: { type: String },
  twitterShareLink: { type: String },
  instagramShareLink: { type: String },
  youtubeLink: { type: String },
  eventNo: { type: Number },
})

const eventModel = mongoose.model("event", eventSchema)

export default eventModel
