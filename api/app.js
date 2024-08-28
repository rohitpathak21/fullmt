import express from "express";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors"
import testRoute from "./routes/test.route.js"
import userRoute from "./routes/user.route.js"
import teacherauthRoute from "./routes/teacherauth.route.js"
import teacherRoute from "./routes/teacher.route.js"
import helmet from "helmet"
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();

app.use(helmet());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});

app.use(limiter);

app.use(cookieParser());
app.use(express.json());
const corsOptions = {
  origin: process.env.CLIENT_URL, // Replace with your actual client URL
  credentials: true, // This allows credentials to be sent along with the request
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));



app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/user", userRoute);
app.use("/api/teacherauth", teacherauthRoute);
app.use("/api/teacher", teacherRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
