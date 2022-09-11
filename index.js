import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_CONNECTION_STRING;
const client = new MongoClient(uri);

async function go () {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Connected successfully to server');
  } finally {
    await client.close();
  }
}

go().catch(console.dir);
