const {Schema,model} = require("mongoose");

const StocksSchema = new Schema({
    _id:{
        type:String,
        required:true
    },
    price:{
        type:String,
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
    pendingOrders:{
        type:Number,
        required:true
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

const StocksModel = model("Stocks",StocksSchema);

module.exports = StocksModel;