var settings = require("./settings");

var sys = require('sys'), puts = sys.puts;
var dgram = require('dgram');
var ndns = require('ndns');
var server = ndns.createServer('udp4');
var client = ndns.createClient('udp4');

var fs = require('fs');

var cert_data;

server.on("request", function(req, res) {
  console.log("Request:");
  console.log(req);
  res.setHeader(req.header);

  for (var i = 0; i < req.q.length; i++)
    res.addQuestion(req.q[i]);

  if (req.q.length > 0) {
    res.header.qr = 1;
    res.header.ra = 1;
    res.header.rd = 0;

    res.header.ancount = 0;
    res.header.nscount = 0;
    res.header.arcount = 0;

    for (var i=0; i<req.q.length; i++)
    {
      var name = req.q[i].name;
      var type = req.q[i].type;
      var typeName = req.q[i].typeName;

      if (name === settings.direct_domain) {
        switch (typeName) {
          case "SOA": 
            res.addRR(settings.direct_domain, 300, "IN", "SOA", "ns-"+settings.direct_domain, settings.email, 0, 0, 0, 0, 0);
            res.header.ancount+=1;
            break;
          case "NS": 
            res.addRR(settings.direct_domain, 300, "IN", "NS", "ns-"+settings.direct_domain);
            res.header.ancount+=1;
            break;
          case "A": 
            res.addRR(settings.direct_domain, 300, "IN", "A", settings.ip);
            res.header.ancount+=1;
            break;
          case "MX": 
            res.addRR(settings.direct_domain, 300, "IN", "MX", 0, settings.ip);
            res.header.ancount+=1;
            break;
          case "CERT": 
            res.addRR(settings.direct_domain, 300, "IN", "CERT", 1, 12345, 5, cert_data);
            res.header.ancount+=1;
            break;
        }
      }
    }
  }

  console.log("Response:");
  console.log(res);
  res.send();
});

var fs = require('fs');
var path=settings.dns.cert_path;
var file = fs.readFileSync(path, "binary");
cert_data=file;
//console.log(file);
//console.log(file.length);

server.bind(settings.dns.port);
console.log("listening on port "+settings.dns.port);

