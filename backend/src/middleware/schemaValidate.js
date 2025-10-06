const z = require("zod");


const SignupValidate = z.object({
    firstName:z.string(),
    lastName:z.string(),
    email:z.string(),
    password:z.string(),
});
const SigninValidate = z.object({
    email:z.string(),
    password:z.string(),
});

const UpdateValidate = z.object({
    firstName:z.string(),
    lastName:z.string(),
    email:z.string(),
    password:z.string(),
})


const AmountValidate = z.object({
    amount: z.number().positive(),
});



module.exports = {SignupValidate,SigninValidate,UpdateValidate,AmountValidate};