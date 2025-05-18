const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    console.log("👉 Incoming registration:", req.body);

    // Validar campos mínimos
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).json("Missing required fields");
    }

    // Verificar si el usuario ya existe (username o email)
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) return res.status(400).json("Username already taken");

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    console.log("✅ User registered:", user.username);
    res.status(200).json(user);
  } catch (err) {
    console.error("❌ Error during registration:", err);
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) return res.status(400).json("Wrong credentials!");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    console.error("❌ Error during login:", err);
    res.status(500).json(err);
  }
});

module.exports = router;
