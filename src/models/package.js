import mongoose from "mongoose"

const packageSchema = mongoose.Schema({
  name: { type: String },
  image: [{ type: String }],
  content: { type: String },
  duration: { type: String },
  bestSeason: { type: String },
  accomodation: { type: String },
  grade: { type: String },
  maxAltitude: { type: String },
  itinerary: [
    {
      day: { type: String },
      title: { type: String },
      detail: { type: String },
    },
  ],
  includes: [{ type: String }],
  excludes: [{ type: String }],
  fixedDepartures: [
    {
      date: { type: String },
      spaceAvailable: { type: String },
    },
  ],
  tags: [{ type: String }],
  facebookShareLink: { type: String },
  twitterShareLink: { type: String },
  instagramShareLink: { type: String },
  youtubeLink: { type: String },
  packageNo: { type: Number },
  mainImage: { type: String },
  metaTags: { type: String },
  route: { type: String },
})

const packageModel = mongoose.model("package", packageSchema)

export default packageModel
