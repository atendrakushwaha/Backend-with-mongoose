const asyncHandeler = (requstHandler)=>{
  (req,res,next) => {
    Promise.resolve(requstHandler(req,  res,next)).
    catch((err) => next(err))
  }
}   




export {asyncHandeler}

/*const asyncHandeler = (fn) => async (req,res,next)=>{
 
try{
     await fn(req,res,next)
}
catch(error){
    res.status(error.code || 500 ).json({
        success : false,
        message : error.message
    })
}

}*/