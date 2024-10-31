import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string, emergencyContactName?: string, emergencyContactPhone?: string): Promise<User> {
    // Check if the username already exists
    const existingUser = await this.usersRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ username, password: hashedPassword, emergencyContactName, emergencyContactPhone });
    const savedUser = await this.usersRepository.save(user);

    // Log registration information to the console
    console.log('New user registered:');
    console.log(`Username: ${savedUser.username}`);
    if (savedUser.emergencyContactName) {
      console.log(`Emergency Contact Name: ${savedUser.emergencyContactName}`);
    }
    if (savedUser.emergencyContactPhone) {
      console.log(`Emergency Contact Phone: ${savedUser.emergencyContactPhone}`);
    }

    return savedUser;
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const validatedUser = await this.validateUser(user.username, user.password);
    if (!validatedUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: validatedUser.username, sub: validatedUser.id };
    console.log('User logged in:');
    console.log(`Username: ${validatedUser.username}`);
    console.log(`User ID: ${validatedUser.id}`);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUserById(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }
}