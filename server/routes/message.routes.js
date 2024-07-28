import express from "express";
const router = express.Router();
import { sendMessage } from "../controllers/message.controller.js";

router.post("/send/:id", sendMessage);


export default router;

