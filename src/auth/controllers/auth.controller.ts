import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
// import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards()
  @Post('login')
  async login(
    @Body() { email, password }: AuthDTO,
  ) {
    const userValidate = await this.authService.validateUser(
      email,
      password,
    );

    if (!userValidate) {
      throw new UnauthorizedException('Data not valid');
    }

    const jwt = await this.authService.generateJWT(userValidate);
    return jwt;
  }
 

  // @Post('login')
  // async signIn(@Req() req) {
  //   return await this.authService.signIn(req.user);
  // }

  @Post('register')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signUp(createUserDto);
  }
}
