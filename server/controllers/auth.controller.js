import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

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
            generateTokenAndSetCookie(newUser._id, res);
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

export const login = async (req, res) => {
    try {
        const {userName, password} = req.body;
        const user = await User.findOne({userName})
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid Creds"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic,

        });
        
    } catch (error) {
        console.log("Error in Login Controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
        
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged Out Sucessfully"});
    } catch (error) {
        console.log("Error in Logout Controller", error.message);
        res.status(500).json({error:"Internal Server Error"});  
    }
}