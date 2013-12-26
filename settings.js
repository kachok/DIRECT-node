var settings = {}

settings.dns = {}
settings.dns.host = 5300;
settings.dns.cert_path = "./certs/node.amida-demo.com.der";

settings.smtp = {}
settings.smtp.port = 8025;

module.exports = settings;