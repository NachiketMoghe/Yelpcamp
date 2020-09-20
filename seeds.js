var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment= require("./models/comment");


var data=[
    {name: "Cloud's Rest",
    image: "https://tr-images.condecdn.net/image/n9VWg4NzDqr/crop/200/square/f/finchingfield.jpg",
    description: "Bish Lasagna."
    },
    {name: "Animated",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSaZ4pWqQljh9wAXm4Njlt-Xuq30jdlzrqBMGg5rKfoy2kXQSkj&usqp=CAU",
    description: "Bish Lasagna."
    },
    {name: "Dawn Awakening",
    image: "https://lifespantherapies.com/wp-content/uploads/2013/06/tent-camping-200x200.jpg",
    description: "Bish Lasagna."
    }
]
//remove all CGs
function seedDB(){
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed campgrounds."); 
        // adding new CGs
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err) 
                }
                else{
                console.log("Added a CG");
                    //comment creation
                    Comment.create(
                        {
                        text: "This place is great but I wish there was some internet.",
                        author: "Bish"
                        }, 
                        function(err, comment){
                            if(err){
                            console.log(err);
                            }
                            else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                            });
                        }
        });
        });
    });
}
module.exports= seedDB;
// module.exports= mongoose.model("seedDB", seedDB);