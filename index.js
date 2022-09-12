import { MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const uri = process.env.MONGODB_CONNECTION_STRING;
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
const DB = 'mongodb_patterns';
const COLLECTION = 'patterns';

async function go () {
  try {
    await client.connect();
    const coll = client.db(DB).collection(COLLECTION);
    const randomPatterns = coll.aggregate([
      { $sample: { size: 1 } }
    ]);
    for await (const pattern of randomPatterns) {
      console.log('---');
      console.log(chalk.blue(pattern.name));
      console.log(pattern.description);
      if (pattern.pros.length > 0) {
        console.log(chalk.green.bold('\nPros'));
        pattern.pros.forEach(p => console.log(chalk.green(`+ ${p}`)));
      }
      if (pattern.cons.length > 0) {
        console.log(chalk.red.bold('\nCons'));
        pattern.cons.forEach(c => console.log(chalk.red(`- ${c}`)));
      }
      if (pattern.notes.length > 0) {
        console.log(`\n${chalk.bold('Notes:')} ${pattern.notes}`);
      }
      console.log('---');
    }
  } finally {
    await client.close();
  }
}

go().catch(console.dir);
