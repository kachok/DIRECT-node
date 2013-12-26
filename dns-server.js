var sys = require('sys'), puts = sys.puts;
var dgram = require('dgram');
var ndns = require('ndns');
var server = ndns.createServer('udp4');
var client = ndns.createClient('udp4');

var BIND_PORT = 5300;

fs = require('fs')


var cert_data;


server.on("request", function(req, res) {
  console.log("Request:");
  //console.log(req);
  res.setHeader(req.header);

  for (var i = 0; i < req.q.length; i++)
    res.addQuestion(req.q[i]);

  if (req.q.length > 0) {
    var name = req.q[0].name;
    if (name == ".")
      name = "";
    res.header.qr = 1;
    res.header.ra = 1;
    res.header.rd = 0;

    res.header.ancount = 4;
    res.header.nscount = 0;
    res.header.arcount = 0;
    res.addRR("node.amida-demo.com", 1, "IN", "SOA", "hostmaster." + name, "hostmaster." + name, 1, 2, 3, 4, 5);
    res.addRR("node.amida-demo.com", 2, "IN", "TXT", "Hello World!!!!");
    res.addRR("node.amida-demo.com", 3, "IN", "MX", 10, "mail2." + name);
    res.addRR("node.amida-demo.com", 4, "IN", "CERT", 1, 54337, 5, cert_data);




  }
  console.log("Response:");
  //console.log(res);
  res.send();
});

var fs = require('fs');
var path="./certs/node.amida-demo.com.der";
var file = fs.readFileSync(path, "binary");
cert_data=file;
//console.log(file);
console.log(file.length);
server.bind(BIND_PORT);

