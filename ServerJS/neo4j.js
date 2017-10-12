var neo4j=require('neo4j-driver').v1;
var driver=neo4j.driver('bolt://localhost',neo4j.auth.basic('neo4j','R@v10512'));
driver.onCompleted=function (meta) {
    console.log('connected sucessfully',meta);
};
driver.onError=function (err) {
    console.log(err);
};
var session=driver.session();
var txnResults=session.readTransaction((tran)=>{
    return tran.run('MATCH (n:BusinessCapabilityFramework) where n.name <> \'Business Capability Framework\' RETURN n.name as name');
});
var names=[];
txnResults.then((result)=>{
    session.close();
    result.records.forEach((rcrd,i)=>{
        names[i]=rcrd.get('name');
        console.log(rcrd.get('name'))
    });
    driver.close();
}).catch((err)=>{
    console.log(err)
});
exports.names=names;