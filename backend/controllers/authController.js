import bcrypt from "bcrypt"; // To hash the password
import jwt from "jsonwebtoken"; // to create a token after the sign in or sign up
import { User } from "../models/index.js"; // It is a model in the DB, we call it due to we need the information inside it

function publicUser(user) { // Return only safe user data to the frontend and hide the secret data (password)
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
  };
}

function signToken(user) { // Create a JWT token for the (sign in or sign up) user
  return jwt.sign(
    { id: user.id, email: user.email }, // data stored inside the token
    process.env.JWT_SECRET || "dev-secret",
    { expiresIn: "7d" } // the purpose of it, if the user returns to the page they do not need to login again until the time limit expires (7d or a week)
  );
}

export async function register(req, res) { // (async) because we will communicate with DB
  try {
    const { fullName, email, password, confirmPassword } = req.body; // The data the user sends from frontend

    if (!fullName || !email || !password || !confirmPassword) { 
      return res.status(400).json({ message: "All fields are required" }); // To make sure all fields are filled
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" }); // Matching the passwords
    }

    const existingUser = await User.findOne({ where: { email } }); // To make sure that the new email is not duplicate
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" }); 
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before saving (more protection)
    const user = await User.create({ fullName, email, password: hashedPassword }); // Store the new user in the DB

    res.status(201).json({ // Send response that user registered successfully
      message: "User registered",
      token: signToken(user),
      user: publicUser(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function login(req, res) { // Same logic as Register
  try {
    const { email, password } = req.body; // you must send 2 feilds

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } }); // Find user by his email
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password); // ensure that the password is the same
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ // Send response that user logged in successfully
      message: "Login successful",
      token: signToken(user),
      user: publicUser(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getProfile(req, res) { // To show the user his profile information
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // User is not available in DB
    }

    res.json(publicUser(user)); // return unsecret information (without password)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateProfile(req, res) { // Edit or change profile information
  try {
    const { fullName, email, password } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" }); // To make sure that the new email is not duplicate
      }
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save(); // Save the new data inside the DB

    res.json({
      message: "Profile updated successfully",
      user: publicUser(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}