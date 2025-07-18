import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const router = Router();
dotenv.config();

const Admin_code = process.env.Admin_code;

router.post("/signup", async (req, res) => {
  const { name, email, password ,code} = req.body;
    if (!name || !email || !password || !code) {
    return res.status(400).json({ error: "Please fill in all fields." });
  }
    console.log('code:', JSON.stringify(code), 'Admin_code:', JSON.stringify(Admin_code));
    if (code != Admin_code) {
    return res.status(403).json({ error: "Sign-up not allowed as you are not Admin." });
  }
  try {
    const found = await User.findOne({ email });
    if (found) {
      return res.status(400).json({ error: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ name, email, password: hashedPassword});

    await user.save();
    res.json({ success: "Account created" });
  } catch (error) {
    res.status(500).json({ error: "Error occurred" });
  }
})


router.delete("/users/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ success: "User deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Internal server error" });
  }

});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const found = await User.findOne({ email });
    if (!found) {
      return res.status(400).json({ error: "This account does not exist" });
    }

    const match = await bcrypt.compare(password, found.password);
    if (!match) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: found._id }, process.env.JWT_SECRET);
    return res.json({ token, uid: found._id, email: found.email, name: found.name });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Login error: " + err.message });
  }
});


router.get('/users', async (req, res, next) => {
  try {
    const excludeId = process.env.Admin_id;
    const filter = excludeId ? { _id: { $ne: excludeId } } : {};

    const users = await User.find(filter);
    res.json(users);
  } catch (err) {
    next(err);
  }
});

export default router;