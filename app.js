// immediately invoked functions expression.
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");

// Restful Routing for CGs:
// Index: /campgrounds
// New: /campgrounds/new
// Create: /campgrounds
// Show: /campgrounds/:id

// Restful Routing for comments:
// New: campground/:id/comments/new     GET
// Create: campgrounds/:id/comments     POST

seedDB();
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost:27017/yelp_camp");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// Campground.create(
//     {
//         name: "Cavalry Creek", 
//         image: "https://www.familyvacationcritic.com/uploads/sites/19/2019/07/camping-tent-father-son-200x200.jpg",
//         description: "Call your cavalry. Nahh? You are the Cavalry! Leeegggoooo"
//     }, function(err, campground){
//         if(err){
//             console.log("Error; the world is against you.");
//             console.log(err);
//         }
//         else{
//             console.log("You did it, you son of a bitch!");
//             console.log(campground);
//         }

//     }

// );
// var campgrounds= [
//     {name: "Lakeside lawns", image: "https://logout.world/media/camping-at-panshet-backwaters/44023331_315026922610887_3771461188353785856_n.jpg"}
// ];

app.get("/", function(req, res){
    res.render("land");
});


app.get("/campgrounds", function(req, res){
    // Get all CG from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("Error; the world is against you.");
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
    // res.render("campgrounds", {campgrounds: campgrounds});    
});



app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log("Error; the world is against you.");
            console.log(err);
        }
        else{
            res.redirect("/campgrounds"); 
        }
    });
   
});

app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW - SHows more info about one CG
app.get("/campgrounds/:id", function(req, res){
    // Find CG with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundCampground);
            // render show template with the same CG
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

app.get("/campgrounds/:id/comments/new", function(req,res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else {
            res.render("comments/new", {campground: campground});
        }
    })
});

app.post("/campgrounds/:id/comments", (req,res)=>{
    // lookup Cg using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            console.log(req.body.comment);
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id );
                }
            });
        }
    });
    // create new comment
    // connect new comment to CG
    // redirect to CG showpage
});
app.listen(process.env.PORT||3000, process.env.IP, function(){
    console.log("Yelp Server has started.");
}); 