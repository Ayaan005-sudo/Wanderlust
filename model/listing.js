const mongoose =require ("mongoose")
const Schema = mongoose.Schema;
const Review=require("./review.js")

const listingSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:[{
        url:String,
        // set:(v)=>v ===""?"https://www.istockphoto.com/photo/reflection-of-people-on-glass-window-gm2166573931-586671780?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fimage&utm_medium=affiliate&utm_source=unsplash&utm_term=image%3A%3A%3A":v,
    filename:String,
    }],
    
    description:String,
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        },
    ],
owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
},

category:{
    type:[String],
    enum:['trending','rooms','iconic cities','mountains','castles', 'amazing pools','camping','farms','arctic' ],
    required:true,

}

})
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
await Review.deleteMany({_id:{$in : listing.reviews}});
}});

const Listing = mongoose.model("Listing",listingSchema);
module.exports=Listing;

