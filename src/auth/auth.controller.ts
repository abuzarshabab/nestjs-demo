import { Body, Get, Controller, Post, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserI } from './interface/createUser.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() userInfo: CreateUserI) {
    const user = await this.authService.registerUser(userInfo);
    return user;
  }

  @Post('login')
  loginUser(@Body() body) {
    const { email, password } = body;
    return this.authService.loginUser(email, password);
  }

  @Post('logout')
  logoutUser(@Body() body) {
    const { email } = body;
    return email;
  }

  @Get('user/:email')
  getUser(@Param('email') email: string) {
    console.log(email);
    return this.authService.findUser(email);
  }

  @Get('users')
  getAll() {
    return this.authService.allUsers();
  }
}
