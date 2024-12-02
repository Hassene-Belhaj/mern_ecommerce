const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register
const register = async (req, res) => {
  const { username, email, password } = req.body;
  const isExistEmail = await User.findOne({ email });
  if (isExistEmail)
    return res.status(409).json({
      success: false,
      message: "user already exists , try to login instead",
    });
  const isExistUsername = await User.findOne({ username });
  if (isExistUsername)
    return res.status(409).json({
      success: false,
      message: "username is already taken , try another",
    });
  try {
    const Salt = bcrypt.genSaltSync(10);
    const cryptedPwd = bcrypt.hashSync(password, Salt);
    await User.create({
      username,
      email,
      password: cryptedPwd,
    });
    return res
      .status(201)
      .json({ success: true, message: "registred successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//login

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isRegistredUser = await User.findOne({ email });
    if (!isRegistredUser)
      return res
        .status(401)
        .json({ succes: false, message: "Invalid Credentials" });
    const decryptPwd = await bcrypt.compare(password, isRegistredUser.password);
    if (!decryptPwd)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });

    const token = jwt.sign(
      {
        id: isRegistredUser.id,
        username: isRegistredUser.username,
        email: isRegistredUser.email,
        role: isRegistredUser.role,
      },
      process.env.SECRETJWT,
      { expiresIn: "30d" }
    );
    return res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "logged successfully",
      user: {
        id: isRegistredUser.id,
        username: isRegistredUser.username,
        email: isRegistredUser.email,
        role: isRegistredUser.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//log-out

const logout = async (req, res) => {
  return res.clearCookie("token").json({
    success: true,
    message: "Logged Out successfully",
  });
};

//middleware

const authMiddleware = async (req, res, next) => {
  const token = req?.cookies?.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "you are not authenticated",
    });
  jwt.verify(token, process.env.SECRETJWT, (err, user) => {
    if (err) {
      res.clearCookie("token");
      res.status(403).json({
        success: false,
        message: "Jwt Expired",
      });
      return;
    } else {
      req.user = user;
    }
    next();
  });
};

module.exports = {
  register,
  login,
  logout,
  authMiddleware,
};
