import express from "express";
import auth from "../verifyToken.js"
const brand_router = express.Router();

brand_router.get("/", auth, (req, res) => {
    // req.findone etc on Id from req.user
    res.send(req.user)
})


export default brand_router;