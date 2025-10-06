const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    balance:{type:Number,requierd:true}
},{
    timestamps:true,
});

const Account = mongoose.model("Account",accountSchema);
module.exports = Account;