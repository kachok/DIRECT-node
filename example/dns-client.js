var dns = require('native-dns');


//dns.platform.name_servers=[{ address: '127.0.0.1', port: 5300}];
//dns.platform.name_servers=[{ address: '54.200.9.100', port: 53}];
//console.log(dns);



//dns.resolve('test2.amida-demo.com', 'CERT', function (err, addresses) {
//dns.resolve('direct.securehealthemail.com', 'CERT', function (err, addresses) {
//dns.resolve('test1.amida-demo.com', 'A', function (err, addresses) {  
dns.resolve('test2.amida-demo.com', 'CERT', function (err, addresses) {
  if (err) throw err;

  console.log('addresses: ' + JSON.stringify(addresses));

  var cert=addresses[0].cert;

  console.log("len: "+addresses[0].cert.length);

  //if (addresses[0].cert2) {
  //  for (var ch=5; ch<addresses[0].cert2.length; ch++) {
  //    cert=cert+String.fromCharCode(addresses[0].cert2[ch]);
  //  }
  //}

  //console.log("cert: "+cert);
  console.log("cert len: "+cert.length);


  var fs = require("fs");

  fs.writeFile("cert.der", new Buffer(cert, 'binary'), {encoding:"binary"},function(err) {});
//fs.writeFile("cert.der", new Buffer(addresses[0].cert2), {encoding:"binary"},function(err) {});

});