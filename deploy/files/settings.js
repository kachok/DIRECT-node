var settings = {};

settings.ip = "{{direct_ip}}";

settings.direct_domain = "{{direct_domain}}";

settings.email = "dmitry@amida-tech.com";

settings.dns = {};
settings.dns.port = 5300;
settings.dns.cert_path = "{{cert_path}}";

settings.smtp = {};
settings.smtp.port = 8025;

module.exports = settings;

