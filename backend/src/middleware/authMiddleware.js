const { VerifyToken } = require("./token");

const authMiddleware = async(req,res,next)=>{
    console.log("authiticate check")
    const authHeader = req.headers.authorization;
    if(!authHeader ||! authHeader.startsWith("Bearer ")){
        return res.status(400).json({message:"Token Not found"});
    }
    const token = authHeader.split(" ")[1];

    const verifiedUser = await VerifyToken(token);

    if(!verifiedUser){
        return res.status(400).json({message:"user is not authorized"})
    }
    req.user = verifiedUser._id;
    next();
}

module.exports = authMiddleware;