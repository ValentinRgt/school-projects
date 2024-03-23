import { Controller, Post, Body, Response } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { UserService } from '../user/user.service';
import { ForgotUserDTO, LoginUserDTO, RegisterUserDTO } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDTO } from '../user/user.dto';
import { plainToClass } from 'class-transformer';
import { MailerService } from '@nestjs-modules/mailer';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  /**
   * @param {@Body} user<LoginUserDTO>
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 201, description: 'Login successful' })
  @Post('login')
  async login(
    @Body() user: LoginUserDTO,
    @Response() response,
  ): Promise<string> {
    const userData = await this.userService.findByEmail(user.email);

    if (!(userData instanceof User)) {
      return response.status(403).json({
        error: 'Forbidden',
        code: 403,
        message: 'This user does not exist',
      });
    }

    const passwordMatch = await bcrypt.compare(
      user.password,
      userData.password,
    );
    if (!passwordMatch) {
      return response.status(403).json({
        error: 'Forbidden',
        code: 403,
        message: 'Wrong password',
      });
    }

    const payload = { firstname: userData.firstname, sub: userData.id };

    return response.json({ access_token: this.jwtService.sign(payload) });
  }

  /**
   * @param {@Body} user<RegisterUserDTO>
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 201, description: 'Register successful' })
  @Post('register')
  async register(
    @Body() user: RegisterUserDTO,
    @Response() response,
  ): Promise<string> {
    const userData = await this.userService.findOrCreate(
      plainToClass(UserDTO, user),
    );

    if (userData.status === false) {
      return response.status(403).json({
        error: 'Forbidden',
        code: 403,
        message: 'This user already exist',
      });
    }

    const payload = { firstname: userData.firstname, sub: userData.id };

    return response.json({
      message: 'This user has been registered',
      access_token: this.jwtService.sign(payload),
    });
  }

  /**
   * @param {@Body} user<ForgotUserDTO>
   * @param {@Response} response
   * @returns {@Response}
   */
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 201, description: 'Mail sent' })
  @Post('forgot-password')
  async forgotPassword(
    @Body() user: ForgotUserDTO,
    @Response() response,
  ): Promise<string> {
    return this.mailerService
      .sendMail({
        to: user.email,
        subject: 'Your new password',
        text: 'Go to this page to reset password <a href="http://localhost:5173/reset-password">click here</a>',
        html: 'Go to this page to reset password <a href="http://localhost:5173/reset-password">click here</a>',
      })
      .then((res) => {
        return response.json({ success: true });
      })
      .catch((err) => {
        return response.json({ success: false });
      });
  }
}
