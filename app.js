const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()
const router = require("./routes/authRoutes.js")
const cookieParser =require("cookie-parser")


let app = express()
app.use(express.static(__dirname + '/public'))
app.set("views", __dirname + "/views")
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.set("view engine", "ejs")

mongoose.set('useFindAndModify', false);
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.id7tu.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("conexion establecida con base de datos")
        const port = process.env.PORT
        app.listen(port || 3000, () => console.log(`listening on port ${port}`))
        
    })
.catch ((e) => console.log(e))

app.use(router)

app.use((req, res) => {
    res.render("404")
})


