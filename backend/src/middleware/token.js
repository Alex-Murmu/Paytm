const jwt = require("jsonwebtoken");
const pass  = "12345"
const generateToken = async(user)=>{
 return await jwt.sign(user,pass,{expiresIn:"1d"})
}

const VerifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, pass); // secret add karo
        return decoded; // decoded user return karo
    } catch (err) {
        console.log("JWT error:", err.message); // sirf short log
        return false;  // authMiddleware handle karega
    }
};


module.exports = {generateToken,VerifyToken}