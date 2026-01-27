const NOTES_DB = process.env.NOTES_DB;
const NOTES_DB_USER = process.env.NOTES_DB_USER;
const NOTES_DB_PASSWORD = process.env.NOTES_DB_PASSWORD;

db = db.getSiblingDB(NOTES_DB);

db.createUser({
  user: NOTES_DB_USER,
  pwd: NOTES_DB_PASSWORD,
  roles: [{ role: "readWrite", db: NOTES_DB }],
});
