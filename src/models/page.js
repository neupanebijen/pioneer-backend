import mongoose from "mongoose"

const pageSchema = mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  images: [{ type: String }],
  content: { type: String },
  tags: [{ type: String }],
})

const pageModel = mongoose.model("page", pageSchema)

export default pageModel
