import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import "dotenv/config"

import path from "path"
import { fileURLToPath } from "url"

import mainRouter from "./routes/main.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"))
app.use("/", express.static("public"))

const PORT = process.env.PORT
const DB_URI = process.env.DB_URI

app.use("/mainRoute", mainRouter)

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/public/index.html"))
// })

app.get("*", (req, res) => {
  res.sendFile("/public/index.html")
})

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection error:", err))

app.listen(PORT, () => {
  console.log("App running in port: ", PORT)
})
