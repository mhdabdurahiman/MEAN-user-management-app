import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { validateUser } from '../validators/userValidator.js';
import jwt from 'jsonwebtoken'

const encryptPassword = async(password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.log(error.message);
    throw new Error('Password encryption failed');
  }
}

const login = async(req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email",email, "password:",password)
    const user = await User.findOne({ email });

    if(!user) {
      return res.status(404).json({ message: "Username is not present" })
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch) {
      return res.status(401).json({ message: "password is incorrect" })
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7200s" }
    )
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'Lax'
      })
      .status(200)
      .json({ message: "Logged in successfully" })
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: 'Login failed, please try again'})
  }
}

const register = async(req, res) => {
  try {
    // User input validation
    const { error } = validateUser(req.body);
    if(error){
      return res.status(400).json({ error: error.details.map(detail => detail.message).join(', ') });
    }
    const { fname, lname, email, mobile, password } = req.body;
    const hashedPassword = await encryptPassword(password);
    const user = User({
      fname: fname,
      lname: lname,
      email: email,
      mobile: mobile,
      password: hashedPassword
    })

    const userData = await user.save();
    const {password: _, ...userResponse} = userData.toObject();
    res.status(201).json({
      message: 'User registration successful!',
      user: userResponse
    });
  } catch (error) {
    console.log('resgistration error', error);
    res.status(400).json({ error: error.message });
  }
}

const logout = async(req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" })
}

const checkAuth = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(200).json({ isAuthenticated: false, isAdmin: false })
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ isAuthenticated: true, isAdmin: data.isAdmin })
  } catch (error) {
    return res.status(200).json({ isAuthenticated: false, isAdmin: false });
  }
}

export {
  login,
  register,
  logout,
  checkAuth,
}