import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {}

  public async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      return user;
    }

    return null;
  }

  public signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }): string {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async generateJWT(user: User): Promise<{ accessToken: string; user: User }> {
    const payload: jwt.JwtPayload = {
      email: user.email,
      sub: user.id,
    };

    return {
      accessToken: this.signJWT({
        payload,
        secret: process.env.JWT_SECRET,
        expires: process.env.EXPIRES_IN,
      }),
      user,
    };
  }

  // async validateUser(email: string, password: string): Promise<any> {
  //   const user = await this.userService.findOneByEmail(email);

  //   const isValidPassword = await this.userService.checkPassword(
  //     password,
  //     user.password,
  //   );

  //   if (user && isValidPassword) return user;

  //   return null;
  // }

  // async signIn(email: string, password: string) {
  //   const user = await this.validateUser(email, password);
  //   if (!user) {
  //     throw new NotFoundException('Invalid credentials');
  //   }
  //   const payload = { email: user.email, sub: user.id };
  //   return {
  //     id: user.id, // Agrega el ID del usuario
  //     name: user.name, // Asegúrate de que el nombre del usuario esté disponible en el objeto user
  //     email: user.email, // El correo electrónico del usuario
  //     access_token: this.jwtService.sign(payload), // El token de acceso JWT
  //   };
  // }

  // async signIn(user: any) {
  //   const payload = {
  //     email: user.email,
  //     sub: user._id,
  //   };

  //   return { access_token: this.jwtService.sign(payload) };
  // }

  async signUp(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
