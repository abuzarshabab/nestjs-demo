import { Injectable } from '@nestjs/common';
import { DbConnection } from 'src/db/db.service';
import { CreateUserI } from './interface/createUser.interface';

const userCollection = 'user';
// const followsCollection = 'follows';

@Injectable()
export class AuthRepo {
  constructor(private database: DbConnection) {}

  async createUser(user: CreateUserI) {
    return await this.database.db().collection(userCollection).insertOne(user);
  }

  async findAllUsers() {
    return await this.database
      .db()
      .collection(userCollection)
      .find({})
      .toArray();
  }

  async updateUser(email, update) {
    return await this.database.db().collection(userCollection).updateOne(
      {
        email: email,
      },
      {
        $set: update,
      },
    );
  }

  async findUser(email: string) {
    return await this.database
      .db()
      .collection(userCollection)
      .findOne({ email });
  }

  async deleteUser(email: string, password: string) {
    return await this.database
      .db()
      .collection(userCollection)
      .deleteOne({ email, password });
  }

  async loginUser(email, password) {
    return await this.database
      .db()
      .collection(userCollection)
      .findOne({ email, password });
  }
}
