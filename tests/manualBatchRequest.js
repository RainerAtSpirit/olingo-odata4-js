var serviceRoot = "/odata",
    listRoot = "Connections('E3CC8646-243C-4D95-BD84-67224112411D')/Lists('debe1405-5602-42ee-8362-29c7719f5458')/ListItems",
    headers = {
        headers: {
            'Content-Type': "application/json",
            Accept: "application/json,odata.metadata=minimal",
            AppId: cc.getAppId()
        }
    },
//batchRequests = [{
//    "requestUri": "Foods(0)",
//    "method": "GET",
//    "headers": {"Accept": "application/json;odata.metadata=minimal"}
//},
//    {
//        "requestUri": "Foods?$filter=FoodID eq 1"
//        , "method": "GET",
//        "headers": {"Accept": "application/json;odata.metadata=minimal"}
//    },
//    {
//        "requestUri": "Foods?$top=2",
//        "method": "GET", "headers": {"Accept": "application/json;odata.metadata=minimal"}
//    }
//];
    batchRequests = [
        {
            headers: headers,
            method: 'GET',
            requestUri: listRoot + '?$skip=0&$top=10'
        },
        {
            headers: headers,
            method: 'GET',
            requestUri: listRoot + '?$skip=10&$top=10'
        },
        {
            headers: headers,
            method: 'GET',
            requestUri: listRoot + '?$skip=20&$top=10'
        }

    ];

cc.odatajs.oData.request({
        requestUri: serviceRoot + "/$batch",
        method: "POST",
        data: {
            __batchRequests: batchRequests
        }
    },
    function( data, response ) {
        console.log('success', data, response);
    },
    function( err ) {
        console.log('error', err);
    },
    cc.odatajs.oData.batch.batchHandler
);