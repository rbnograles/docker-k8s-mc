const NB_DB = process.env.NB_DB;
const NB_DB_USER = process.env.NB_DB_USER;
const NB_DB_PASSWORD = process.env.NB_DB_PASSWORD;

db = db.getSiblingDB(NB_DB);

db.createUser({
  user: NB_DB_USER,
  pwd: NB_DB_PASSWORD,
  roles: [{ role: "readWrite", db: NB_DB }],
});
