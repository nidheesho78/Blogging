import { uploadPicture } from "../middleware/uploadPictureMiddleware.js";
import User from "../models/User.js";
import { fileRemover } from "../utils/fileRemover.js";
import generateUserToken from "../utils/generateUserToken.js"; 



export const registerUser = async (req,res,next) => {
    console.log('confirming')
    try {
        const { name, email, mobile, password } = req.body;

        console.log(req.body) 
        //check whether the user exist or not
        const existingUser = await User.findOne({email});
        if(existingUser) {
            res.status(400)
            throw new Error('User have already registered')
        }
        //creating a new user
       const user = await User.create({
            name,
            email,
            mobile,
            password
        });
        console.log('user',user)
    const token = generateUserToken(res, user._id);
    console.log('Token :',token)

         return res.status(201).json({
            _id:user._id,
            avatar:user.avatar,
            name:user.name,
            email:user.email,
            mobile:user.mobile,
            verified:user.verified,
            isAdmin:user.isAdmin,
            token
         })
        
    } catch (error) {
       next(error);
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ email });

        console.log('User :',user)

        if(!user) {
            throw new Error('Email not found');
        }

        if(await user.matchPassword(password)) {
            const token = generateUserToken(res, user._id);
            console.log('Token :',token)
            return res.status(201).json({
            _id:user._id,
            avatar:user.avatar,
            name:user.name,
            email:user.email,
            mobile:user.mobile,
            verified:user.verified,
            isAdmin:user.isAdmin,
            token
            })
        }else {
            throw new Error('Invalid Email or Password')
        }
    } catch (error) {
        next(error)
    }
}
 
export const userProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)

        console.log('User :',user)

    if(user) {
            return res.status(201).json({
            _id:user._id,
            avatar:user.avatar,
            name:user.name,
            email:user.email,
            mobile:user.mobile,
            verified:user.verified,
            isAdmin:user.isAdmin,
          
            });
    } else {
        const error = new Error('User not found');
        error.statusCode = 404;
        next(error);

    }
    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        console.log('update user :', user)

        if(!user) {
            throw new Error('User not found');
        }
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.mobile = req.body.mobile || user.mobile

        if(req.body.password && req.body.password.length < 6) {
            throw new Error('Password length must be at least 6 characters')
        } else if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUserProfile = await user.save();
        const token = generateUserToken(res, user._id);
            console.log('Token :',token)
        res.json({
             _id:updatedUserProfile._id,
            avatar:updatedUserProfile.avatar,
            name:updatedUserProfile.name,
            email:updatedUserProfile.email,
            mobile:updatedUserProfile.mobile,
            verified:updatedUserProfile.verified,
            isAdmin:updatedUserProfile.isAdmin,
            token
        })
    } catch (error) {
       next(error);
    }
}

export const updateProfilePicture = async (req, res, next) => {
    try {
        const upload = uploadPicture.single('profilePicture');
        upload(req, res, async function (err) {
            if(err) {
                const error = new Error('An unknown error occured when uploading' + err.message);
                next(error);
            } else {
                //everything went well
                if(req.file) {
                    let filename;
                    const updatedUser = await User.findByIdAndUpdate(req.user._id);
                    filename = updatedUser.avatar;
                    if(filename) {
                        fileRemover(filename) 
                    }
                    updatedUser.avatar = req.file.filename;
                    await updatedUser.save();
                    const userId = req.user._id
                    const token = generateUserToken(res, userId);
                    console.log('Token :',token)
                    res.json({
                _id:updatedUser._id,
                 avatar:updatedUser.avatar,
                 name:updatedUser.name,
                 email:updatedUser.email,
                 mobile:updatedUser.mobile,
                 verified:updatedUser.verified,
                 isAdmin:updatedUser.isAdmin,
                 token
                    });
                } else {
                    let filename;
                    const updatedUser = await User.findById(req.user._id);
                    filename = updatedUser.avatar;
                    updatedUser.avatar = "";
                    await updatedUser.save();
                    fileRemover(filename);
                     const userId = req.user._id
                    const token = generateUserToken(res, userId);
                    console.log('Token :',token)
                    res.json({
                _id:updatedUser._id,
                 avatar:updatedUser.avatar,
                 name:updatedUser.name,
                 email:updatedUser.email,
                 mobile:updatedUser.mobile, 
                 verified:updatedUser.verified,
                 isAdmin:updatedUser.isAdminUser,
                 token
                    })
                }
            }
        });
        
    } catch (error) {
       next(error); 
    } 
}


