development
cp env.dev.example .env
docker-compose up --build -V
visit http://localhost:5000

<!-- vpn_server_openvpn-pki  -->
docker exec -it 2353300c696c /bin/sh
ls /data/pki/reqs