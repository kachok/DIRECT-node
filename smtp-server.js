var settings = require("./settings");

var simplesmtp = require("simplesmtp"),
    fs = require("fs");

var smtp = simplesmtp.createServer();
smtp.listen(settings.smtp.port);
console.log("listening on port "+settings.smtp.port);

smtp.on("startData", function(connection){
    console.log("Message from:", connection.from);
    console.log("Message to:", connection.to);
    connection.saveStream = fs.createWriteStream("message.txt");
});

smtp.on("data", function(connection, chunk){
    connection.saveStream.write(chunk);
});

smtp.on("dataReady", function(connection, callback){
    connection.saveStream.end();
    console.log("Incoming message saved to message.txt");
    callback(null, "ABC1"); // ABC1 is the queue id to be advertised to the client
    // callback(new Error("Rejected as spam!")); // reported back to the client
});