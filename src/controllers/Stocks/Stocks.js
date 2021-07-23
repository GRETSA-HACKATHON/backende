const StocksModel = require("../../datasources/stock/StockModel");
const {v4: uuidv4} = require('uuid');

class StocksApi {
    async geAllStocksInfo(found){
        try{
            if(!found){
            throw new Error("Please sign in");
        }
        const response = await StocksModel.find().sort({createdAt:-1});
        return response;
        }catch(e){
            throw new Error("An error occured");
        }
    }

    async createStocks(args,found){
        try{
            if(!found){
            throw new Error("Please sign in");
        }
        const {input:{
            price,
            inStock,
            remainingStock,
            pendingOrders
        }} = args;
        const stocks = new StocksModel({
            _id:uuidv4(),
            price,
            inStock,
            remainingStock,
            pendingOrders
        });
        const response = await stocks.save();
        return response;
        }catch(e){
            console.log(e)
            throw new Error("An error occured");
        }
    }
}

module.exports = StocksApi;