import mongoose from "mongoose"

const extraSchema = mongoose.Schema({
  contacts: {
    phoneNumber: { type: String },
    email: { type: String },
    location: { type: String },
    mapLink: { type: String },
    facebookLink: { type: String },
    instagramLink: { type: String },
    twitterLink: { type: String },
    youtubeLink: { type: String },
    whatsappLink: { type: String },
  },
  usefulInformation: [
    {
      title: { type: String, required: true },
      content: { type: String },
    },
  ],
  destinations: [{ type: String }],
})

const extraModel = mongoose.model("extra", extraSchema)

export default extraModel
