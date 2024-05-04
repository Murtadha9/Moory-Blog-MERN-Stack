
import  mongoose  from "mongoose";



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    photoURL:{
        type: String,
        default:'https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg'

    },
    isAdmin:{
        type: Boolean,
        default: false
    }
  
},
{timestamps: true}
)

const User = mongoose.model('User',userSchema);

export default User;





