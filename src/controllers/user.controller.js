require("dotenv").config();
const express = require("express")
const User = require("../model/user.model")
const jwt = require("jsonwebtoken")
const router =  express.Router()
const newToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
  };
  

router.post("/post",async(req,res)=>{
    try{
        const user = await User.create(req.body)
        const token = newToken(user);
        res.cookie("Bearer ", token, { httpOnly: true });
        return res.status(200).send({user, token})
    }catch(err){
        return res.status(400).send(err.message)
    }
})
router.get('/all', async (req, res) => {
    try {
        const user = await User.find().lean().exec();
        return res.status(200).send(user)
    }
    catch(err){
        return res.status(400).send({message : "users not found"})
    }
})

router.get("/login",async(req,res)=>{
    try{
        const user = await User.findOne({ email: req.body.email });
        const match = user.checkPassword(req.body.password);
        if (!match) {
            return res.status(400).send({success: false,message: "Incorrect Email or Password"});
        } else{
            
            const token = newToken(user);
            res.cookie("Bearer ", token, { httpOnly: true });
            return res.status(200).send({user, token})
        }
    }catch(err){
        return res.status(400).send(err.message)
    }
})
router.patch('/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true}).lean().exec();
      return res.status(200).send(user);
    }
    catch(err) {
      return res.status(400).send(err.message)
    }
  })
module.exports= {newToken , router}

// {
// router.post(
//     "",
//     body("id")
//       .isNumeric()
//       .withMessage("Id is not a number")
//       .bail()
//       .custom(async (value) => {
//         const user = await User.findOne({ id: value });
//         if (user) {
//           throw new Error("Id already exists");
//         }
//         return true;
//       }),
//     body("first_name")
//       .isString()
//       .isLowercase()
//       .isLength({ min: 3, max: 20 })
//       .withMessage("First name should be 3 to 20 characters long"),
//     body("last_name").isLowercase().isLength({ min: 3, max: 20 }),
//     body("email")
//       .isEmail()
//       .custom(async (value) => {
//         const user = await User.findOne({ email: value });
//         if (user) {
//           throw new Error("Email already exists");
//         }
//         return true;
//       }),
//     body("password")
//       .isLength({ min: 8, max: 20 })
//       .custom((value) => {
//         let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
//         if (pattern.test(value)) {
//           return true;
//         }
//         throw new Error("Password is not strong");
//       }),
//     body("ip_address").notEmpty().isIP(),
//     body("age").isAlphanumeric(),
//     body("birth_date").isDate(),
//     // body("user_id").custom(async (value, {req}) => {
//     //   const post = await Post.findById(req.params.id);
//     //     if (! post) {
//     //       throw new Error("Post does not exists");
//     //     }
//     //   if (post.user_id !== req.query.user_id) {
//     //     throw new Error("User is not the same");
//     //     }
//     //     return true;
//     // })
//     async (req, res) => {
//       try {
//         const errors = validationResult(req);
//         // errors = []
//         if (!errors.isEmpty()) {
//           let newErrors;
//           newErrors = errors.array().map((err) => {
//             console.log("err", err);
//             return { key: err.param, message: err.msg };
//           });
//           return res.status(400).send({ errors: newErrors });
//         }
//         const user = await User.create(req.body);
  
//         // when user registers
//         // verification email is sent to user
//         // eventEmitter.on("User Registered", verificationMail);
//         // welcome email is sent to user
  
//         return res.send(user);
//       } catch (err) {
//         return res.status(500).send({ message: err.message });
//       }
//     }
//   );
  
//  } 