// This script is for the MongoDB Shell
// mongosh <connection string> _load.js

const DB = 'mongodb_patterns';
const COLLECTION = 'patterns';

// Drop collection if it exists
db.getSiblingDB(DB).getCollection(COLLECTION).deleteMany({});

// List JSON files
console.log(`Loading files in ${__dirname}`);
const files = fs.readdirSync(__dirname);
for (const file of files.filter(f => /^[^_].+\.json$/.test(f))) {
  const filePath = path.join(__dirname, file);
  console.log(`Reading and parsing ${filePath}`);
  const pattern = EJSON.parse(fs.readFileSync(filePath));
  db.getSiblingDB(DB).getCollection(COLLECTION).insertOne(pattern);
}
