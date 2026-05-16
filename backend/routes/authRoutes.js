import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  register,
  login,
  getProfile,
  updateProfile,
} from "../controllers/authController.js";

const router = express.Router(); // Creates a router to organize and reuse routes in different files

// Here we define the endpoints
router.post("/register", register); // public routes you do not need a token Because you will get the token after sign in or sign up
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile); // Protected routes
router.put("/profile", authMiddleware, updateProfile); // Must have the right token to access, so we added authmiddleware to ensure that

export default router;