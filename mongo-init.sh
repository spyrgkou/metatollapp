set -e

mongo <<EOF
db = db.getSiblingDB('metatolldb')

db.createUser({
    user: "appAdmin",
    pwd: "appAdmin123",
    roles : ["readWrite", "dbAdmin"]
});

EOF