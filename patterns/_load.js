// This script is for the MongoDB Shell
// mongosh <connection string> _load.js

const DB = 'mongodb_patterns';
const COLLECTION = 'patterns';

// List JSON files
console.log(`Loading files in ${__dirname}`);
const files = fs.readdirSync(__dirname);
for (const file of files.filter(f => /^.+\.json$/.test(f))) {
  const filePath = path.join(__dirname, file);
  console.log(`Reading and parsing ${filePath}`);
  const pattern = EJSON.parse(fs.readFileSync(filePath));
  db.getSiblingDB(DB).getCollection(COLLECTION).insertOne(pattern);
}
