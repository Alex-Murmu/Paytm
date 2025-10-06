const bcrypt = require("bcrypt");

const HassedPassword = async(password)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password,salt);
    } catch (error) {
        return false;
    }
};

const VerifyPassword = async(password,dbpassword)=>{
    return await bcrypt.compare(password,dbpassword);
};

module.exports = {HassedPassword,VerifyPassword}