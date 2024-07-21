import express from "express"
import dotenv from "dotenv"
const app = express();
import authRoutes from "./routes/auth.routes.js";
dotenv.config()

const PORT = process.env.PORT

app.get("/", (req, res) => {
    res.send("Server is ready Wamma Jamma");
})


app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log(`Server is running on Port ${PORT}`));