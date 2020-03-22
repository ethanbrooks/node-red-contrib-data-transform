var DataTransform = require("node-json-transform").DataTransform;


var data = {
    items: [{
        id: 'books0',
        zero: 0,
        sku: '00234-12312',
        errorReplace: 'a',
        subitems: [
            { subid: "0.0", subsku: "subskuvalue0.0" },
            { subid: "0.1", subsku: "subskuvalue0.1" }
        ]
    }, {
        unwanted: true,
        info: "bal",
        id: 'books1',
        zero: 1,
        sku: '10234-12312',
        subitems: [
            { subid: "1.0", subsku: "subskuvalue1.0" },
            { subid: "1.1", subsku: "subskuvalue1.1" }
        ]
    }]
};

var map = {
    list: 'items',
    item : {
        myid: 'id',
        mysku: 'sku',
        mysubitems: 'subitems'
    },
    remove: ['unwanted'],
    defaults: {
        "missingData": true
    },
    operate: [
        {
            run: (val, context) => 'replacement - subObject.subSubObject.node1 ' + val,
            on: 'myid'
        },
        {
            run: function(val, context) {
              return val + " more info for " + context.type},
              on: "mysku"
        },
        {
            'run': function(val, context) {
              return DataTransform({list:val}, {
                'list': 'list',
                'item' : {
                    'mysubid': 'subid',
                    'mysubsku': 'subsku'
                }
              }).transform();
            },
            on: 'mysubitems'
        }
    ],
    each: function(item, index, collection, context){
        // make changes
        item.type = context.type;
        return item;
    }
};








var dataTransform = DataTransform(data, map);
var context = { type: 'my-type' };


var promise = dataTransform.transformAsync(context);
promise.then(function(result){
    console.log(JSON.stringify(result, null, 4));
});

