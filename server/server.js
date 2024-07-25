import express from "express"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config()

const app = express();
const PORT = process.env.PORT


app.get("/", (req, res) => {
    res.send("Server is ready Wamma Jamma");
})

app.use(express.json());
app.use("/api/auth", authRoutes);
 

app.listen(5000, () => {

    connectToMongoDB(); 
    console.log(`Server is running on Port ${PORT}`);
}
);