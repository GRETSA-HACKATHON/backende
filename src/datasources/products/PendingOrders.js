const {Schema,model} = require("mongoose");

const PendingSchema = new Schema({
    _id:{
        type:String,
        required:true
    },
    products:[{
        type:Schema.Types.String,
        ref:"Products",
        required:true
    }],
    user:{
        type:Schema.Types.String,
        ref:"User",
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
},{timeStamps:true});

const PendingModel = model('Pending',PendingSchema);

module.exports = PendingModel;