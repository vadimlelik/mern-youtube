const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const router = Router();

// /api/auth/register

router.post(
  "/register",
  [
    check("email", "Uncorrect email").isEmail(),
    check(
      "password",
      "Password must be longer than 3 and shorter than 12"
    ).isLength({ min: 3, max: 12 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Uncorrect request", errors });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "такой пользватеь уже сучествует " });
      }
      const hashPassword = await bcrypt.hash(password, 8);
      const user = new User({ email, password: hashPassword });

      await user.save();
      res.status(201).json({ message: "User was created" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// /api/auth/login

router.post(
  "/login",
  [
    check("email", "Uncorrect email").isEmail(),
    check(
      "password",
      "Password must be longer than 3 and shorter than 12"
    ).exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Uncorrect request", errors });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: " User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Неверный пароль" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });
      return res.json({
        token,
        user: {
          userId:id,
          // email:user.email,
          // password:user.password

        },
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
