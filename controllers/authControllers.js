const User=require("../models/User")
const jwt=require("jsonwebtoken")
const requireAuth=require("../middleware/authMiddleware")

const createToken=(id)=>{
    const expires=60*30
    return jwt.sign({id},"secret key",{expiresIn:expires}) 
}

indexGet=(req,res)=>{
    res.render("index")
}

loginGet=(req,res)=>{
    res.render("login",{error:false})
}

loginPost=async (req,res)=>{
    const {user,password}=req.body
    try{
        const userData=await User.login(user,password)
        const token=createToken(userData._id)
        res.cookie("jwt",token,{httpOnly:true,maxAge:1000*60*30})
        res.redirect("content")
    }
    catch(err){
        res.render("login",{error:err})
    }

}

signupGet=(req,res)=>{
    res.render("signup",{duplicado:false})
}

signupPost=(req,res)=>{
    const {user,password}=req.body
    const userData=User.create({user,password})
    .then((data) => {
        console.log("userata sign ",userData,data)
        const token=createToken(data._id)
        res.cookie("jwt",token,{httpOnly:true,maxAge:1000*60*30})
        res.redirect("content")
    })
    .catch((err)=>{
        console.log(err)
        if(err.code==11000){
            res.render("signup",{duplicado:"tesjs"})
        }
    })

}

logoutGet=(req,res)=>{
    res.cookie("jwt","",{maxAge:1});
    res.redirect("/")
}

contentGet=(req,res)=>{
    res.render("content")
}

module.exports={
    indexGet,
    loginGet,
    loginPost,
    signupGet,
    signupPost,
    logoutGet,
    contentGet
}