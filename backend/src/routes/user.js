const express = require("express");
const { SignupValidate, SigninValidate, UpdateValidate, AmountValidate } = require("../middleware/schemaValidate");
const { User } = require("../models/user");
const { HassedPassword, VerifyPassword } = require("../middleware/hasshed");
const { generateToken } = require("../middleware/token");
const authMiddleware = require("../middleware/authMiddleware");
const Account = require("../models/account");
const { regex } = require("zod");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.post("/signup",async(req,res)=>{
    try {
        const {firstName,lastName,email,password} = req.body;
        if(!firstName ||!lastName ||!email || !password){
            return res.status(400).json({message:"Input field are required"})
        };
        const {success} = SignupValidate.safeParse(req.body);
        if(!success){
            return res.status(401).json({message:"Invalid user input"});
        }
       
        const checkUserExsitance = await User.findOne({email:email});
        if(checkUserExsitance){
            return res.status(400).json({message:false,email:`user allrady exsit with this email ${email}`});
        }
    
        const pass = await HassedPassword(password);

        const user = await User.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:pass
        });

        if(user){
            const account = await Account.create({user:user._id,balance:1000})
            const {password:pass,...SenitizeUser} = user.toObject();
            SenitizeUser.balance = account.balance;
            return res.status(200).json({message:true,SenitizeUser})
        }
        
    } catch (error) {
        return res.status(400).json({message:false,errorDetail:`${error.message}`})
    }
})

router.post("/signin",async(req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:"Field are required 1errror"});
        }
        const {success} = SigninValidate.safeParse(req.body);

        if(!success){
            return res.status(400).json({message:"Invalid input"})
        }

        const CheckUserExistance = await User.findOne({email:email});
        if(!CheckUserExistance){
            return res.status(400).json({message:"User not found with this email ",email})
        };

        const validUser = await VerifyPassword(password,CheckUserExistance.password);
        if(!validUser){
            return res.status(400).json({message:"Worng Password"});
        }
        

        const {password:pass,...user} = CheckUserExistance.toObject();
      
        const token = await generateToken(user);
        res.status(200).json({token:token})
    } catch (error) {
         return res.status(400).json({message:`Signin error handler: ${error.message}`})
    }
});

router.put("/update",authMiddleware,async(req,res)=>{
    try {
        const {success} = UpdateValidate.safeParse(req.body);
        if(!success){
            return res.status(401).json({message:"Invalid Update field"})
        }
        
        const id = req.user;
        const user = await User.findOne({_id:req.user});
        if(!user){
            return res.status(401).json({message:"User Not found to be updated"})
        };
        const pass = await HassedPassword(req.body.password);
        const updateUser = await User.findByIdAndUpdate({_id:user._id},
            {
                firstName:req.body.firstName || user.firstName,
                lastName:req.body.lastName || user.lastName,
                email:req.body.email ||user.email,
                password:pass || user.password
            }
        );
        if(!updateUser){
            return res.status(404).json({message:"error Updating user details"})
        };
       const {password:rmPass,...senitizeUser} = updateUser.toObject();
       const token = await generateToken(senitizeUser);
       senitizeUser.token = token
        res.status(200).json({message:"user updated Successfully",user:senitizeUser})
    } catch (error) {
        return res.status(404).json({message:"update error Handler :",error:error.message})
    }
})

router.get("/balance",authMiddleware,async(req,res)=>{
    console.log("balnce check")
   try {
    const account = await Account.findOne({user:req.user});
    if(!account){
        return res.status(400).json({message:"error Fetching Account balance this time"})
    }
    const balance = account.balance;
    res.status(200).json({balance:balance})
   } catch (error) {
    return res.status(401).json({message:"balance Error Handler:",error:error.message})
   }
});

router.get("/bulk",authMiddleware,async (req, res) => {
    console.log("hit bulk query");
    try {
        const filter = req.query.filter || ''; 
        const searchInput = new RegExp(filter, 'i');
        const Allusers = await User.find({
            $or: [
                { firstName: searchInput },
                { lastName: searchInput }
            ]
        });
        
        const users = Allusers.map((user)=>{
            return {
                id:user._id,
                firstName:user.firstName,
                lastName:user.lastName
            }
        })
        res.status(200).json({ message: "Users found successfully", users: users });
        
    } catch (error) {
        console.error("Search error:", error); 
        return res.status(500).json({ message: "Search error handler" });
    }
});



router.put("/transfer/:id", authMiddleware, async (req, res) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const { success, data } = AmountValidate.safeParse(req.body);
        if (!success) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Amount should be digits" });
        }
        
        const amount = data.amount;
        const recipientId = req.params.id; 
        const senderId = req.user;       

        const fromAccount = await Account.findOne({ user: senderId }).session(session);
        const toAccount = await Account.findOne({ user: recipientId }).session(session);
        
      
        if (!fromAccount) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Sender account not found." });
        }
        if (fromAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(401).json({ message: "Insufficient balance to Make Transaction", amount });
        }


        if (!toAccount) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Recipient account not found." });
        }
        
    
        const sender = await User.findById(senderId, ' firstName lastName').session(session);
        const recipient = await User.findById(recipientId, ' firstName lastName').session(session);


        if (!sender || !recipient) {
             await session.abortTransaction();
             return res.status(404).json({ message: "Sender or Recipient User details not found." });
        }

        await Account.updateOne({ user: senderId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ user: recipientId }, { $inc: { balance: amount } }).session(session);
        
        await session.commitTransaction();


        res.status(200).json({
            message: "Transfer Successfully",
            transferDetails: {
                amount: amount,
                // Use the fetched user objects for the response
                from: {
                    userId: senderId,
                    username: sender.username || sender.firstName, // Use username or name
                },
                to: {
                    userId: recipientId,
                    username: recipient.username || recipient.firstName,
                },
                newSenderBalance: fromAccount.balance - amount // This is the new balance!
            }
        });

    } catch (error) {
        return res.status(500).json({ message: "Transfer failed due to a server error:", error: error.message });
    }
});




module.exports = router;