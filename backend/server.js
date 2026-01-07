import express from 'express';
import 'dotenv/config';
import cors from "cors"
import connectDB from './config/db.js';
import userRoute from './routes/user.route.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))



app.use("/user", userRoute)

app.listen(PORT, () => {
    connectDB()
  console.log(`Server is running on port ${PORT}`);
});

