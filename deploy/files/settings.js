var settings = {};

settings.ip = "{{direct_ip}}";

settings.direct_domain = "{{direct_domain}}";

settings.email = "{{email}}";

settings.dns = {};
settings.dns.port = {{dns_port}};
settings.dns.cert_path = "{{cert_path}}";

settings.smtp = {};
settings.smtp.port = {{smtp_port}}};
settings.smtp.spool_path = "{{spool_path}}";


module.exports = settings;

