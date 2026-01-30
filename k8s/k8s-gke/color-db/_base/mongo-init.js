const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

db = db.getSiblingDB(dbName);

console.log(`Initializing: ${dbName}`);
console.log(`Initializing: Creating user ${dbUser}`);

db.createUser({
  user: dbUser,
  pwd: dbPassword,
  roles: [{ role: "readWrite", db: dbName }],
});

console.log(`Initializing: Success`);
