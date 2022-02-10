import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { SocialService } from './social.service';

@Controller('/social')
export class SocialController {
  constructor(private socialService: SocialService) {}

  @Post('/follow')
  follow(@Body() body: { followedBy: string; followingTo: string }) {
    const { followedBy, followingTo } = body;

    if (!followedBy || !followingTo || followedBy === followingTo) {
      return new BadRequestException('Invalid Follow Request Body');
    }
    console.log(body);
    return this.socialService.followUser(followedBy, followingTo);
  }

  @Post('/unfollow')
  unfollow(
    @Body()
    {
      followedBy,
      unFollowingTo,
    }: {
      followedBy: string;
      unFollowingTo: string;
    },
  ) {
    if (!followedBy || !unFollowingTo || followedBy === unFollowingTo) {
      return new BadRequestException('Invalid Unfollow Request Body');
    }
    return this.socialService.unfollowUser(followedBy, unFollowingTo);
  }

  @Post('/followers')
  followers(@Body() { userEmail }: { userEmail: string }) {
    if (!userEmail) {
      return new BadRequestException('Invalid Followers Request Body');
    }
    return this.socialService.findFollowers(userEmail);
  }

  @Get('/followings')
  followings(@Body() { userEmail }: { userEmail: string }) {
    if (!userEmail) {
      return new BadRequestException('Invalid Followings Request Body');
    }
    return this.socialService.findFollowings(userEmail);
  }
}
