const resolvers = {
    Query:{
        userDetails:(_,__,{dataSources,found})=>dataSources.sessionApi.userDetails(found),
        getAllProducts:(_,__,{dataSources,found})=>dataSources.productsApi.getAllProducts(found),
        geAllStocksInfo:(_,__,{dataSources,found})=>dataSources.stocksApi.geAllStocksInfo(found),
        pendingOrders:(_,__,{dataSources,found})=>dataSources.productsApi.pendingOrders(found),
    },
    Mutation:{
        signIn:(_,args,{dataSources,res})=>dataSources.sessionApi.signIn(args,res),
        signUp:(_,args,{dataSources})=>dataSources.sessionApi.signUp(args),
        logOut:(_,__,{dataSources,res})=>dataSources.sessionApi.logOut(res),
        uploadProduct:(_,args,{dataSources,found})=>dataSources.productsApi.uploadProduct(args,found),
        createStocks:(_,args,{dataSources,found})=>dataSources.stocksApi.createStocks(args,found)
    }
}

module.exports = resolvers;