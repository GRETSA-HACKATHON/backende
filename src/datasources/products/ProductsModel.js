const {Schema,model} = require("mongoose");

const ProductsSchema = new Schema({
    _id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.String,
        ref:"User",
        required:true
    },
    inStock:{
        type:Number,
        required:true
    },
    remainingStock:{
        type:Number,
        required:true
    },
    imageUrl:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
});

const ProductsModel = model("Products",ProductsSchema);

module.exports = ProductsModel;