const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5555;

const taskRoutes = require("./routes/tasks");
app.use("/api/tasks", taskRoutes);

app.get("/", (req,res)=>{
  res.send("API running");
});

app.listen(PORT, ()=>{
  console.log("Server running on port " + PORT);
});

mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("MongoDB connected"))
  .catch(err=>console.log(err));