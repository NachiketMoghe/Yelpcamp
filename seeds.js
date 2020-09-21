var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment= require("./models/comment");


var data=[
    {name: "Cloud's Rest",
    image: "https://wallpapercave.com/wp/wp1857438.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc massa felis, ullamcorper quis eleifend ut, imperdiet vitae justo. Nullam ultrices dolor ut interdum tempus. Aenean at eros orci. Sed egestas ipsum et faucibus semper. Sed sagittis purus et nibh ullamcorper, bibendum sollicitudin magna porta. Pellentesque et dolor feugiat, pretium eros sed, varius nibh. Duis rhoncus tortor vitae turpis ullamcorper pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac nisl at nibh hendrerit tincidunt vel id sapien. Nam vitae justo aliquet, congue tellus non, accumsan libero. Vivamus tincidunt nisl et dolor cursus rhoncus. In hac habitasse platea dictumst"
    },
    {name: "Night's Elegance",
    image: "https://cdn.hipwallpaper.com/i/74/67/2CuRMd.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc massa felis, ullamcorper quis eleifend ut, imperdiet vitae justo. Nullam ultrices dolor ut interdum tempus. Aenean at eros orci. Sed egestas ipsum et faucibus semper. Sed sagittis purus et nibh ullamcorper, bibendum sollicitudin magna porta. Pellentesque et dolor feugiat, pretium eros sed, varius nibh. Duis rhoncus tortor vitae turpis ullamcorper pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac nisl at nibh hendrerit tincidunt vel id sapien. Nam vitae justo aliquet, congue tellus non, accumsan libero. Vivamus tincidunt nisl et dolor cursus rhoncus. In hac habitasse platea dictumst"
    },
    {name: "Dawn Awakening",
    image: "https://images5.alphacoders.com/555/thumb-1920-555700.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc massa felis, ullamcorper quis eleifend ut, imperdiet vitae justo. Nullam ultrices dolor ut interdum tempus. Aenean at eros orci. Sed egestas ipsum et faucibus semper. Sed sagittis purus et nibh ullamcorper, bibendum sollicitudin magna porta. Pellentesque et dolor feugiat, pretium eros sed, varius nibh. Duis rhoncus tortor vitae turpis ullamcorper pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac nisl at nibh hendrerit tincidunt vel id sapien. Nam vitae justo aliquet, congue tellus non, accumsan libero. Vivamus tincidunt nisl et dolor cursus rhoncus. In hac habitasse platea dictumst"
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
                        author: "Binod Tharu"
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