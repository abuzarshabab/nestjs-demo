import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { SocialRepo } from './social.repo';

@Injectable()
export class SocialService {
  constructor(private socialRepo: SocialRepo) {}

  async followUser(followedBy: string, followingTo: string) {
    try {
      const followEntry = await this.socialRepo.checkFollowing(
        followedBy,
        followingTo,
      );
      if (followEntry) {
        return new BadRequestException('Already following');
      }
      const follow = await this.socialRepo.createFollow(
        followedBy,
        followingTo,
      );
      return follow;
    } catch (err) {
      return new HttpException(err, 400);
    }
  }

  async unfollowUser(followedBy: string, unFollowingTo: string) {
    try {
      const followEntry = await this.socialRepo.checkFollowing(
        followedBy,
        unFollowingTo,
      );

      if (!followEntry) return new BadRequestException('Not following');

      const unFollow = await this.socialRepo.deleteFollowing(
        followedBy,
        unFollowingTo,
      );
      return unFollow;
    } catch (err) {
      return new HttpException(err, 400);
    }
  }

  async findFollowers(email: string) {
    try {
      const followEntry = await this.socialRepo.findFollowers(email);
      return followEntry;
    } catch (err) {
      return new HttpException(err, 400);
    }
  }

  async findFollowings(email: string) {
    try {
      const followEntry = await this.socialRepo.findFollowing(email);
      return followEntry;
    } catch (err) {
      return new HttpException(err, 400);
    }
  }
}
