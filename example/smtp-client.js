var simplesmtp = require("simplesmtp");
var fs=require("fs");

var client = simplesmtp.connect(8025);

client.once("idle", function(){
    // Client is ready to take messages
            client.useEnvelope({
                from: "test@pangalink.net",
                to: [
                    "test1@pangalink.net",
                    "test2@pangalink.net"
                ]
            });
});

client.on("message", function(){
    fs.createReadStream("email.eml").pipe(client);
});

client.on("ready", function(success, response){
    if(success){
        console.log("The message was transmitted successfully with "+response);
        client.close();
    }
});

client.on("error", function(err){
});

client.on("end", function(){
});
