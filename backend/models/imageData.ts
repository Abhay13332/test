 import * as mongoose  from "mongoose";

const ImageSchema=new mongoose.Schema({
    description:{type:String,required:true},
    type:{type:String,required:true,enum:["Astar Poshak","Satan Suit", "Cotton Suit","Jod","Odhni","Printed","Half Pure Poshak","Zero Pure Poshak","Pure Poshak"]},
    price:Number,
    images:[{type:String,required:true}],
    colors:[{type:String,required:true}],
    colorNames:[{type:String,required:true}],
    detailedDescription: {type:String},
    title:{type:String,required:true},
    originalPrices:{type:Number},
    ratings:Number,
    reviewCount: Number,
    specifications: { type:[{key:String,value:String}], required:false },
    features: [String],
    inStock: {type:Boolean},
},{ statics:{
    imageDataByTitle:function (title:string){
    return this.findOne({title:title});
},imageDataById:function(id:string){
    return this.findById(id);
},getSuits:function(){
    return this.find({type:{$nin:["Jod","Odhni","Printed"]}});
},priceUpdate:async function(id:string,price:number){
    const document=await this.findOne({id:id}) as ImageData;
    if(!document.originalPrices){
        await this.aggregate([{$match:{id}},{$set:{originalPrice:price}},{$set:{price:price}}]);
    }else{
        await this.findOneAndUpdate({id:id},{$set:{price:price}});
    }

},updateRatings: function(id:string,rating:number){
     this.aggregate([
        {$match:{id}},
        {$set: {ratings:  { $divide: [ {$add: ["$ratings", rating]}, 2  ]  }  },
            }]);
},imageDatagetbyType: function(...args:string[]){
    return this.find({type:{$in:[...args]}}).sort("-createdAt");
}


},
    timestamps:true,
    strict:true,
    });
    
 
 


export const Image=mongoose.model('Image',ImageSchema);
export default Image;
export type ImageData = mongoose.InferSchemaType<typeof ImageSchema>