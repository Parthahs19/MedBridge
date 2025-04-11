const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const refreshToken = jwt.sign({ email }, REFRESH_SECRET, { expiresIn: "7d" });

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "Patient",
      refreshToken,
    });

    const accessToken = jwt.sign({ id: newUser._id, role: newUser.role }, ACCESS_SECRET, { expiresIn: "15m" });

    res.status(201).json({
      message: "User registered successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !await bcrypt.compare(password, user.password))
    return res.status(401).json({ message: "Invalid credentials" });

  const accessToken = jwt.sign({ id: user._id, role: user.role }, ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET, { expiresIn: "7d" });

  user.refreshToken = refreshToken;
  await user.save();

  res.json({ accessToken, refreshToken });
};

exports.refreshToken = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (user?.refreshToken !== token) throw new Error();

    const newAccessToken = jwt.sign({ id: user._id, role: user.role }, ACCESS_SECRET, { expiresIn: "15m" });
    res.json({ accessToken: newAccessToken });
  } catch {
    res.sendStatus(403);
  }
};
