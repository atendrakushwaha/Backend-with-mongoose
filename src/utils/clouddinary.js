
import fs from "fs";

import { v2 as cloudinary } from 'cloudinary';


    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET  // Click 'View API Keys' above to copy your API secret
    });


    const uploadOnCloudinary = async (localFilePath) =>{
        try {
            if(!localFilePath) return null
            //upload cloudinary file
           const responce = await cloudinary.uploader.upload(localFilePath,{
                resource_type : "auto"
            })
            //file upload successful
            console.log('file uploaded on cloudinary',responce.url)
            return responce;
        } catch (error) {
            fs.unlinkSync(localFilePath)// remove the locally saved temporary file as the upload operation
            return null;
        }
    }

    export {uploadOnCloudinary}
   /* cloudinary.v2.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
        {
            public_id : "olympic_flag"
        },
        function (error ,result) {console.log(result);

        }
    )*/


    
  
    