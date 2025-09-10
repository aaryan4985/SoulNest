const express = require("express");
const cors = require("cors");

const app = express();

const landingRouter = require("./routes/landing");
const authRouter = require("./routes/auth");
const studentRouter = require("./routes/student");
const adminRouter = require("./routes/admin");
const chatbotRouter = require("./routes/chatbot");
const appointmentRouter = require("./routes/appointment");
const resourceRouter = require("./routes/resource");
const socialRouter = require("./routes/social");
const emotionRouter = require("./routes/emotion")

app.use(express.json());

app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use("/", landingRouter);
app.use("/auth", authRouter);
app.use("/student", studentRouter);
app.use("/admin", adminRouter);
app.use("/chatbot", chatbotRouter);
app.use("/appointment", appointmentRouter);
app.use("/resource", resourceRouter);
app.use("/social", socialRouter);
app.use("/emotion", emotionRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
