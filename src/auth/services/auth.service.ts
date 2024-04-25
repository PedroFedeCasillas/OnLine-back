import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    const isValidPassword = await this.userService.checkPassword(
      password,
      user.password,
    );

    if (user && isValidPassword) return user;

    return null;
  }

  async signIn(user: any) {
    const payload = {
      email: user.email,
      sub: user._id,
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  async signUp(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
