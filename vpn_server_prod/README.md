1. Install Docker

    * https://docs.docker.com/install/linux/docker-ce/ubuntu/

2. Install Docker compose

    * https://docs.docker.com/compose/install/

3. `cp env.example .env`

4. Fill in the values in the `.env` file

5. Run
    * `docker-compose up -d`

6. Get ovpn connections:

    curl "http://localhost:5000/client/ovpn?remote=vpn.example.com&login=user1"