import {mongoose} from 'mongoose';

const userSchema = mongoose.Schema({
  name:{
    type: String,
    required: true,
    unique: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  mobileNo:{
    type: Number,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  profilePic:{
    type: String
  },
  isAdmin:{
    type: Boolean,
    required: true,
    default: false
  }
})

const User = mongoose.model('User', userSchema);

export default User;