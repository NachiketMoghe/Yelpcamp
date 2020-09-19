var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment= require("./models/comment");

var data=[
    {name: "Cloud's rest.",
    image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    description: "Bish Lasagna."
    },
    {name: "Rest.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSaZ4pWqQljh9wAXm4Njlt-Xuq30jdlzrqBMGg5rKfoy2kXQSkj&usqp=CAU",
    description: "Bish Lasagna."
    },
    {name: "B rest.",
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
        data.forEach(function(seed) {
            Campground.create(seed, function(err,data){
                if(err){
                    console.log(err)
                }
                else{console.log("ädded a CG");
            //comment creation
            Comment.create(
                {
                text: "This place is great but I wish there was some internet.",
                author: "Homer"
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