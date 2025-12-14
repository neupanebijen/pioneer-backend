import mongoose from "mongoose"

const testimonialSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  content: { type: String },
})

const testimonialModel = mongoose.model("testimonial", testimonialSchema)

export default testimonialModel
