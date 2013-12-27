var settings = {}

settings.ip = "127.0.0.1";

settings.direct_domain = "direct.amida-demo.com";

settings.email = "dmitry@amida-tech.com";

settings.dns = {};
settings.dns.port = 5300;
settings.dns.cert_path = "./certs/node.amida-demo.com.der";

settings.smtp = {};
settings.smtp.port = 8025;
settings.smtp.spool_path = "";

module.exports = settings;