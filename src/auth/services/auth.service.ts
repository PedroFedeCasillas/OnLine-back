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
