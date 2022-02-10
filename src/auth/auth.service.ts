import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthRepo } from './auth.repo';
import { CreateUserI } from './interface/createUser.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private socialRepo: AuthRepo) {}

  async registerUser(userInfo: CreateUserI) {
    try {
      
      const user = await this.socialRepo.findUser(userInfo.email);

      if (user) throw new BadRequestException('Bad request user already exist');

      userInfo.password = await bcrypt.hash(userInfo.password, 10)
    
      const newUser = await this.socialRepo.createUser(userInfo);
      return newUser;
    } catch (err) {
      console.log("err : ", err)
      return err;
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const user = await this.socialRepo.findUser(email);
      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid)
        throw new BadRequestException('Bad request password is incorrect');
      return user;
    } catch (err) {
      console.log(err);
    }
  }
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.socialRepo.findUser(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  allUsers() {
    return this.socialRepo.findAllUsers();
  }

  findUser(email: string) {
    return this.socialRepo.findUser(email);
  }



  logoutUser(email: string) {
    return 'User logged out auth header dismantled' + email;
  }
}
