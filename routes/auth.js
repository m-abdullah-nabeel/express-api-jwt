import express from "express";
import userModel from "../models/Users.js";
import { register_validation, login_validation } from "../validation.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
const router = express.Router();

router.post('/', async (req, res)=>{
    // DATA VALIDATION
    const {error} = register_validation(req.body);
    if (error) return res.send(error.details[0].message);

    // CHECK IF THE USER ALREADY EXISTS
    const email_exist = await userModel.findOne({email: req.body.email});
    if (email_exist) return res.status(400).send("Email already exists")

    // ENCRYPT PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hasged_pass = await bcrypt.hash(req.body.pass, salt)

    // BUILD USER
    const user = userModel({
        name: req.body.name,
        email: req.body.email,
        pass: hasged_pass
    })

    // REGISTER USER
    try {
        console.log("Log Saving")
        const saved = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        console.log("Log Error")
        res.status(400).send(err)
    }
})

// LOGIN USER
router.post('/login', async (req, res) => {
        // DATA VALIDATION
        const {error} = login_validation(req.body);
        if (error) return res.send(error.details[0].message);
    
        // CHECK IF THE USER ALREADY EXISTS
        const email_exist = await userModel.findOne({email: req.body.email});
        if (!email_exist) return res.status(400).send("Email doesn't exists already!")
    
        // ENCRYPT PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hasged_pass = await bcrypt.hash(req.body.pass, salt)
    
        // BUILD USER
        const user = userModel({
            email: req.body.email,
            pass: hasged_pass
        })
        // 
        const valid_pass = await bcrypt.compare(req.body.pass, user.pass);
        if (!valid_pass) return res.status(400).send("Wrong Password!")

        // res.send("Successfully logged in!") 
        const token = jsonwebtoken.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header("auth-token", token).send(token)
    
})
export default router;
