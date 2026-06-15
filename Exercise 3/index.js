import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"

import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();


const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);


mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("✅ connected to MongoDB"))
    .catch((err)=>console.log("❌ connection failed"))

app.listen(
    process.env.PORT || 5000,
    () => {
        console.log(
            `Server running on port ${process.env.PORT}`
        );
    }
);