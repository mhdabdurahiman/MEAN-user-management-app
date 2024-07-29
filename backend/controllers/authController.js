import User02 from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { validateUser } from '../validators/userValidator.js';

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
    console.log('login works')
  } catch (error) {
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
    const { name, email, mobileNo, password } = req.body;
    const hashedPassword = await encryptPassword(password);
    const user = User({
      name: name,
      email: email,
      mobileNo: mobileNo,
      password: hashedPassword
    })

    const userData = await user.save();
    const {password: _, ...userResponse} = userData.toObject();
    res.status(201).json({
      message: 'User registration successful!',
      user: userResponse
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export {
  login,
  register,
}