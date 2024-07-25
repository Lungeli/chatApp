import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
   
    // Helper function to get random profile picture URL
    //https://avatar-placeholder.iran.liara.run/ | 1-50 has male pictures, 50-100 has female
    const getRandomProfilePic = (gender) => {
        let min = 1;
        let max = 50;
        if (gender === "female") {
            min = 51;
            max = 100;
        }
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return `https://avatar.iran.liara.run/public/${randomNumber}`;
    };
    try{
        const {fullName, userName, password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error:"Passwords dont match!"})
        }
        
        const user = await User.findOne({userName});

        if(user){
            return res.status(400).json({error:"Username already exists!"})
        }

        //HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const userProfilePic = getRandomProfilePic(gender);

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: userProfilePic
        })

        if(newUser){
            await newUser.save();
        
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic
        })
        } else {
            res.status(400).json({error: "Invalid User Data"});
        }

    } catch (error) {
        console.log("Error in Singup Controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const login = (req, res) => {
    console.log("Login User");
}

export const logout = (req, res) => {
    console.log("Logout User");
}