const {gql} = require("apollo-server-express");

const typeDefs = gql `
    type Query{
        userDetails: UserDetails!
        getAllProducts:[ProductsList]!
        geAllStocksInfo:[StocksList]!
        pendingOrders:[PendingOrdersResult]
    }
    type Mutation{
        signIn(input:SignInInput!):AuthResults!
        signUp(input:SignUpInput!):Result
        logOut:AuthResults
        uploadProduct(input:ProductInput):Result
        createStocks(input:StocksInput):Result
    }
    type PendingOrdersResult {
        user:UserData
        name:String!
        price:String!
        inStock:Int!
        remainingStock:Int!
        imageUrl:String
    }
    type UserData {
        email:String!
        password:String!
        name:String!
        _id:String
    }
    type StocksList {
        price:String!
        inStock:Int!
        remainingStock:Int!
        pendingOrders:String!
    }
    type ProductsList {
        name:String!
        price:String!
        inStock:Int!
        remainingStock:Int!
        imageUrl:String
    }
    input ProductInput {
        name:String!
        price:String!
        inStock:Int!
        remainingStock:Int!
    }
    input StocksInput{
        price:String
        inStock:Int
        remainingStock:Int
        pendingOrders:Int
    }
    input SignInInput {
        password:String!
        email:String!
    }
    input SignUpInput{
        email:String!
        password:String!
        name:String!
    }
    type Result {
        status:String
        id:String
        message:String
        token:String
    }
    type AuthResults{
        status:String
        id:String
        message:String
        token:String
    }
    type UserDetails {
        name:String!
        email:String!
    }
`;

module.exports = typeDefs;