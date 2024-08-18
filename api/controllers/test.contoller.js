import jwt from "jsonwebtoken"


export const shouldbeLoggedin = async (req, res) => {
    
   
    console.log(req.userId);
    return res.status(300).json({message:"you are authenticated"});

  
};




