import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/clouddinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const registerUser = asyncHandler(async (req, res) => {
    //get user details from frontend
    //validation - not empty
    //check if user already exists : username , email
    //check for emages , check for avtar
    // upload  for cloudinary , avatar check upload
    //create user object- create entry in db
    //remove password and refresh token field from response
    // check for user creation
    //return response


    const {fullName, email, username, password }= req.body
    console.log("email :",email);

   /* if (fullName === "") {
       throw new ApiError(400, "Fullname is require");
       
    }*/


    if (
      [fullName,email ,username,password].some((field)=>
      field?.trim() === "")
    ) {
      throw new ApiError(400, "All fields are require")
    }
   

   const existedUser =  User.findOne({
      //operetur
      $or :[{ username },{ email }]
    })

    if (existedUser) {
      throw new ApiError (409, "User with eamil or Username Already exist")

    }
    //use multer
   const avatarLocalPath = req.files?.avatar[0]?.path;

   const coverImageLocalPath =  req.files?.coverImage[0]?.path

   if (!avatarLocalPath) {
    throw new ApiError(400,"Avatar file is require")
    
   }
   // upload  for cloudinary 

  const avatar = await  uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)
  
 //  check upload avatar
  if (!avatar) {
    throw new ApiError(400,"Avatar file is require")
  }

   //create user object- create entry in db
   
   const user = await User.create({
    fullName,
    avatar : avatar.url,
    coverImage :coverImage?.url || "",
    email ,
    password,
    username : username.toLowercase()
   })
   
  const createdUser = await User.findById(user._id).select(
    "_password -refreshToken"
  )

if (!createdUser) {
  throw new ApiError(500, "Something went wrong while registering the user  ")
}
//response stustus code
return res.status(201).json(
  new ApiResponse(200,createdUser, "User registered successfully")
)

})


export {
  registerUser,
}