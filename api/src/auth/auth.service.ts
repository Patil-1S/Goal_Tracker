import { generateHash } from '../utils/generators/hash';
import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    if (registerDto.email && registerDto.password) {
      const existingUser = await this.userService.findByEmail(
        registerDto.email,
      );
      if (existingUser) {
        throw new ConflictException('user already exists');
      }

      const hashedPassword = await generateHash(registerDto?.password);
      // const verificationToken = uuidv4();
      await this.userService.create({
        ...registerDto,
        password: hashedPassword,
      });
    }

    return { message: 'User registered successfully' };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Login failed: User not found.');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Login failed: Invalid password.');
    }

    const generatedTokens = this.generateToken({ ...user, sub: user.id });

    // await this.saveRefreshAccessToken(user.id, generatedTokens.refresh_token);

    return generatedTokens;
  }

  private generateToken(user: any) {
    const payload = {
      email: user.email,
      sub: user.sub,
    };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1d' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async decodeToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }
}
