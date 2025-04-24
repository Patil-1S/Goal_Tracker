// import { NoInterceptor } from '@/utils/response/decorators/noInterceptor.decorator';
// import { Response } from '@/utils/response/decorators/response.decorator';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
// import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
// import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
// import { ResetPasswordDto } from './dto/reset-password.dto';
// import { JwtAuthGuard } from './guards/jwt-auth.guard';
import axios from 'axios';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  //   @Post('forgot-password')
  //   async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
  //     return this.authService.forgotPassword(forgotPasswordDto);
  //   }

  //   @Post('verify-reset-password')
  //   async verifyResetPasswordToken(@Query('token') token: string) {
  //     return this.authService.verifyResetPasswordToken(token);
  //   }

  //   @Post('reset-password')
  //   async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
  //     return this.authService.resetPassword(resetPasswordDto);
  //   }

  //   @Post('refresh-token')
  //   async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
  //     return this.authService.refreshAccessToken(refreshTokenDto);
  //   }
}
