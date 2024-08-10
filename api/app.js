import express from "express";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({origin:process.env.CLIENT_URL, credentials:true}))

app.use("/api/auth", authRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
