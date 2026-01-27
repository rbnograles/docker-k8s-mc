const keyValueDb = process.env.KEY_VALUE_DB;
const keyValueDbUser = process.env.KEY_VALUE_DB_USER;
const keyValueDbPassword = process.env.KEY_VALUE_DB_PASSWORD;

db = db.getSiblingDB(keyValueDb);

db.createUser({
  user: keyValueDbUser,
  pwd: keyValueDbPassword,
  roles: [{ role: "readWrite", db: keyValueDb }],
});
