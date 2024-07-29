import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config()

const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(cookieParser());


// app.get("/", (req, res) => {
//     res.send("Server is ready Wamma Jamma");
// })



app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
 

app.listen(PORT, () => {

    connectToMongoDB(); 
    console.log(`Server is running on Port ${PORT}`);
}
);