const ProductsModel = require("../../datasources/products/ProductsModel");
const {v4: uuidv4} = require('uuid');
//const PendingModel = require("../../dataSources/products/PendingOrders");

class Products {
    async getAllProducts(found){
        try {
            if(!found){
            throw new Error("Please sign in");
        }
        const response = await ProductsModel.find().sort({createdAt:-1});
        return response;
        }catch(e){
            throw new Error("An error occured!")
        }
    }

    async uploadProduct(args,found){
        try{
            if(!found){
            throw new Error("Please sign in");
        }
            const {input:{name,price,inStock,remainingStock}}= args;
            console.log(name,price,inStock,remainingStock)
            const data = new ProductsModel({
                _id:uuidv4(),
                name,
                price,
                inStock,
                remainingStock,
            });
            await data.save();
            return {
                status:true,
                message:"Successfully added product"
            }
        }catch(e){
            console.log(e)
            throw new Error("An error occured");
        }
    }
    
    async pendingOrders (found){
        try{
              if(!found){
            throw new Error("Please sign in");
        }
            const response = await ProductsModel.find().populate("user").sort({createdAt:-1});
            return response;
        }catch(e){
            throw new Error("An error occured");
        }
    }
}

module.exports = Products;