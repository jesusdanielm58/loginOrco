const express=require("express")
const router =express.Router()
const authControllers= require("../controllers/authControllers")
const {requireAuth}=require("../middleware/authMiddleware")
const {checkUser}=require("../middleware/authMiddleware")


router.get("*",checkUser)


router.get("/",authControllers.indexGet)
router.get("/login",authControllers.loginGet)
router.post("/login",authControllers.loginPost)
router.get("/signup",authControllers.signupGet)
router.post("/signup",authControllers.signupPost)
router.get("/content",requireAuth,authControllers.contentGet)
router.get("/logout",authControllers.logoutGet)

router.post("*",checkUser)

module.exports=router