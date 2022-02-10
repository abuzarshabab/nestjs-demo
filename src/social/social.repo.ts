import { Injectable } from '@nestjs/common';
import { DbConnection } from 'src/db/db.service';

const followsCollection = 'follows';

@Injectable()
export class SocialRepo {
  constructor(private database: DbConnection) {}

  async createFollow(followedBy: string, followingTo: string) {
    return await this.database.db().collection(followsCollection).insertOne({
      followedBy,
      followingTo,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'pending',
    });
  }

  async checkFollowing(followedBy: string, followingTo: string) {
    return await this.database
      .db()
      .collection(followsCollection)
      .findOne({ followedBy, followingTo });
  }

  async updateFollow(email: string, update: string) {
    return await this.database.db().collection(followsCollection).updateOne(
      {
        email: email,
      },
      {
        $set: update,
      },
    );
  }

  async findFollowers(email: string) {
    return await this.database
      .db()
      .collection(followsCollection)
      .find({ followingTo: email })
      .toArray();
  }

  async findFollowing(email: string) {
    return await this.database
      .db()
      .collection(followsCollection)
      .find({ followedBy: email })
      .toArray();
  }

  async deleteFollowing(followedBy: string, unFollowingTo: string) {
    console.log(followedBy, unFollowingTo);
    return await this.database
      .db()
      .collection(followsCollection)
      .deleteOne({ followedBy, followingTo: unFollowingTo });
  }

  async updateFollowing(email: string, password: string) {
    return await this.database
      .db()
      .collection(followsCollection)
      .findOne({ email, password });
  }
}
