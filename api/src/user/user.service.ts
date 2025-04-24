import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DataSource, In, IsNull, Not, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return this.dataSource.transaction(async (manager) => {
        const userObj = manager.create(User, {
          ...createUserDto,
        });

        const user = await manager.save(userObj);
        console.log('New user created.');

        return user;
      });
    } catch (err) {
      console.log('Error occurred while creating user', err);
      if (
        err instanceof NotFoundException ||
        err instanceof BadRequestException ||
        err instanceof UnauthorizedException
      ) {
        throw err;
      }

      throw new InternalServerErrorException('creating user failed');
    }
  }

  async update(
    id: string,
    updateUserDto: Partial<UpdateUserDto>,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('user with userId:${id} not found');
    }
    if (updateUserDto.email) {
      const emailExists = await this.userRepository.findOne({
        where: { email: updateUserDto.email, id: Not(id) },
      });

      if (emailExists) {
        throw new ConflictException(
          'user with userId:${id} email already exist',
        );
      }
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findMany(ids: string[]): Promise<User[]> {
    return this.userRepository.find({
      where: { id: In(ids), deletedAt: IsNull() },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });
    if (!user) {
      throw new NotFoundException('user with userId:${id} not found');
    }
    return user;
  }

  async findByEmail(email: string, relations?: any): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
      relations,
    });
  }

  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
  async remove(id: string): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const manager = queryRunner.manager;

      const user = await manager.findOne(User, {
        where: {
          id,
          deletedAt: IsNull(),
        },
      });

      if (!user) {
        throw new NotFoundException('user with userId:${id} not found');
      }
      user.deletedAt = new Date();
      await manager.save(user);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
