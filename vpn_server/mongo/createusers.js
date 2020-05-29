var db = connect("mongodb://admin:pwd@localhost:27017/admin");

db = db.getSiblingDB('vpnUsers');

db.createUser(
  {
    user: "admin",
    pwd: "pwd",
    roles: [{ role: "readWrite", db: "vpnUsers" }],
    passwordDigestor: "server",
  }
)
