import User from '../models/userModel.js';

export const getUserProfile = async(req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select('-password');

    if(!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' })
  }
}