const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();

const homecontent = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores tenetur sapiente consectetur itaque nostrum at veniam soluta optio rerum expedita vero dolore, quidem animi earum beatae nihil. Amet neque excepturi dolores tenetur quos, vero beatae tempore dignissimos asperiores, ipsam repellendus voluptas vitae, voluptatibus odio suscipit voluptate at recusandae modi aliquam."
const aboutcontent = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores tenetur sapiente consectetur itaque nostrum at veniam soluta optio rerum expedita vero dolore, quidem animi earum beatae nihil. Amet neque excepturi dolores tenetur quos, vero beatae tempore dignissimos asperiores, ipsam repellendus voluptas vitae, voluptatibus odio suscipit voluptate at recusandae modi aliquam."
const contactcontent = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores tenetur sapiente consectetur itaque nostrum at veniam soluta optio rerum expedita vero dolore, quidem animi earum beatae nihil. Amet neque excepturi dolores tenetur quos, vero beatae tempore dignissimos asperiores, ipsam repellendus voluptas vitae, voluptatibus odio suscipit voluptate at recusandae modi aliquam."

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://anubhavshail12:admin123@cluster0.p1cyvi7.mongodb.net/blogdb?retryWrites=true&w=majority");

const itemschema = mongoose.Schema({
    title: String,
    content: String
})

const Post = mongoose.model("Post", itemschema);
const arr = [];

app.get("/", function(req, res){
    const posts = [];
    Post.find({}).then(function(posts){
        res.render("home", {con: homecontent, arr: posts});
    })
    
})

app.get("/about", function(req, res){
    res.render("about", {con: aboutcontent});
})

app.get("/contact", function(req, res){
    res.render("contact", {con: contactcontent});
})

app.get("/compose", function(req, res){
    res.render("compose");
})

app.get("/post/:postid", function(req, res){
    const requested = req.params.postid;
    
    Post.findOne({_id: requested}).then(function(post){
        console.log(post);
        res.render("post", {title: post.title, content: post.content});
    })
})

app.post("/compose", function(req, res){
    const post = new Post({
        title: req.body.value,
        content: req.body.postbody
    })
    post.save();
    res.redirect("/");

})

app.listen(3000, function(){
    console.log("server started on port 3000");
})

