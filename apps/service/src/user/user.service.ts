import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInfo } from 'dto/user.dto';
import { UserInput, UserUpdate } from 'input/user.input';
import { User, UserDocument } from 'schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly usersRepository: Model<UserDocument>,
  ) {}

  async find(): Promise<UserInfo[]> {
    return this.usersRepository.find({ deleted: false }).exec();
  }

  async findSoftDelete(): Promise<UserInfo[]> {
    return this.usersRepository.find().exec();
  }

  async findById(id: string): Promise<UserInfo> {
    return this.usersRepository.findById(id).exec();
  }

  async findOne(input: { by: string; find: string }): Promise<UserInfo> {
    return this.usersRepository.findOne({ [input.by]: input.find }).exec();
  }

  async create(input: UserInput): Promise<UserInfo> {
    const createdUser = await this.usersRepository.create(input);
    return createdUser.save();
  }

  async update(id: string, input: UserUpdate): Promise<UserInfo> {
    await this.usersRepository.findByIdAndUpdate(id, input);
    return this.usersRepository.findById(id).exec();
  }

  async softDelete(id: string): Promise<UserInfo> {
    const user = await this.usersRepository.findById(id).exec();
    if (!user) {
      throw new Error('user not found');
    }
    await this.usersRepository.findByIdAndUpdate(id, { deleted: true });
    return user;
  }

  async delete(id: string): Promise<UserInfo> {
    const user = await this.usersRepository.findById(id).exec();
    if (!user) {
      throw new Error('user not found');
    }
    await this.usersRepository.findByIdAndDelete(id);
    return user;
  }
}
