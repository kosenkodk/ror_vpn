
client
nobind
dev tun
remote-cert-tls server

remote {{ remote_server }} 1194 udp



<key>
{{ client_key }}</key>
<cert>
{{ client_cert }}</cert>
<ca>
{{ ca }}</ca>
<tls-auth>
{{ tls_auth }}</tls-auth>
key-direction 1

redirect-gateway def1

