import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
config();

let dbInstance;
const url = process.env.MONGO_URL || 'mongodb://localhost:27017/SocialUserEr';

@Injectable()
export class DbConnection {
  constructor() {
    this.connect();
  }
  connect() {
    const client = new MongoClient(url);
    client
      .connect()
      .then((connection) => {
        dbInstance = connection.db();
        console.log('Database connection Succeeded');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  db() {
    if (dbInstance) return dbInstance;
  }
}
